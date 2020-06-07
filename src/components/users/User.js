import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import {setUser} from '../../redux/actions/userActions';

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
      backgroundColor: '#fcb308'
    },
    card_notactive: {
      position: 'relative',
      display: 'flex',
      marginBottom: 20
    },
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
      minWidth: 200
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
    content: {
      padding: 25,
      objectFit: 'cover'
    }
  };

class User extends Component {

    badgeColor = (state) => {
        return state === "approved" ? "green" : "yellow";
    }

    render() {
        const {
            classes,
            user: {
                firstName,
                lastName,
                createdAt,
                dispensary
            }
        } = this.props;


        const selectUser = () => {
            this.props.setUser(this.props.user);
        }
        const timestamp = (createdAt) => {
            return new Date(createdAt._seconds * 1000).toLocaleDateString("en-US")
        }

        return(

            <Card className={this.props.isActive ? classes.card_active : classes.card_notactive} onClick={selectUser}>
              <CardContent className={classes.content}>

                {/* User Name */}
                  <Typography
                    variant="h5"
                    color="secondary"
                    className={this.props.isActive? classes.text_active : classes.text}
                  >
                     {firstName} {lastName}
                  </Typography>

                  {/* Dispensary */}
                  <Typography 
                      variant="body1" 
                      className={this.props.isActive? classes.text_active : classes.text}>
                        {dispensary}
                    </Typography>

                  {/* Created At */}
                  <Typography
                      variant="body"
                      color="secondary"
                      className={this.props.isActive? classes.text_active : classes.text}>
                        {timestamp(createdAt)}
                  </Typography>
             
              {/* <MyButton tip="comments">
                <Chip
                    label={badgeState}
                    clickable
                    color={badgeState === "approved" ? "primary" : "secondary"}
                />
              </MyButton> */}
            </CardContent>
          </Card>
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
