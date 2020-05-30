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

import {createOffer, getOffers, clearErrors} from '../redux/actions/offerActions';

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

class CreateOffer extends Component {
    state = {
        open: false,
        brandLicense: '',
        brandName: '',
        brandId: '',
        imagePath: '',
        originalQuantity: 25,
        rewardAmount: 5,
        videoLength: 60,
        productName: '',
        productDescription: '',
        videoUrl: '',
        surveyCode: '',
        surveyId: ''
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

        const offer  = {
            brandLicense: this.state.brandLicense,
            brandName: this.state.brandName,
            brandId: this.state.brandId,
            imagePath: this.state.imagePath,
            originalQuantity: this.state.originalQuantity,
            rewardAmount: this.state.rewardAmount,
            videoLength: this.state.videoLength,
            productName: this.state.productName,
            productDescription: this.state.productDescription,
            videoUrl: this.state.videoUrl,
            surveyCode: this.state.surveyCode,
            surveyId: this.state.surveyId
        };
        this.props.createOffer(offer);
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
                            <DialogTitle>Create a new offer</DialogTitle>
                            <DialogContent>
                            <form onSubmit={this.handleSubmit}>
                            <TextField
                                    name="productName"
                                    type="text"
                                    label="productName"
                                    rows="1"
                                    placeholder="enter productName"
                                    className={classes.textField}
                                    onChange={this.handleChange}
                                    fullWidth />
                                
                                <TextField
                                    name="brandName"
                                    type="text"
                                    label="brandName"
                                    rows="3"
                                    multiline
                                    placeholder="enter brand name"
                                    className={classes.textField}
                                    onChange={this.handleChange}
                                    fullWidth />

                                <TextField
                                    name="brandId"
                                    type="text"
                                    label="brandId"
                                    rows="1"
                                    placeholder="enter brand id"
                                    className={classes.textField}
                                    onChange={this.handleChange}
                                    fullWidth />

<TextField
                                    name="brandLicense"
                                    type="text"
                                    label="brandLicense"
                                    rows="1"
                                    placeholder="enter brand license"
                                    className={classes.textField}
                                    onChange={this.handleChange}
                                    fullWidth />

<TextField
                                    name="imagePath"
                                    type="text"
                                    label="imagePath"
                                    rows="1"
                                    placeholder="enter brand license"
                                    className={classes.textField}
                                    onChange={this.handleChange}
                                    fullWidth />


<TextField
                                    name="originaQuantity"
                                    type="number"
                                    label="originalQuantity"
                                    placeholder="enter quantity"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                      }}
                                    onChange={this.handleChange}
                                    fullWidth />

<TextField
                                    name="rewardAmount"
                                    type="number"
                                    label="rewardAmount"
                                    placeholder="enter reward"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                      }}
                                    onChange={this.handleChange}
                                    fullWidth />

<TextField
                                    name="videoLength"
                                    type="number"
                                    label="videoLength"
                                    placeholder="enter videoLength"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                      }}
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

    
CreateOffer.propTypes = {
    createOffer: PropTypes.func.isRequired,
    getOffers: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI
  });

  const mapDispatchToProps = {
    createOffer, getOffers, clearErrors
  };

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(CreateOffer));