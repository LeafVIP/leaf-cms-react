import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


// Redux
import { connect } from 'react-redux';
import { loginUser } from '../../redux/actions/userActions';

// Mui
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/styles/withStyles';

const styles = (theme) => ({
    ...theme.root,
});

export class LoginPage extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            loading: false,

        };
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData, this.props.history);
    }

    render() {

        const {
            classes,
        } = this.props;

        const { loading } = this.state;

        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <img src="ic_logo.png" width="192px" alt="icon" className={classes.image} />

                    <TextField
                        id='email'
                        name='email'
                        label='email'
                        // helperText={errors.email}
                        // error={errors.email ? true : false}
                        value={this.state.email}
                        className={classes.textField}
                        onChange={this.handleChange}
                        fullWidth />

                    <TextField
                        id='password'
                        name='password'
                        label='password'
                        // helperText={errors.password}
                        // error={errors.password ? true : false}
                        value={this.state.password}
                        className={classes.textField}
                        onChange={this.handleChange}
                        fullWidth />


                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        className={classes.button}
                        onClick={this.handleSubmit}>
                        Login
                       {loading && (
                            <CircularProgress size={30} className={classes.progress} />
                        )}
                    </Button>
                    <br />
                    <small>don't have an account? sign up <Link to="/signup">here</Link></small>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

LoginPage.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    // errors: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
    errors: state.errors,
    email: state.email,
    password: state.password
});

const mapActionsToProps = {
    loginUser
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(LoginPage));