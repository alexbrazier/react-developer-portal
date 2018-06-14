import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import './ErrorBox.css';

const ErrorBox = props => (
  <Paper className="ErrorBox">
    {props.children}
  </Paper>
);

ErrorBox.propTypes = {
  children: PropTypes.string.isRequired,
};

export default ErrorBox;
