import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';
import {approveBadge} from '../redux/actions/userActions';
import {setUser} from '../redux/actions/dataActions';


// MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircleOutline';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ErrorIcon from '@material-ui/icons/Error';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';

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
        top: '4px',
        right: '4px'
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

    render() {
        // dayjs.extend(relativeTime);
        const {
            classes,
            user: {
                firstName,
                lastName,
                email,
                badgeState,
                badgeFrontUrl,
                phoneNumber,
            }
        } = this.props;

        const selectUser = () => {
            this.props.setUser(this.props.user);
        }
  
        let badgeMarkup =  badgeState === "approved" ? (
                <CheckCircleIcon 
                    style={{fill: "green"}} 
                    className={classes.badgeState} />
                ) : (
               <ErrorIcon
                    style={{fill: "orange"}}
                    className={classes.badgeState} />
                )

        return (
   
           <Card className={classes.card}>
               {badgeMarkup}
            <CardMedia
                image={badgeFrontUrl} 
                className={classes.image} />      
                <Button onClick={selectUser}>
                    <CardContent className={classes.content}>
                    <Typography
                        variant="subtitle1"
                        color="textPrimary">
                            {`${firstName} ${lastName}`} <br />
                            {email}<br />
                            {phoneNumber}
                        </Typography> 
                </CardContent>   
                </Button>   
            </Card>
            
        )
        
    }
}
User.propTypes = {
    approveBadge: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
    // user: state.user
})

const mapActionsToProps = {
    approveBadge,
    setUser
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(User));
