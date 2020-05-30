import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {approveBadge} from '../redux/actions/userActions';
import {setUser} from '../redux/actions/dataActions';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircleOutline';
import Typography from '@material-ui/core/Typography';
import ErrorIcon from '@material-ui/icons/Error';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Timestamp from 'firestore';



// Redux
import { connect } from 'react-redux';

const styles = {
    card: {
      position: 'relative',
      display: 'flex',
      marginBottom: 20
    },
    card_active: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20,
        backgroundColor: '#CCC'
    },

    card_notactive: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20,
        backgroundColor: '#FFFFFF'
    },
    image: {
      minWidth: 200,
    },
    content: {
      padding: 25,
    //   objectFit: 'cover'
    },
    badgeState: {
        position: 'absolute',
        top: '4px',
        right: '4px'
    },
    approveButton: {
        position: 'relative',
        right: '20%'
    },
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
                phoneNumber,
            }
        } = this.props;

        const selectUser = () => {
            this.props.setUser(this.props.user);
        }
        const timestamp = (date) => {
            return Timestamp(date);
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

        return(

          
            <Card className={this.props.isActive ? classes.card_active : classes.card_notactive}>
            {badgeMarkup}
             <Button onClick={selectUser}>
                 <CardContent>
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
    isActive: PropTypes.bool.isRequired,
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
