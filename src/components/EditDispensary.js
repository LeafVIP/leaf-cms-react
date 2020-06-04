import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import MyButton from '../util/MyButton';
import EditIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import  Dialog  from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';


const styles = {
    root: {
        margin: 10,
        width: '25ch'
    },
    closeButton: {
        position: 'absolute',
        left: '91%',
        top: '6%'  
    }
}

class EditDispensary extends Component {

    state = {
        open: false,
        displayName: '',
        address: '',
        cmId: '',
        license: '',
        employees: 0
    }

    handleOpen = () => {
        this.setState({open: true})
    }

    handleClose = () => {
        this.setState({open: false})
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const dispensary  = {
            displayName: this.state.displayName,
            address: this.state.address,
            cmId: this.state.cmId,
            license: this.state.license
        };
        this.props.updateDispensary(dispensary);
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...this.state,
            displayName: nextProps.data.dispensary.displayName,
            address: nextProps.data.dispensary.address,
            cmId: nextProps.data.dispensary.cmId,
            license: nextProps.data.dispensary.license,
            employees: nextProps.data.dispensary.employees,
            users: nextProps.data.dispensary.users,
        })
    }
    render() {
       

        const {
            data: {
                dispensary: {
                    displayName,
                    address,
                    cmId, 
                    license,
                    employees
            }
            }
        } = this.props;

        return (
            <Fragment>
                <MyButton 
                    tip="edit"
                    onClick={this.handleOpen}>
                        <EditIcon />
                    </MyButton>
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        fullWidth>


                             

                                <DialogTitle>
                                    Edit Dispensary


                                    <MyButton
                                        tip="close"
                                        onClick={this.handleClose}
                                        tipClassName={styles.closeButton}>
                                            <CloseIcon />
                                    </MyButton>

                                </DialogTitle>

                                <DialogContent>
                                    <form 
                                        className={styles.root}
                                        onSubmit={this.handleSubmit}>
                                            <Grid container spacing={3}>
                                                <Grid item sm={12}>
                                                        <TextField
                                                            name="displayName"
                                                            type="text"
                                                            label={displayName}
                                                            placeholder="Name"
                                                            className={styles.textField}
                                                            onChange={this.handleChange} 
                                                            variant='outlined' 
                                                            fullWidth />
                                                </Grid>
                                        
                                                <Grid item sm={6} xs={3}>
                                                        <TextField
                                                        name="license"
                                                        type="text"
                                                        label={license}
                                                        placeholder="License"
                                                        className={styles.textField}
                                                        onChange={this.handleChange} 
                                                        variant='outlined' 
                                                        fullWidth />
                                            </Grid>

                                        
                                            <Grid item sm={6} xs={3}>
                                                    <TextField
                                                    name="cmId"
                                                    type="text"
                                                    label={cmId}
                                                    placeholder="cmId"
                                                    className={styles.textField}
                                                    onChange={this.handleChange} 
                                                    variant='outlined' 
                                                    fullWidth />
                                            </Grid>

                                        

                                            <Grid item sm={12}>
                                                <TextField
                                                name="address"
                                                type="text"
                                                label={address}
                                                placeholder="address"
                                                className={styles.textField}
                                                onChange={this.handleChange}   
                                                variant='outlined'  
                                                rows="2"   
                                                fullWidth />

                                            </Grid>
                                        
                                            <Grid item>
                                                    <Button
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                    className={styles.submitButton}
                                                
                                                >
                                                    Submit
                                                
                                                </Button>
                                            </Grid>
                                        
                                        </Grid>

                                    </form>
                                </DialogContent>


                        </Dialog>
            </Fragment>
        )

    }
}

EditDispensary.propTypes = {
    // updateDispensary: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data
})
export default connect(mapStateToProps, {})(EditDispensary);