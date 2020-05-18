import React, { Component} from 'react';
import PropTypes from 'prop-types';

// MUI stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

//Redux
import { connect } from 'react-redux';


const styles = {
  root: {
    flexGrow: 1
  },
  badgeImage: {
    minWidth: 200,
    maxWidth: 400
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


   return (


     this.props.user !== null ? (
       <div className={styles.root}>
      <Grid 
        container
        spacing={2}
        direction="column"
        justify="center"
        >
          <Grid item xs={10}>
          <Grid item >
            <Typography
              variant="caption"
              color="secondary">
                badge   
            </Typography> 
            </Grid>
            <Grid item >
              <img className={classes.badgeImage} src={user.badgeFrontUrl} />
            </Grid>
          </Grid>

          <Grid item xs={10}>
            <Grid item >
            <Typography
              variant="caption"
              color="secondary">
                name   
            </Typography> 
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
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  user: state.data.user
});


const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserDetails));