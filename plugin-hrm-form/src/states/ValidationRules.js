import { callTypes } from './DomainConstants';
import { FieldType, ValidationType } from '../states/ContactFormStateFactory';
import cloneDeep from 'lodash/cloneDeep';

export function validateBeforeSubmit(form) {
  if (isStandAloneCallType(form.callType.value)) {
    return form;
  }
  // we need to also consider whether we care about caller information or just child
  // and if you start with caller type, get invalid, then switch to child type, it's still disabled
  return validate(form, true);
}

// Questionable whether we should export this
// Be careful, this returns true if it's empty
export function isStandAloneCallType(callType) {
  return (callType !== callTypes.caller &&
          callType !== callTypes.child);
}

// returns a new version of the form that updates the error messages
// should this actually check for whether anything has changed?
// not planning to do that yet, but could add it as an optimization
export function validateOnBlur(form) {
  return validate(form);
}

function validate(form, ignoreTouched = false) {
  if (isStandAloneCallType(form.callType.value)) {
    return form;
  }
  let newForm = {};
  newForm = {
    ...form,
    callerInformation: validateCallerInformation(form.callerInformation, form.callType.value, ignoreTouched),
    childInformation: validateChildInformation(form.childInformation, form.callType.value, ignoreTouched),
    caseInformation: validateCaseInformation(form.caseInformation, form.callType.value, ignoreTouched)
  }
  return newForm;
}

// NOTE: MODIFIES INPUT
function handleCallerOrChildInformationKeys(formToModify, ignoreTouched) {
  Object.keys(formToModify).filter(key => (key !== 'type' && key !== 'validation' && key !== 'error')).forEach(key => {
    if (formToModify[key].type === FieldType.INTERMEDIATE) {
      handleCallerOrChildInformationKeys(formToModify[key], ignoreTouched);
    } else if (formToModify[key].validation) {
      if (formToModify[key].validation.includes(ValidationType.REQUIRED)) {
        const field = formToModify[key];
        if (field.type === FieldType.CHECKBOX_FIELD) {
          if ((ignoreTouched || field.touched) && countSelectedCategories(field) === 0) {
            field.error = "You must check at least one option";
            field.touched = true;
          } else {
            field.error = null;
          }
        } else {
          if ((ignoreTouched || field.touched) && !field.value) {
            // explicitly set it to touched so it can't get unset later
            field.touched = true;
            field.error = "This field is required";
          } else {
            field.error = null;
          }
        }
      }
    }
  });
}

function validateCallerInformation(original, callType, ignoreTouched) {
  if (callType !== callTypes.caller) {
    return original;
  }
  let newForm = cloneDeep(original);
  handleCallerOrChildInformationKeys(newForm, ignoreTouched);
  return newForm;
}

function validateChildInformation(original, callType, ignoreTouched) {
  let newForm = cloneDeep(original);
  handleCallerOrChildInformationKeys(newForm, ignoreTouched);
  return newForm;
}

function validateCaseInformation(original, callType, ignoreTouched) {
  let newForm = cloneDeep(original);
  handleCallerOrChildInformationKeys(newForm, ignoreTouched);
  return newForm;
}

// walk a form tree looking for non-null error values
export function formIsValid(form) {
  if ('callType' in form) {
    if (isStandAloneCallType(form.callType.value)) {
      return true;
    }
  }

  if ('error' in form && form.error !== null) {
    return false;
  }
  for (const key of Object.keys(form)) {
    if (typeof form[key] === 'object' 
        && form[key] !== null
        && !formIsValid(form[key])) {
      return false;
    }
  }
  return true;
};

export function countSelectedCategories(categoryFormSection) {
  let count = 0;
  for (const category of Object.keys(categoryFormSection).filter(key => key.startsWith('category'))) {
    for (const subcategory of Object.keys(categoryFormSection[category]).filter(key => key.startsWith('sub'))) {
      if (categoryFormSection[category][subcategory].value) {
        count++;
      }
    }
  }
  return count;
}

export function moreThanThreeCategoriesSelected(categoryFormSection) {
  return (countSelectedCategories(categoryFormSection) > 3);
}