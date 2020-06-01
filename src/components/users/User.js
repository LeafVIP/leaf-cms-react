import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {setUser} from '../../redux/actions/userActions';
import CheckCircleIcon from '@material-ui/icons/CheckCircleOutline';
import Typography from '@material-ui/core/Typography';
import ErrorIcon from '@material-ui/icons/Error';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import Timestamp from 'firestore';
import dayjs from 'dayjs';


// Redux
import { connect } from 'react-redux';

const styles = {
    root: {
        flexGrow: 1,
      },
      paper: {
        padding: 2,
        margin: 'auto',
        maxWidth: 500,
      },
      paper_active: {
        padding: 2,
        margin: 'auto',
        maxWidth: 500,
        backgroundColor: '#17a800'
    },

    paper_notactive: {
        padding: 2,
        margin: 'auto',
        maxWidth: 500,
        backgroundColor: '#FFFFFF'
    },

      image: {
        width: 128,
        height: 128,
      },
      text: {
          position: 'relative',
          margin: 10
      },
      text_active: {
        position: 'relative',
        margin: 10,
        color: '#FFF'
      },
      img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
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
                authUid,
                firstName,
                lastName,
                email,
                badgeState,
                phoneNumber,
                createdAt
            }
        } = this.props;

        const selectUser = () => {
            this.props.setUser(this.props.user);
        }
        const timestamp = (date) => {
        
            return Timestamp(date)      
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

    <div className={styles.root}>
        
      <Paper className={this.props.isActive ? classes.paper_active : classes.paper_notactive}>
            <Grid item xs container direction="column" spacing={2}>
            <Button onClick={selectUser}>
              <Grid item xs>

                <Typography gutterBottom variant="subtitle1" className={this.props.isActive? classes.text_active : classes.text}>
                    <div>{firstName} {lastName}</div>
                </Typography>
                <Typography variant="body2"className={this.props.isActive? classes.text_active : classes.text}>
                    <div><b>badge state</b> {badgeState}</div>
                </Typography>
                <Typography variant="body2" className={this.props.isActive? classes.text_active : classes.text}>
                    <div><b>firebase id</b> {authUid}</div>
                </Typography>
                <Typography variant="body2" className={this.props.isActive? classes.text_active : classes.text}>
                <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                </Typography>

                <Typography variant="body2" className={this.props.isActive? classes.text_active : classes.text}>
                    <div><b>email</b> {email}</div>
                </Typography>

             
              </Grid>
              </Button>
            </Grid>
      </Paper>
     
    </div>

            /*
          
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
         */
        
        )
    }
}

User.propTypes = {
    setUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    isActive: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
    // user: state.user
})

const mapActionsToProps = {
    setUser
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(User));
