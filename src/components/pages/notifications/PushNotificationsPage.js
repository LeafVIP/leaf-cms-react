import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import OfferNotification from './OfferNotification';

class PushNotificationsPage extends Component {
    render() {
        return (
            <Grid container spacing={16}>
                <Grid item sm={4} xs={12}>
                       <OfferNotification />
                </Grid>
            </Grid>
        )
    }
}

PushNotificationsPage.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default PushNotificationsPage;
