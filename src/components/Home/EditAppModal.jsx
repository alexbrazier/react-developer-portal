import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import SimpleForm from '../common/SimpleForm';
import './EditAppModal.css';

export default class EditAppModal extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: '',
    loading: false,
  }

  submit = (app) => {
    this.props.onSubmit({ ...app, appId: this.props.id });
  };

  render() {
    return (
      <Modal
        className="EditAppModal"
        aria-labelledby="Edit App Modal"
        aria-describedby="Modal to edit app details"
        open
        onClose={this.props.onClose}
      >
        <Paper className="paper">
          <SimpleForm
            title={`Edit ${this.props.name} App`}
            submitName="Update"
            fields={[
              {
                name: 'Name',
                value: this.props.name,
              },
              {
                name: 'Logo',
                value: this.props.logo,
              },
            ]}
            error={this.props.error}
            loading={this.props.loading}
            onSubmit={this.submit}
            onCancel={this.props.onClose}
            showCancel
          />
        </Paper>
      </Modal>
    );
  }
}
