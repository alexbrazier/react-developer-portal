import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { logout, setUser } from '../../actions/user';

class RequireAuth extends PureComponent {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
    accessToken: PropTypes.string,
  }

  static defaultProps = {
    accessToken: undefined,
  }

  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.loaded && !prevState.notAuthed && !nextProps.accessToken) {
      return { notAuthed: true };
    }
    return null;
  }

  componentDidMount() {
    this.checkLoginStatus();
    this.setState({ loaded: true }); // eslint-disable-line
  }

  logout() {
    this.props.logout();
  }

  checkLoginStatus() {
    if (!this.props.accessToken) {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        this.logout();
      } else {
        try {
          const decoded = jwtDecode(token);
          if (decoded.exp && Date.now() / 1000 > decoded.exp) {
            this.logout();
          } else {
            this.props.setUser({ email: decoded.email, accessToken: token });
          }
        } catch (err) {
          console.error(`An error occurred in Auth: ${err.message}`); // eslint-disable-line no-console
          this.logout();
        }
      }
    }
  }

  render() {
    if (this.state.notAuthed) {
      return <Redirect to={{ pathname: '/login', state: { } }} />;
    }
    return null;
  }
}

export default connect(
  state => state.user,
  {
    logout,
    setUser,
  },
)(RequireAuth);
