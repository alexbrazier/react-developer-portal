import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import AppCard from '../components/Home/AppCard';
import { getApps, updateApp, editApp } from '../actions/apps';
import './Home.css';
import EditAppModal from '../components/Home/EditAppModal';

export class Home extends PureComponent {
  static propTypes = {
    getApps: PropTypes.func.isRequired,
    editApp: PropTypes.func.isRequired,
    updateApp: PropTypes.func.isRequired,
    apps: PropTypes.arrayOf(PropTypes.object),
    editingApp: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  }

  static defaultProps = {
    editingApp: undefined,
    apps: undefined,
  }

  constructor(props) {
    super(props);
    this.state = {};
    props.getApps();
  }

  onEdit = (app) => {
    this.props.editApp(app);
  };

  onEditClose = () => {
    this.props.editApp();
  };

  onEditSubmit = (app) => {
    this.props.updateApp(app);
  };

  render() {
    return (
      <div className="Home">
        <Typography variant="display2">Apps</Typography>
        {this.props.apps && (
          <section className="Apps">
            {this.props.apps.map(app => (
              <AppCard key={app.id} {...app} onEdit={() => this.onEdit(app)} />
            ))}
          </section>
        )}
        {this.props.editingApp && (
          <EditAppModal
            {...this.props.editingApp}
            onSubmit={this.onEditSubmit}
            onClose={this.onEditClose}
          />
        )}
      </div>
    );
  }
}

export default connect(
  state => state.apps,
  {
    getApps,
    updateApp,
    editApp,
  },
)(Home);
