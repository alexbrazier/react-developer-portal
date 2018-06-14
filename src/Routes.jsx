import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './pages/Home';
import App from './pages/App';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import RequireAuth from './components/common/RequireAuth';

const withHeader = Component => props => (
  <Fragment>
    <RequireAuth />
    <Header />
    <Component {...props} />
  </Fragment>
);

const HomeWithHeader = withHeader(Home);
const AppWithHeader = withHeader(App);

// For hosting on GitHub
const basename = process.env.NODE_ENV === 'production' ? '/react-developer-portal' : '';

const Routes = () => (
  <Router basename={basename}>
    <Fragment>
      <Switch>
        <Route exact path="/" render={HomeWithHeader} />
        <Route exact path="/app/:id" render={AppWithHeader} />
        <Route exact path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </Fragment>
  </Router>
);

export default Routes;
