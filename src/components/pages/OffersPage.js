import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import OfferSkeleton from '../../util/OfferSkeleton';
import { connect } from 'react-redux';
import { getOffers } from '../../redux/actions/offerActions';
import CreateOffer from '../offers/CreateOffer';
import Offer from '../offers/Offer';
import OfferDetails from '../offers/OfferDetails';

class OfferPage extends Component {

    componentDidMount() {
        this.props.getOffers();
    }

    render () {
        const { offers, offer, loading } = this.props.data;

        let offerDetailsMarkup = !loading && offer !== null ? (
            <OfferDetails keuy="offerDetails" offer={offer}/>     
        ) : (
            <div>Loading...</div>
        )
        let offersMarkup = !loading & offers !== null ? (
            offers.map((offer) =>
            <div>
            <Offer  
                key={offer.id}
                offer={offer} />
<br />
</div>
        )  
        )
           : (
           <OfferSkeleton />
          );

        return(
            <Fragment>

            <Grid container spacing={2}>
                <Grid item>
                    <CreateOffer />
                </Grid>
            </Grid>


            <Grid container spacing={10}>
                <Grid item sm={6} xs={4}>
                    {offersMarkup}
                </Grid>
                <Grid item sm={6} xs={4}>
                    {offerDetailsMarkup}
              </Grid>
            </Grid>
            </Fragment>
        )
    }
}

OfferPage.propTypes = {
    getOffers: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data
});

const mapActionsToProps = {
    getOffers
}

export default connect(mapStateToProps, mapActionsToProps)(OfferPage);