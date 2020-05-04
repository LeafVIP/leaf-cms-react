import React, { Component} from 'react';
import PropTypes from 'prop-types';

// MUI stuff
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Paper';

//Redux
import { connect } from 'react-redux';
import { Button, CardContent } from '@material-ui/core';

const styles = {
  CardMedia: {
    position: 'relative',
    display: 'flex',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },
  image: {
    minWidth: 200
  },

};

class UserDetails extends Component {
  filter = (type) => {

  }

  

  render() {
    const {
      users
    } = this.props

    const totalUsers = () => {
      return users.length;
    };

    const approvedUsers = () => {
      if (users !== null) {
        const numApproved =  users.filter(function(user) {
          return user.badgeState === "approved"
        })
        return numApproved.length;
      }
    };

    const inReviewUsers = () => {
      if (users !== null) {
        const numApproved =  users.filter(function(user) {
          return user.badgeState === "approved"
        })
        return numApproved.length;
      } 
    };

    const usersByPlatform = (platform) => {
      if (users !== null) {
        const numberOfUsers =  users.filter(function(user) {
          return user.platform === platform
        })
        return numberOfUsers.length;
      } 
    }


   return (
     this.props.user !== null ? (
      <Card className={styles.card} elevation={0}>
        <CardContent>
        <Typography 
      variant="caption"
        color="textPrimary">
       total: {totalUsers()}
         <br />
         approved: {approvedUsers()}
         <br />
         in review: {inReviewUsers()}
         <br />
         ios: {usersByPlatform("ios")}
         <br />
         android: {usersByPlatform("android")}
        </Typography>
        </CardContent>
    </Card>

      ) : (
        <div />
    
     )

   )
  }
};
  

UserDetails.propTypes = {
  users: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  users: state.data.users
});


const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);