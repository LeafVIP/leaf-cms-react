import React, { Component} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { getDispensaryUsers }  from '../../redux/actions/dispensaryActions';


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
 
  componentDidMount() {
    getDispensaryUsers(this.props.dispensary.users);
  }
  render() {
    const {
      dispensary,
    } = this.props

   return (
     this.props.dispensary !== null ? (
       <div className={styles.root}>
         <Paper>
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
        </Paper>
        </div>

      ) : (
        <div />
     )
   )
  }
};
  

DispensaryDetails.propTypes = {
  getDispensaryUsers: PropTypes.func.isRequired,
  dispensary: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired
 
}

const mapStateToProps = (state) => ({
  dispensary: state.data.dispensary,
  dispensaryUsers: state.data.dispensaryUsers,
  users: state.data.users
});


const mapDispatchToProps = {
  getDispensaryUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DispensaryDetails));