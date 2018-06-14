import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import './AppCard.css';

const AppCard = props => (
  <Card className="AppCard">
    <Link to={`/app/${props.id}`} title="View Details">
      <CardMedia
        className="image"
        image={props.logo}
      />
    </Link>
    <div>
      <CardContent>
        <Link
          to={`/app/${props.id}`}
          title="View Details"
        >
          <Typography gutterBottom variant="title" component="h2">
            {props.name}
          </Typography>
        </Link>
      </CardContent>
      <CardActions>
        <IconButton
          onClick={props.onEdit}
          color="primary"
          className="edit"
          title="Edit"
        >
          <EditIcon />
        </IconButton>
      </CardActions>
    </div>
  </Card>
);

AppCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default AppCard;
