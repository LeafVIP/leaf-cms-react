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

class OfferDetails extends Component {

  render() {
    const {
     
      offer: {
        productName, 
        productDescription,
        isActive,
        brandName,

      }
    } = this.props

   return (
     this.props.offer !== null ? (
       <div className={styles.root}>


        <Grid item xs={10}>
        <Grid>
            <Typography
              variant="caption"
              color="secondary">
                brand
            </Typography> 
            </Grid>
            <Grid item>
             {brandName}
            </Grid>

            <Grid>
            <Typography
              variant="caption"
              color="secondary">
                status
            </Typography> 
            </Grid>
            <Grid item>
             { isActive ? "active" : "not active"}
            </Grid>

          </Grid>

        


          <Grid item xs={10}>
            <Grid>
            <Typography
              variant="caption"
              color="secondary">
                productName
            </Typography> 
            </Grid>
            <Grid item>
             {productName}
            </Grid>
          </Grid>

          <Grid item xs={10}>
            <Grid item>
            <Typography
              variant="caption"
              color="secondary">
                productDescription
            </Typography> 
            </Grid>
            <Grid item>
              {productDescription}
            </Grid>
          </Grid>
        </div>

      ) : (
        <div />
     )
   )
  }
};
  

OfferDetails.propTypes = {
  offer: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  offer: state.data.offer
});


const mapDispatchToProps = {
 
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OfferDetails));