import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginBox from '../components/Login/LoginBox';
import { login } from '../actions/user';
import logo from '../resources/monzo.svg';
import './Login.css';

export const Login = (props) => {
  if (props.user.accessToken) {
    return <Redirect to="/" />;
  }
  return (
    <div className="Login">
      <img className="logo" src={logo} alt="Monzo" />
      <LoginBox onSubmit={props.login} {...props.user} />
    </div>
  );
};

Login.propTypes = {
  user: PropTypes.shape({
    accessToken: PropTypes.string,
  }).isRequired,
  login: PropTypes.func.isRequired,
};

export default connect(
  state => ({ user: state.user }),
  {
    login,
  },
)(Login);
