import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import UserIcon from '@material-ui/icons/AccountCircle';
import logo from '../../resources/monzo.svg';
import { logout } from '../../actions/user';
import './Header.css';

class Header extends PureComponent {
  static propTypes = {
    email: PropTypes.string,
    loading: PropTypes.bool,
    logout: PropTypes.func.isRequired,
  }

  static defaultProps = {
    loading: false,
    email: '',
  }

  state = {};

  openUserMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  closeUserMenu = () => {
    this.setState({ anchorEl: null });
  };

  logout = () => {
    this.props.logout();
  };

  render() {
    return (
      <Fragment>
        <AppBar className="Header" position="static" color="primary">
          <Toolbar>
            <Link to="/">
              <img
                className="logo"
                src={logo}
                alt="Monzo"
              />
            </Link>
            <Typography variant="title" color="inherit" className="title">
              Development Portal
            </Typography>
            <Button
              className="hide-sm"
              color="inherit"
              onClick={this.openUserMenu}
            >
              <Avatar className="avatar">
                <UserIcon />
              </Avatar>
              {this.props.email}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              open={Boolean(this.state.anchorEl)}
              onClose={this.closeUserMenu}
            >
              <MenuItem onClick={this.logout}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        {this.props.loading && <LinearProgress color="secondary" />}
      </Fragment>
    );
  }
}

export default connect(
  state => ({ ...state.user, loading: state.loading }),
  {
    logout,
  },
)(Header);
