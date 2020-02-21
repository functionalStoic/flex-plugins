import React from 'react';
import PropTypes from 'prop-types';
import { withTaskContext } from '@twilio/flex-ui';
import { Checkbox, Tab, Tabs } from '@material-ui/core';

import {
  BottomButtonBar,
  CheckboxField,
  ColumnarBlock,
  Container,
  ErrorText,
  NameFields,
  StyledCheckboxLabel,
  StyledNextStepButton,
  TopNav,
  TwoColumnLayout,
  TransparentButton,
} from '../Styles/HrmStyles';
import callTypes from '../states/DomainConstants';
import decorateTab from './decorateTab';
import { formIsValid } from '../states/ValidationRules';
import FieldSelect from './FieldSelect';
import FieldText from './FieldText';
import BranchingFormIssueCategory from './BranchingFormIssueCategory';
import { formType, taskType } from '../types';

class TabbedForms extends React.PureComponent {
  static displayName = 'TabbedForms';

  static propTypes = {
    form: formType.isRequired,
    task: taskType.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleCategoryToggle: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleCallTypeButtonClick: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleFocus: PropTypes.func.isRequired,
  };

  state = {
    tab: 0,
  };

  tabChange = (event, tab) => this.setState({ tab });

  curriedHandleChange = (parents, name) => e =>
    this.props.handleChange(this.props.task.taskSid, parents, name, e.target.value || e.currentTarget.value);

  curriedHandleFocus = (parents, name) => () => this.props.handleFocus(this.props.task.taskSid, parents, name);

  defaultEventHandlers = (parents, name) => ({
    handleBlur: this.props.handleBlur,
    handleChange: this.curriedHandleChange(parents, name),
    handleFocus: this.curriedHandleFocus(parents, name),
  });

