import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
// Redux stuff
import { connect } from 'react-redux';
import { updateUser } from '../../redux/actions/userActions';
// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// Icons
import EditIcon from '@material-ui/icons/Edit';

const styles = {
  button: {
    float: 'right'
  }
};

class EditUserDetails extends Component {
  state = {
    open: false,
    firstName: 'first name',
    lastName: 'last name',
    email: 'email'
  };
  mapUserDetailsToState = (user) => {
    this.setState({
      email: user.email ? user.email : '',
      firstName: user.firstName ? user.firstName : '',
      lastName: user.lastName ? user.lastName : ''
    });
  };
  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserDetailsToState(this.props.user);
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  componentDidMount() {
    const { user } = this.props;
    this.mapUserDetailsToState(user);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = () => {
    const userDetails = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email
    };
    this.props.editUserDetails(userDetails);
    this.handleClose();
  };
  render() {
    const { classes, user } = this.props;
    return (
      <Fragment>
        <MyButton
          tip="Edit Details"
          onClick={this.handleOpen}
          btnClassName={classes.button}
        >
          <EditIcon color="secondary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit your details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="firstName"
                tpye="text"
                label="firstName"
                multiline
                rows="3"
                placeholder="A short firstName about yourself"
                className={classes.textField}
                value={user.firstName}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="lastName"
                tpye="text"
                label="lastName"
                placeholder="Your personal/professinal lastName"
                className={classes.textField}
                value={user.lastName}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="email"
                tpye="text"
                label="email"
                placeholder="Where you live"
                className={classes.textField}
                value={user.email}
                onChange={this.handleChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditUserDetails.propTypes = {
  updateUser: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
  user: state.user
});

export default connect(
  mapStateToProps,
  { updateUser }
)(withStyles(styles)(EditUserDetails));
