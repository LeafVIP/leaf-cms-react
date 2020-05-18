import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';


const styles = {
    paper: {
        position: 'relative',
        display: 'flex',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
       
    }
}
class UserSubNav extends Component {
    render() {

        const {
            users
        } = this.props;

        const totalUsers = (ary) => {
            return ary.length;
        }

        const approvedUsers = () => {
            if(users !== null) {
                const numApproved =  users.filter(function(user) {
                    return user.badgeState === "approved"
                  })
                  return numApproved.length;
                }
            }

            const inReviewUsers = (ary) => {
                if (ary !== null) {
                  const numApproved =  ary.filter(function(user) {
                    return user.badgeState === "approved"
                  })
                  return numApproved.length;
                } 
              };
          
              const usersByPlatform = (ary, platform) => {
                if (ary !== null) {
                  const numberOfUsers =  ary.filter(function(user) {
                    return user.platform === platform
                  })
                  return numberOfUsers.length;
                } 
              }

        return (
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit">
                    total: {totalUsers(users)}
                </Link>
                <Link color="inherit">
                    approved: {approvedUsers(users)}
                </Link>
                <Link color="inherit">
                    inReview: {inReviewUsers(users)}
                </Link>
                <Link color="inherit">
                    ios: {usersByPlatform(users, "ios")}
                </Link>
                <Link color="inherit">
                    android: {usersByPlatform(users, "android")}
                </Link>
            </Breadcrumbs>
        )
    }
}

UserSubNav.propTypes = {
    users: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    users: state.data.users
});

export default connect(mapStateToProps)(UserSubNav);