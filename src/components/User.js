import React, { Component } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';


// MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

// Redux
import { connect } from 'react-redux';



  
class User extends Component {

    badgeColor = (state) => {
        return state === "approved" ? "green" : "yellow";
    }

    render() {
        dayjs.extend(relativeTime);
        const {
            item: {
                firstName,
                lastName,
                email,
                badgeState
            }
        } = this.props;

        return (
           <Card>
               <CardContent>
                    <Typography
                        variant="subtitle1"
                        color="textPrimary">
                            {`${firstName} ${lastName}`}
                        </Typography>
                        <br />
                        <Typography
                           variant="subtitle1"
                           color="textSecondary">
                               {badgeState}
                        </Typography>
                        <br />
                        <Typography
                           variant="subtitle1"
                           color="textSecondary">
                               {email}
                        </Typography>
                
                </CardContent>
            </Card>
                  
           
       

        )
        
    }
}
User.propTypes = {
    // user: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
    // user: state.user
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
