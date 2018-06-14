import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import SimpleForm from '../common/SimpleForm';
import './LoginBox.css';

const LoginBox = props => (
  <Paper className="LoginBox">
    <SimpleForm
      title="Login"
      submitName="Login"
      fields={[
        {
          name: 'Email',
          type: 'email',
        },
        {
          name: 'Password',
          type: 'password',
        },
      ]}
      error={props.error}
      loading={props.loading}
      onSubmit={props.onSubmit}
    />
  </Paper>
);

LoginBox.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
};

LoginBox.defaultProps = {
  error: '',
  loading: false,
};

export default LoginBox;
