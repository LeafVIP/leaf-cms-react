import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions';


// Mui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

class NavBar extends Component {
    render() {

        const users = () => {
            window.location = "/";
        };

        const dispensaries = () => {
            window.location = "/dispensaries";
        };

        const offers = () => {
            window.location = "/offers";
        }
       
        return (
            <>
                <AppBar>
                    <Toolbar className="nav-container">
                        <Button color="inherit" onClick={users}>
                            users
                        </Button>
                        <Button color="inherit" onClick={dispensaries}>dispensaries</Button>
                        <Button color="inherit" onClick={offers}>offers</Button>
                    </Toolbar>
                </AppBar >
            </>
        )
    }
}

NavBar.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    logoutUser: PropTypes.func
};

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
});

export default connect(mapStateToProps, { logoutUser })(NavBar);