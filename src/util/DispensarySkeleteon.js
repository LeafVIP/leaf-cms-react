import React, { Fragment } from 'react';
import NoImg from '../images/NoImg.png'
import PropTypes from 'prop-types';
// MUI
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import withStyles from '@material-ui/styles/withStyles';

const styles = (theme) => ({
 
    card: {
      display: 'flex',
      marginBottom: 20
    },
    cardContent: {
      width: '100%',
      flexDirection: 'column',
      padding: 25
    },
    cover: {
      minWidth: 200,
      objectFit: 'cover'
    },
    handle: {
      width: '100%',
      height: 26,
      backgroundColor: theme.palette.primary.main,
      marginBottom: 7
    },
    date: {
      height: 14,
      width: 100,
      backgroundColor: 'rgba(0,0,0, 0.3)',
      marginBottom: 10
    },
    fullLine: {
      height: 15,
      width: '90%',
      backgroundColor: 'rgba(0,0,0, 0.6)',
      marginBottom: 10
    },
    halfLine: {
      height: 15,
      width: '50%',
      backgroundColor: 'rgba(0,0,0, 0.6)',
      marginBottom: 10
    }
  });
  
  const DispensarySkeleton = (props) => {
    const { classes } = props;
  
    const content = Array.from({ length: 5 }).map((item, index) => (
      <Card className={classes.card} key={index}>
        <CardContent className={classes.cardContent}>
          <div className={classes.handle} />
        </CardContent>
      </Card>
    ));
  
    return <Fragment>{content}</Fragment>;
  };
  
  DispensarySkeleton.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  export default withStyles(styles)(DispensarySkeleton);
  