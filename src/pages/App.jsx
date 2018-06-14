import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import BackIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';
import { getAppUsers } from '../actions/app';
import UsersTable from '../components/App/UsersTable';
import './App.css';

export class App extends PureComponent {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    getAppUsers: PropTypes.func.isRequired,
    app: PropTypes.shape({
      users: PropTypes.array,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    const { id } = props.match.params;
    props.getAppUsers(id, 0);
  }

  changeUsersPage = (page) => {
    const appId = this.props.match.params.id;
    this.props.getAppUsers(appId, page);
  };

  render() {
    return (
      <div className="App">
        <Link to="/" className="back">
          <Button
            variant="outlined"
            size="small"
            color="secondary"
          >
            <BackIcon />
            Back to Apps
          </Button>
        </Link>
        <Typography variant="display2">App</Typography>
        <Typography variant="title">Users</Typography>
        {this.props.app.users && (
          <UsersTable {...this.props.app} onChangePage={this.changeUsersPage} />
        )}
      </div>
    );
  }
}

export default connect(
  state => ({ app: state.app }),
  {
    getAppUsers,
  },
)(App);
