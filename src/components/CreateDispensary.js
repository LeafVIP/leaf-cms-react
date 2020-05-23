import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../util/MyButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import { createDispensary, clearErrors, getDispensaries } from '../redux/actions/dataActions';

const styles = (theme) => ({
  
    submitButton: {
        position: 'relative',
        float: 'right',
        marginTop: 10
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '91%',
        top: '6%'
    }
});

class CreateDispensary extends Component {

    state = {
        open: false,
        displayName: '',
        address: '',
        cmid: '',
        license: '',
        errors: {}
    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            });
        }

        if(!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({body: '', open: false, errors: {}});
        }
    }

        handleOpen = () => {
            this.setState({open: true});
        }

        handleClose = () => {
            this.props.clearErrors();
            this.setState({open: false, errors: {}});
        }

        handleChange = (event) => {
            this.setState({[event.target.name]: event.target.value});
        };

        handleSubmit = (event) => {
            event.preventDefault();

            const dispo  = {
                displayName: this.state.displayName,
                address: this.state.address,
                cmid: this.state.cmid,
                license: this.state.license
            };
            this.props.createDispensary(dispo);
        };

       render() {
            const {errors} = this.state
            const{
                classes,
                UI: {loading}
            } = this.props;

            return (
                <Fragment>
                    <MyButton onClick={this.handleOpen}  tip="Create a Dispensary">
                        <AddIcon />
                    </MyButton>
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        fullWidth
                        maxWidth="sm">
                            <MyButton
                                tip="Close"
                                onClick={this.handleClose}
                                tipClassName={classes.closeButton}>
                                    <CloseIcon />
                                </MyButton>
                                <DialogTitle>Create a new dispensary</DialogTitle>
                                <DialogContent>
                                <form onSubmit={this.handleSubmit}>
                                <TextField
                                        name="displayName"
                                        type="text"
                                        label="displayName"
                                        rows="1"
                                        placeholder="enter displayNamee"
                                        error={errors.body ? true: false}
                                        helperText={errors.displayName}
                                        className={classes.textField}
                                        onChange={this.handleChange}
                                        fullWidth />
                                    
                                    <TextField
                                        name="address"
                                        type="text"
                                        label="address"
                                        rows="3"
                                        multiline
                                        placeholder="enter address name"
                                        error={errors.body ? true: false}
                                        helperText={errors.address}
                                        className={classes.textField}
                                        onChange={this.handleChange}
                                        fullWidth />

                                    <TextField
                                        name="cmid"
                                        type="text"
                                        label="cmid"
                                        rows="1"
                                        placeholder="enter cmid name"
                                        error={errors.body ? true: false}
                                        helperText={errors.cmid}
                                        className={classes.textField}
                                        onChange={this.handleChange}
                                        fullWidth />

                                    <TextField
                                        name="license"
                                        type="text"
                                        label="license"
                                        rows="1"
                                        placeholder="enter license name"
                                        error={errors.body ? true: false}
                                        helperText={errors.license}
                                        className={classes.textField}
                                        onChange={this.handleChange}
                                        fullWidth />
                                         <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
              </form>

                                </DialogContent>
                        </Dialog>
                </Fragment>
            )
        }
    }
    
    CreateDispensary.propTypes = {
        createDispensary: PropTypes.func.isRequired,
        getDispensaries: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
        UI: PropTypes.object.isRequired
    };

    const mapStateToProps = (state) => ({
        UI: state.UI
      });

      const mapDispatchToProps = {
        createDispensary, getDispensaries, clearErrors
      };

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(CreateDispensary));