import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';


// MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import withStyles from '@material-ui/core/styles/withStyles';

// Redux
import { connect } from 'react-redux';

const styles = {
    card: {
      position: 'relative',
      display: 'flex',
      marginBottom: 20
    },
    image: {
   
      minWidth: 200,
 
    
    },
    content: {
      padding: 25,
      objectFit: 'cover'
    },
    badgeState: {
        position: 'absolute',
        top: '0px',
        right: '0px'
    },
    approveButton: {
        position: 'relative',
        right: '20%'
    }
  };


  
class User extends Component {

    badgeColor = (state) => {
        return state === "approved" ? "green" : "yellow";
    }
    imageClick = () => {
        console.log("show image");
      };

    render() {
        // dayjs.extend(relativeTime);
        const {
            classes,
            item: {
                firstName,
                lastName,
                email,
                badgeState,
                badgeFrontUrl,
                phoneNumber,
                platform
            }
        } = this.props;

        let badgeMarkup =  badgeState === "approved" ? (
                <MyButton
                    tip="unapprove badge"
                    tipClassName={classes.badgeState}>
                <CheckCircleIcon 
                    style={{fill: "green"}}/>
                        </MyButton>
                 
                ) : (

                        <MyButton
                            tip="approve badge"
                            tipClassName={classes.badgeState}>
               <ErrorIcon
                    style={{fill: "orange"}} />
                    </MyButton>

              
                )
        

        return (
           <Card className={classes.card}>
               {badgeMarkup}
            <CardMedia
                image={badgeFrontUrl} 
                className={classes.image}
                onClick={this.imageClick} />       
               <CardContent className={classes.content}>
                    <Typography
                        variant="subtitle1"
                        color="textPrimary">
                            {`${firstName} ${lastName}`} <br />
                            {email}<br />
                            {phoneNumber}
                        </Typography> 
                </CardContent>      
            </Card>
        )
        
    }
}
User.propTypes = {
    // user: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
    // user: state.user
})


export default connect(mapStateToProps)(withStyles(styles)(User));
