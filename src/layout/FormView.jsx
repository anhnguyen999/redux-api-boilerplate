import React, { PureComponent } from 'react';
import SyncValidateForm from '../form/SyncValidateForm';

export default class FormView extends PureComponent {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(data) {
    this.setState(data);
  }

  render() {
    return (
      <div>
        <SyncValidateForm onSubmit={this.handleSubmit} />
        {this.state && (
          <div>
            <p>Form data is: </p>
            <pre>{JSON.stringify(this.state, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  }
};
