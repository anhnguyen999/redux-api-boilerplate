import React from 'react';
import { Field, reduxForm } from 'redux-form';

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.age) {
    errors.age = 'Required';
  } else if (isNaN(Number(values.age))) {
    errors.age = 'Must be a number';
  } else if (Number(values.age) < 18) {
    errors.age = 'Sorry, you must be at least 18 years old';
  }
  return errors;
};

const warn = (values) => {
  const warnings = {};
  if (values.age < 19) {
    warnings.age = 'Hmm, you seem a bit young...';
  }
  return warnings;
};

const RenderField = ({ id, input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <div>
      <input id={id} {...input} placeholder={label} type={type} />
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);
RenderField.propTypes = {
  id: React.PropTypes.string,
  input: React.PropTypes.object,
  label: React.PropTypes.string,
  type: React.PropTypes.string,
  meta: React.PropTypes.object,
};

const SyncValidateForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field id="username" name="username" type="text" component={RenderField} label="Username" />
      <Field id="email" name="email" type="text" component={RenderField} label="Email" />
      <Field id="age" name="age" type="number" component={RenderField} label="Age" />
      <div>
        <button type="submit" disabled={submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>
  );
};
SyncValidateForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  reset: React.PropTypes.func,
  pristine: React.PropTypes.bool,
  submitting: React.PropTypes.bool,
};

export default reduxForm({
  form: 'syncValidate',
  validate,
  warn,
})(SyncValidateForm);
