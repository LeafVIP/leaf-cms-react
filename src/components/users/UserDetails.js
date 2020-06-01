import React, { Component} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import MyButton from '../../util/MyButton';
import EditUserDetails from './EditUserDetails';
import { connect } from 'react-redux';
import {updateUser} from '../../redux/actions/userActions';


const styles = {
  root: {
    flexGrow: 1
  },
  badgeImage: {
    minWidth: 200,
    minHeight: 150,
    maxWidth: 300,
    maxHeight: 250
  },

  CardMedia: {
    position: 'relative',
    display: 'flex',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  }

};

class UserDetails extends Component {

  render() {
    const {
      classes,
      user
    } = this.props

    const approveBadge = () => {
      this.props.updateUser(user.authUid, {badgeState: 'approved'});
    }

    const unapproveBadge = () => {
      this.props.updateUser(user.authUid, {badgeState: 'inReview'});
    }

   return (
     this.props.user !== null ? (
       <div className={styles.root}>
      <Grid 
        container
        spacing={3}
        direction="column"
        justify="center"
        >
          <Grid item xs={10}>
          <Grid item >
            <Grid container spacing={6}>
                      <Grid item>
                              <Typography
                              variant="caption"
                              color="body">
                                badge state
                            </Typography> 
                      </Grid>

                      <Grid item>
                              <Typography
                              variant="subheader">
                               {user.badgeState}
                            </Typography> 
                      </Grid>

                      <Grid item>
                              {user.badgeState === "inReview" ? (
                               <Button 
                                 color="#FF00CC"
                                 onClick={approveBadge} >approve</Button>
                                ): (
                                  <Button 
                                  color="#FF00CC"
                                  onClick={unapproveBadge}>unapprove</Button>
                                  )}   
                       </Grid>

            </Grid>
         </Grid>
         <Grid item >
              <img className={classes.badgeImage} src={user.badgeFrontUrl} alt={user.badgeFrontUrl} />
            </Grid>
        </Grid>

          <Grid item xs={10}>
            
            <Grid item >
            <Typography
              variant="caption"
              color="secondary">
                name   
            </Typography> 
            <EditUserDetails user={user}/>
            </Grid>
            <Grid item >
              {user.firstName} {user.lastName}
            </Grid>
          </Grid>


          <Grid item xs={10}>
            <Grid item>
            <Typography
              variant="caption"
              color="secondary">
                contact
            </Typography> 
            </Grid>
            <Grid item>
              {user.email} / {user.phoneNumber}
            </Grid>
          </Grid>


          <Grid item xs={10}>
            <Grid>
            <Typography
              variant="caption"
              color="secondary">
                job type
            </Typography> 
            </Grid>
            <Grid item>
              {user.role}
            </Grid>
          </Grid>

          <Grid item xs={10}>
            <Grid item>
            <Typography
              variant="caption"
              color="secondary">
                dispensary
            </Typography> 
            </Grid>
            <Grid item>
              {user.dispensary}
            </Grid>
          </Grid>
          

          <Grid item xs={10}>
            <Grid item>
            <Typography
              variant="caption"
              color="secondary">
                platform
            </Typography> 
            </Grid>
            <Grid item>
              {user.platform}
            </Grid>
          </Grid>


          <Grid item xs={10}>
            <Grid item>
            <Typography
              variant="caption"
              color="secondary">
                push enabled
            </Typography> 
            </Grid>
            <Grid item>
              {user.fcmToken !== "" ? (<div>yes</div>) : (<div>no</div>)}
            </Grid>
          </Grid>

        </Grid>
        </div>

      ) : (
        <div />
     )
   )
  }
};
  

UserDetails.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  user: state.data.user
});


const mapDispatchToProps = {
  updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserDetails));