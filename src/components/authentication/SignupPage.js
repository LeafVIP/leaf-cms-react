import React, { Component } from 'react';
import withStyles from '@material-ui/styles/withStyles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Mui
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

const styles = (theme) =>({
    ...theme.root,
});

export class SignupPage extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            loading: false,
            errors: {}
        };
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault()

        const userData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        };

        this.props.signupUser(userData, this.props.history);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            });
        }
    };

    render() {
        const { 
            classes,
        } = this.props;

        const {errors, loading} = this.state;

        return (
            <Grid 
            container 
            className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                <img src="icon.png" alt="icon" className={classes.image} />
                   <TextField
                        id='email'
                        name='email'
                        label='Email'
                        helperText={errors.email}
                        error = {errors.email ? true : false}
                        value={this.state.email}
                        className={classes.textField}
                        onChange={this.handleChange}
                        fullWidth />
                    <TextField
                        id='password'
                        name='password'
                        label='Password'
                        helperText={errors.password}
                        error = {errors.password ? true : false}
                        value={this.state.password}
                        className={classes.textField}
                        onChange={this.handleChange}
                        fullWidth />

<TextField
                        id='confirmPassword'
                        name='confirmPassword'
                        label='confirmPassword'
                        helperText={errors.confirmPassword}
                        error = {errors.confirmPassword ? true : false}
                        value={this.state.confirmPassword}
                        className={classes.textField}
                        onChange={this.handleChange}
                        fullWidth />

                    <TextField
                        id='handle'
                        name='handle'
                        label='Handle'
                        helperText={errors.handle}
                        error = {errors.handle ? true : false}
                        value={this.state.handle}
                        className={classes.textField}
                        onChange={this.handleChange}
                        fullWidth />

                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}

                        <Button 
                            type="submit"
                            variant="contained"
                            color='primary'
                            className={classes.button}
                            disabled={loading}
                            onClick={this.handleSubmit}>
                                signup 
                                {loading && (
                                    <CircularProgress size={30} className={classes.progress} />
                                )}
                            </Button>
                            <br />
                    <small>already have account? log in <Link to='/login'>here</Link></small>

                </Grid>
                <Grid item sm />
       </Grid>
        )
    }
}

SignupPage.propTypes = {
    classes: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI,
    email: state.email,
    password: state.password,
    confirmPassword: state.confirmPassword,
    handle: state.handle
});

const mapActionsToProps = {
    signupUser
};



export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(SignupPage));