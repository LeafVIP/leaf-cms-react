import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
// Redux stuff
import { connect } from 'react-redux';
import { createSurvey } from '../../redux/actions/surveyActions';

const styles = (theme) => ({
    ...theme.root,
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

  class CreateSurvey extends Component {
      state ={
          open: false,
          offerId: '',
          surveyId: ''
      }

    handleOpen = () => {
        this.setState({open: true});
    }

    handleClose = () => {
        this.setState({open: false});
    }

    handleChange = (event) => {
        console.log('handleChange: ' +event.target.name +" - " +event.target.value);
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.createSurvey(this.state.offerId, this.state.surveyId);
        this.handleClose();
    };

    render () {
        const {
            classes,
            UI: { loading }
        } = this.props;

        return (
            <Fragment>


                <MyButton 
                    onClick={this.handleOpen}
                    tip="create a survey">
                        <AddIcon />
                 </MyButton>

                 <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="xs">
                    
                    <MyButton
                        tip="Close"
                        onClick={this.handleClose}
                        tipClassName={classes.closeButton} >
                        <CloseIcon />
                    </MyButton>

                    <DialogTitle>Import a survey</DialogTitle>
                
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>

                        <TextField
                                name="offerId"
                                type="text"
                                label="Offer ID"
                                onChange={this.handleChange} />
                        <TextField
                                name="surveyId"
                                type="text"
                                label="Survey ID"
                                onChange={this.handleChange} />

                        <Button 
                            type="submit"
                            variant="contained"
                            color="secondary"
                            className={classes.submitButton}
                            disabled={loading}>
                                submit
                                {loading && (
                                    <CircularProgress
                                        size={30}
                                        className={classes.progressSpinner} />
                                )}
                            </Button>
                        </form>
                    </DialogContent>
                 </Dialog>
            </Fragment>
        )
    }
  }

  CreateSurvey.propTypes = {
      createSurvey: PropTypes.func.isRequired,
      UI: PropTypes.object.isRequired
  };

  const mapStateToProps = (state) => ({
      UI: state.UI
  })

  const mapActionsToProps = {
      createSurvey
  }

  export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CreateSurvey));