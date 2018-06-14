import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import monzoError from '../resources/monzo-404.png';
import './NotFound.css';

const NotFound = () => (
  <div className="NotFound">
    <div className="left">
      <h1>404</h1>
      <p>
        Sorry, we can{"'"}t find the page you{"'"}re looking for
      </p>
      <Link to="/">
        <Button color="secondary" variant="raised">
          Return to Home Page
        </Button>
      </Link>
    </div>
    <img
      className="hide-sm"
      src={monzoError}
      alt="404"
    />
  </div>
);

export default NotFound;