  render() {
    const taskId = this.props.task.taskSid;

    const body = new Array(3);

    // Caller Information
    body[0] = (
      <Container>
        <NameFields>
          <FieldText
            id="CallerInformation_FirstName"
            label="First name"
            field={this.props.form.callerInformation.name.firstName}
            {...this.defaultEventHandlers(['callerInformation', 'name'], 'firstName')}
          />

          <FieldText
            id="CallerInformation_LastName"
            label="Last name"
            field={this.props.form.callerInformation.name.lastName}
            {...this.defaultEventHandlers(['callerInformation', 'name'], 'lastName')}
          />
        </NameFields>

        <TwoColumnLayout>
          <ColumnarBlock>
            <FieldSelect
              field={this.props.form.callerInformation.relationshipToChild}
              id="CallerInformation_RelationshipToChild"
              name="relationshipToChild"
              label="Relationship to Child"
              options={['Friend', 'Neighbor', 'Parent', 'Grandparent', 'Teacher', 'Other']}
              {...this.defaultEventHandlers(['callerInformation'], 'relationshipToChild')}
            />

            <FieldSelect
              field={this.props.form.callerInformation.gender}
              id="CallerInformation_Gender"
              name="gender"
              label="Gender"
              options={['Male', 'Female', 'Other', 'Unknown']}
              {...this.defaultEventHandlers(['callerInformation'], 'gender')}
            />

            <FieldSelect
              field={this.props.form.callerInformation.age}
              id="CallerInformation_Age"
              name="age"
              label="Age"
              options={['0-3', '4-6', '7-9', '10-12', '13-15', '16-17', '18-25', '>25']}
              {...this.defaultEventHandlers(['callerInformation'], 'age')}
            />

            <FieldSelect
              field={this.props.form.callerInformation.language}
              id="CallerInformation_Language"
              name="language"
              label="Language"
              options={['Language 1', 'Language 2', 'Language 3']}
              {...this.defaultEventHandlers(['callerInformation'], 'language')}
            />

            <FieldSelect
              field={this.props.form.callerInformation.nationality}
              id="CallerInformation_Nationality"
              name="nationality"
              label="Nationality"
              options={['Nationality 1', 'Nationality 2', 'Nationality 3']}
              {...this.defaultEventHandlers(['callerInformation'], 'nationality')}
            />

            <FieldSelect
              field={this.props.form.callerInformation.ethnicity}
              id="CallerInformation_Ethnicity"
              name="ethnicity"
              label="Ethnicity"
              options={['Ethnicity 1', 'Ethnicity 2', 'Ethnicity 3']}
              {...this.defaultEventHandlers(['callerInformation'], 'ethnicity')}
            />
          </ColumnarBlock>

          <ColumnarBlock>
            <FieldText
              id="CallerInformation_StreetAddress"
              label="Street address"
              field={this.props.form.callerInformation.location.streetAddress}
              {...this.defaultEventHandlers(['callerInformation', 'location'], 'streetAddress')}
            />

            <FieldText
              id="CallerInformation_City"
              label="City"
              field={this.props.form.callerInformation.location.city}
              {...this.defaultEventHandlers(['callerInformation', 'location'], 'city')}
            />

            <FieldText
              id="CallerInformation_State/Country"
              label="State/County"
              field={this.props.form.callerInformation.location.stateOrCounty}
              {...this.defaultEventHandlers(['callerInformation', 'location'], 'stateOrCounty')}
            />

            <FieldText
              id="CallerInformation_PostalCode"
              label="Postal code"
              field={this.props.form.callerInformation.location.postalCode}
              {...this.defaultEventHandlers(['callerInformation', 'location'], 'postalCode')}
            />

            <FieldText
              id="CallerInformation_Phone#1"
              label="Phone #1"
              field={this.props.form.callerInformation.location.phone1}
              {...this.defaultEventHandlers(['callerInformation', 'location'], 'phone1')}
            />

            <FieldText
              id="CallerInformation_Phone#2"
              label="Phone #2"
              field={this.props.form.callerInformation.location.phone2}
              {...this.defaultEventHandlers(['callerInformation', 'location'], 'phone2')}
            />
          </ColumnarBlock>
        </TwoColumnLayout>
      </Container>
    );

    // Child Information
    body[1] = (
      <Container>
        <NameFields>
          <FieldText
            id="ChildInformation_FirstName"
            label="First name"
            field={this.props.form.childInformation.name.firstName}
            {...this.defaultEventHandlers(['childInformation', 'name'], 'firstName')}
          />

          <FieldText
            id="ChildInformation_FirstName"
            label="Last name"
            field={this.props.form.childInformation.name.lastName}
            {...this.defaultEventHandlers(['childInformation', 'name'], 'lastName')}
          />
        </NameFields>

        <TwoColumnLayout>
          <ColumnarBlock>
            <FieldSelect
              field={this.props.form.childInformation.gender}
              id="ChildInformation_Gender"
              name="gender"
              label="Gender"
              options={['Male', 'Female', 'Other', 'Unknown']}
              {...this.defaultEventHandlers(['childInformation'], 'gender')}
            />

            <FieldSelect
              field={this.props.form.childInformation.age}
              id="ChildInformation_Age"
              name="age"
              label="Age"
              options={['0-3', '4-6', '7-9', '10-12', '13-15', '16-17', '18-25', '>25']}
              {...this.defaultEventHandlers(['childInformation'], 'age')}
            />

            <FieldSelect
              field={this.props.form.childInformation.language}
              id="ChildInformation_Language"
              name="language"
              label="Language"
              options={['Language 1', 'Language 2', 'Language 3']}
              {...this.defaultEventHandlers(['childInformation'], 'language')}
            />

            <FieldSelect
              field={this.props.form.childInformation.nationality}
              id="ChildInformation_Nationality"
              name="nationality"
              label="Nationality"
              options={['Nationality 1', 'Nationality 2', 'Nationality 3']}
              {...this.defaultEventHandlers(['childInformation'], 'nationality')}
            />

            <FieldSelect
              field={this.props.form.childInformation.ethnicity}
              id="ChildInformation_Ethnicity"
              name="ethnicity"
              label="Ethnicity"
              options={['Ethnicity 1', 'Ethnicity 2', 'Ethnicity 3']}
              {...this.defaultEventHandlers(['childInformation'], 'ethnicity')}
            />

            <CheckboxField>
              <Checkbox
                name="refugee"
                id="ChildInformation_Refugee"
                checked={this.props.form.childInformation.refugee.value}
                onClick={() =>
                  this.props.handleChange(
                    taskId,
                    ['childInformation'],
                    'refugee',
                    !this.props.form.childInformation.refugee.value,
                  )
                }
              />
              <StyledCheckboxLabel htmlFor="ChildInformation_Refugee">Refugee?</StyledCheckboxLabel>
            </CheckboxField>

            <CheckboxField>
              <Checkbox
                name="disabledOrSpecialNeeds"
                id="ChildInformation_DisabledOrSpecialNeeds"
                checked={this.props.form.childInformation.disabledOrSpecialNeeds.value}
                onClick={() =>
                  this.props.handleChange(
                    taskId,
                    ['childInformation'],
                    'disabledOrSpecialNeeds',
                    !this.props.form.childInformation.disabledOrSpecialNeeds.value,
                  )
                }
              />
              <StyledCheckboxLabel htmlFor="ChildInformation_DisabledOrSpecialNeeds">
                Disabled/Special Needs?
              </StyledCheckboxLabel>
            </CheckboxField>

            <CheckboxField>
              <Checkbox
                name="hiv"
                id="ChildInformation_HIV"
                checked={this.props.form.childInformation.hiv.value}
                onClick={() =>
                  this.props.handleChange(
                    taskId,
                    ['childInformation'],
                    'hiv',
                    !this.props.form.childInformation.hiv.value,
                  )
                }
              />
              <StyledCheckboxLabel htmlFor="ChildInformation_HIV">HIV Positive?</StyledCheckboxLabel>
            </CheckboxField>
          </ColumnarBlock>

          <ColumnarBlock>
            <FieldText
              id="ChildInformation_StreetAddress"
              label="Street address"
              field={this.props.form.childInformation.location.streetAddress}
              {...this.defaultEventHandlers(['childInformation', 'location'], 'streetAddress')}
            />

            <FieldText
              id="ChildInformation_City"
              label="City"
              field={this.props.form.childInformation.location.city}
              {...this.defaultEventHandlers(['childInformation', 'location'], 'city')}
            />

            <FieldText
              id="ChildInformation_State/Country"
              label="State/County"
              field={this.props.form.childInformation.location.stateOrCounty}
              {...this.defaultEventHandlers(['childInformation', 'location'], 'stateOrCounty')}
            />

            <FieldText
              id="ChildInformation_PostalCode"
              label="Postal code"
              field={this.props.form.childInformation.location.postalCode}
              {...this.defaultEventHandlers(['childInformation', 'location'], 'postalCode')}
            />

            <FieldText
              id="ChildInformation_Phone#1"
              label="Phone #1"
              field={this.props.form.childInformation.location.phone1}
              {...this.defaultEventHandlers(['childInformation', 'location'], 'phone1')}
            />

            <FieldText
              id="ChildInformation_Phone#2"
              label="Phone #2"
              field={this.props.form.childInformation.location.phone2}
              {...this.defaultEventHandlers(['childInformation', 'location'], 'phone2')}
            />

            <FieldText
              id="ChildInformation_SchoolName"
              label="School name"
              field={this.props.form.childInformation.school.name}
              {...this.defaultEventHandlers(['childInformation', 'school'], 'name')}
            />

            <FieldText
              id="ChildInformation_GradeLevel"
              label="Grade level"
              field={this.props.form.childInformation.school.gradeLevel}
              {...this.defaultEventHandlers(['childInformation', 'school'], 'gradeLevel')}
            />
          </ColumnarBlock>
        </TwoColumnLayout>
      </Container>
    );

    // Issue Categorization
    body[2] = (
      <Container style={{ display: 'flex', flexDirection: 'column' }}>
        {this.props.form.caseInformation.categories.error ? (
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: '20px' }}>
            <ErrorText>{this.props.form.caseInformation.categories.error}</ErrorText>
          </div>
        ) : (
          ''
        )}
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: '20px' }}>
          <BranchingFormIssueCategory
            category="1"
            handleCategoryToggle={this.props.handleCategoryToggle}
            taskId={taskId}
            form={this.props.form}
          />
          <BranchingFormIssueCategory
            category="2"
            handleCategoryToggle={this.props.handleCategoryToggle}
            taskId={taskId}
            form={this.props.form}
          />
          <BranchingFormIssueCategory
            category="3"
            handleCategoryToggle={this.props.handleCategoryToggle}
            taskId={taskId}
            form={this.props.form}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <BranchingFormIssueCategory
            category="4"
            handleCategoryToggle={this.props.handleCategoryToggle}
            taskId={taskId}
            form={this.props.form}
          />
          <BranchingFormIssueCategory
            category="5"
            handleCategoryToggle={this.props.handleCategoryToggle}
            taskId={taskId}
            form={this.props.form}
          />
          <BranchingFormIssueCategory
            category="6"
            handleCategoryToggle={this.props.handleCategoryToggle}
            taskId={taskId}
            form={this.props.form}
          />
        </div>
      </Container>
    );

    /*
     * this is hokey
     * we need to be able to mark that the categories field has been touched
     * the only way to do this that I see is this.  Blech.
     */
    if (this.state.tab === 2 && !this.props.form.caseInformation.categories.touched) {
      this.props.handleFocus(taskId, ['caseInformation'], 'categories');
    }

    // Case Information
    body[3] = (
      <Container>
        <TwoColumnLayout>
          <ColumnarBlock>
            <FieldText
              id="CaseInformation_CallSummary"
              label="Call summary"
              field={this.props.form.caseInformation.callSummary}
              rows={10}
              {...this.defaultEventHandlers(['caseInformation'], 'callSummary')}
            />

            <FieldSelect
              field={this.props.form.caseInformation.referredTo}
              id="CaseInformation_ReferredTo"
              name="referredTo"
              label="Referred To"
              options={['No Referral', 'Referral 1', 'Referral 2', 'Referral 3']}
              {...this.defaultEventHandlers(['caseInformation'], 'referredTo')}
            />

            <FieldSelect
              field={this.props.form.caseInformation.status}
              id="CaseInformation_Status"
              name="status"
              label="Status"
              options={['Open', 'In Progress', 'Closed']}
              {...this.defaultEventHandlers(['caseInformation'], 'status')}
            />

            <FieldSelect
              field={this.props.form.caseInformation.howDidTheChildHearAboutUs}
              id="CaseInformation_HowDidTheChildHearAboutUs"
              name="howDidTheChildHearAboutUs"
              label="How did the child hear about us?"
              options={['Word of Mouth', 'Media', 'Friend', 'School']}
              {...this.defaultEventHandlers(['caseInformation'], 'howDidTheChildHearAboutUs')}
            />
          </ColumnarBlock>

          <ColumnarBlock>
            <CheckboxField>
              <Checkbox
                name="keepConfidential"
                id="CaseInformation_KeepConfidential"
                checked={this.props.form.caseInformation.keepConfidential.value}
                onClick={() =>
                  this.props.handleChange(
                    taskId,
                    ['caseInformation'],
                    'keepConfidential',
                    !this.props.form.caseInformation.keepConfidential.value,
                  )
                }
              />
              <StyledCheckboxLabel htmlFor="CaseInformation_KeepConfidential">Keep Confidential?</StyledCheckboxLabel>
            </CheckboxField>

            <CheckboxField>
              <Checkbox
                name="okForCaseWorkerToCall"
                id="CaseInformation_OkForCaseWorkerToCall"
                checked={this.props.form.caseInformation.okForCaseWorkerToCall.value}
                onClick={() =>
                  this.props.handleChange(
                    taskId,
                    ['caseInformation'],
                    'okForCaseWorkerToCall',
                    !this.props.form.caseInformation.okForCaseWorkerToCall.value,
                  )
                }
              />
              <StyledCheckboxLabel htmlFor="CaseInformation_OkForCaseWorkerToCall">
                OK for case worker to call?
              </StyledCheckboxLabel>
            </CheckboxField>

            <CheckboxField>
              <Checkbox
                name="didYouDiscussRightsWithTheChild"
                id="CaseInformation_DidYouDiscussRightsWithTheChild"
                checked={this.props.form.caseInformation.didYouDiscussRightsWithTheChild.value}
                onClick={() =>
                  this.props.handleChange(
                    taskId,
                    ['caseInformation'],
                    'didYouDiscussRightsWithTheChild',
                    !this.props.form.caseInformation.didYouDiscussRightsWithTheChild.value,
                  )
                }
              />
              <StyledCheckboxLabel htmlFor="CaseInformation_DidYouDiscussRightsWithTheChild">
                Did you discuss rights with the child?
              </StyledCheckboxLabel>
            </CheckboxField>

            <CheckboxField>
              <Checkbox
                name="didTheChildFeelWeSolvedTheirProblem"
                id="CaseInformation_DidTheChildFeelWeSolvedTheirProblem"
                checked={this.props.form.caseInformation.didTheChildFeelWeSolvedTheirProblem.value}
                onClick={() =>
                  this.props.handleChange(
                    taskId,
                    ['caseInformation'],
                    'didTheChildFeelWeSolvedTheirProblem',
                    !this.props.form.caseInformation.didTheChildFeelWeSolvedTheirProblem.value,
                  )
                }
              />
              <StyledCheckboxLabel htmlFor="CaseInformation_DidTheChildFeelWeSolvedTheirProblem">
                Did the child feel we solved their problem?
              </StyledCheckboxLabel>
            </CheckboxField>

            <CheckboxField>
              <Checkbox
                name="wouldTheChildRecommendUsToAFriend"
                id="CaseInformation_WouldTheChildRecommendUsToAFriend"
                checked={this.props.form.caseInformation.wouldTheChildRecommendUsToAFriend.value}
                onClick={() =>
                  this.props.handleChange(
                    taskId,
                    ['caseInformation'],
                    'wouldTheChildRecommendUsToAFriend',
                    !this.props.form.caseInformation.wouldTheChildRecommendUsToAFriend.value,
                  )
                }
              />
              <StyledCheckboxLabel htmlFor="CaseInformation_WouldTheChildRecommendUsToAFriend">
                Would the child recommend us to a friend?
              </StyledCheckboxLabel>
            </CheckboxField>
          </ColumnarBlock>
        </TwoColumnLayout>
      </Container>
    );

    const tabs = [
      decorateTab('Caller Information', this.props.form.callerInformation),
      decorateTab('Child Information', this.props.form.childInformation),
      decorateTab('Issue Categorization', this.props.form.caseInformation.categories),
      <Tab key="Case Information" label="Case Information" />, // normal validate logic won't work here
    ];

    // TODO(nick): this is probably not the best way to hide the caller info tab
    if (this.props.form.callType.value !== callTypes.caller) {
      tabs.shift();
      body.shift();
    }

    return (
      <>
        <TopNav>
          <TransparentButton onClick={e => this.props.handleCallTypeButtonClick(taskId, '')}>
            &lt; BACK
          </TransparentButton>
        </TopNav>
        <Tabs name="tab" value={this.state.tab} onChange={this.tabChange} centered>
          {tabs}
        </Tabs>
        {body[this.state.tab]}
        <BottomButtonBar>
          {this.state.tab < body.length - 1 ? (
            <StyledNextStepButton
              roundCorners={true}
              onClick={() => this.setState(prevState => ({ tab: prevState.tab + 1 }))}
            >
              Next
            </StyledNextStepButton>
          ) : (
            <StyledNextStepButton
              roundCorners={true}
              onClick={() => this.props.handleSubmit(this.props.task)}
              disabled={!formIsValid(this.props.form)}
            >
              Submit
            </StyledNextStepButton>
          )}
        </BottomButtonBar>
      </>
    );
  }
}

export default withTaskContext(TabbedForms);