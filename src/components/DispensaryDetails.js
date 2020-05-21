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
  image: {
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

class DispensaryDetails extends Component {

  render() {
    const {
      classes,
      dispensary
    } = this.props

    const approve = () => {
    
    }

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
                displayName   
            </Typography> 
            </Grid>
            <Grid item >
              {dispensary.displayName} 
            </Grid>
          </Grid>


          <Grid item xs={10}>
            <Grid item>
            <Typography
              variant="caption"
              color="secondary">
                license
            </Typography> 
            </Grid>
            <Grid item>
              {dispensary.license}
            </Grid>
          </Grid>


          <Grid item xs={10}>
            <Grid>
            <Typography
              variant="caption"
              color="secondary">
                cmid
            </Typography> 
            </Grid>
            <Grid item>
              {dispensary.cmid}
            </Grid>
          </Grid>

          <Grid item xs={10}>
            <Grid item>
            <Typography
              variant="caption"
              color="secondary">
                address
            </Typography> 
            </Grid>
            <Grid item>
              {dispensary.address}
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
  

DispensaryDetails.propTypes = {
  dispensary: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
 
}

const mapStateToProps = (state) => ({
  dispensary: state.data.dispensary
});


const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DispensaryDetails));