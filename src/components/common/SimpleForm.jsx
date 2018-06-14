import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ErrorBox from './ErrorBox';
import './SimpleForm.css';

class SimpleForm extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    fields: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string,
      value: PropTypes.string,
    })).isRequired,
    submitName: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool,
    showCancel: PropTypes.bool,
    onCancel: PropTypes.func,
  };

  static defaultProps = {
    error: '',
    loading: false,
    showCancel: false,
    onCancel: () => {},
  };

  constructor(props) {
    super(props);
    const state = {};
    props.fields.forEach((field) => {
      state[field.name.toLowerCase()] = field.value || '';
    });
    this.state = state;
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    return (
      <form
        className="SimpleForm"
        noValidate
        autoComplete="off"
        onSubmit={() => this.props.onSubmit(this.state)}
      >
        <Typography variant="title">{this.props.title}</Typography>
        {this.props.error && <ErrorBox>{this.props.error}</ErrorBox>}

        {this.props.fields.map(field => (
          <TextField
            key={field.name}
            fullWidth
            type={field.type}
            label={field.name}
            value={this.state[field.name.toLowerCase()]}
            onChange={this.handleChange(field.name.toLowerCase())}
            margin="normal"
          />
        ))}
        {this.props.showCancel && (
          <Button
            fullWidth
            variant="outlined"
            size="large"
            color="secondary"
            onClick={this.props.onCancel}
          >
            Cancel
          </Button>
        )}
        <Button
          disabled={this.props.loading}
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          color="primary"
          onClick={() => this.props.onSubmit(this.state)}
        >
          {this.props.submitName}
        </Button>
      </form>
    );
  }
}

export default SimpleForm;
