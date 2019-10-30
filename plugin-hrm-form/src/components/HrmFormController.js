import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TaskView from '../Views/TaskView';
import { withTaskContext } from "@twilio/flex-ui";
import { namespace, contactFormsBase } from '../states';
import { Actions } from '../states/ContactState';
import { validateFormBeforeSubmit } from '../states/ValidationRules';

// should this be a static method on the class or separate.  Or should it even be here at all?
export function saveToHrm(form, abortFunction) {
  if (!validateFormBeforeSubmit(form)) {
    // we get "twilio-flex.min.js:274 Uncaught (in promise) Error: Action cancelled by before event"
    // is that okay?
    if (!window.confirm("Validation failed.  Are you sure you want to end the task without recording?")) {
      abortFunction();
    }
    return false;
  }
  
  const url = 'https://hrm.tl.barbarianrobot.com';
  // const url = 'http://localhost:8080';
  let formdata = {
    form: form
  };
  // print the form values to the console
  console.log("Sending: " + JSON.stringify(formdata));
  fetch(url + '/contacts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formdata)
  })
  .then(function(response) {
    if (!response.ok) {
      console.log("Form error: " + response.statusText);
      if (!window.confirm("Error from backend system.  Are you sure you want to end the task without recording?")) {
        abortFunction();
      }
    }
    return response.json();
  })
  .then(function(myJson) {
    console.log("Received: " + JSON.stringify(myJson));
  })
  .catch(function(response) {
    console.log("Caught something");
    // TODO(nick): fix this. this isn't working I don't think the function is working from inside the promise.
    if (!window.confirm("Unknown error saving form.  Are you sure you want to end the task without recording?")) {
      abortFunction();
    }
  });
}

const HrmFormController = (props) => {
  // I don't think this should be needed, since we shouldn't be here
  // if there's no task.  But without this check, props.task.taskSid
  // will error when the task is completed, so there may be a lifecycle issue.
  if (!props.task) {
    return null;
  }

  return (
    <TaskView 
      thisTask={props.thisTask} 
      key={props.task.taskSid} 
      form={props.form} 
      handleChange={props.handleChange} 
      handleCallTypeButtonClick={props.handleCallTypeButtonClick}
      handleCheckbox={props.handleCheckbox}
    />
  );
}

const mapStateToProps = (state, ownProps) => {
  // This should already have been created when beforeAcceptTask is fired
  return {
    form: state[namespace][contactFormsBase]['tasks'][ownProps.thisTask.taskSid]
  }
};

const mapDispatchToProps = (dispatch) => ({
  handleCallTypeButtonClick: bindActionCreators(Actions.handleCallTypeButtonClick, dispatch),
  handleChange: bindActionCreators(Actions.handleChange, dispatch),
  handleCheckbox: bindActionCreators(Actions.handleCheckbox, dispatch)
});

export default withTaskContext(connect(mapStateToProps, mapDispatchToProps)(HrmFormController));
