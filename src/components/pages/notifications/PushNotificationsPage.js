import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import OfferNotification from './OfferNotification';
import OfferUsersTable from './OfferUsersTable';
import Typography from '@material-ui/core/Typography';
import { getOfferUsers } from '../../../redux/actions/dataActions';
import { connect } from 'react-redux';

class PushNotificationsPage extends Component {

    handleOfferSelect = (offerId) => {
        this.props.getOfferUsers(offerId);
    }
    render() {
        const {
            data:{
                users
            }
        } = this.props;
        return (
   
            <Grid container spacing={3}>
                <Grid item sm={3} xs={3}>
                       <OfferNotification onSelectOffer={this.handleOfferSelect} />
                </Grid>

                {
                
                    users.length > 0  ? (
                        <div>
                           
                            <Grid item sm={9} xs={9}>
                            <Typography variant="h6">
                                {users.length} Users will be notified
                            </Typography>
                                <OfferUsersTable items={users} />
                            </Grid>
                        </div>
                    ) : (
                        <div></div>
                    )

                }
               
            </Grid>
        )
    }
}

PushNotificationsPage.propTypes = {
    classes: PropTypes.object.isRequired,
    getOfferUsers: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data,
    UI: state.UI
});

const mapActionsToProps = {
    getOfferUsers
}
export default connect(mapStateToProps, mapActionsToProps)(PushNotificationsPage);
