import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Offer from '../Offer';
import OfferDetails from '../OfferDetails';
import OfferSkeleton from '../../util/OfferSkeleton';
import { connect } from 'react-redux';
import { getOffers, selectOffer } from '../../redux/actions/dataActions';


const styles = {
    container: {
        width: '100%',
        flex: 1,
        flexDirection:'row',
        padding: 25
    }
}

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
            <Grid container spacing={10}>
                <Grid item sm={6} xs={4}>
                    {offersMarkup}
                </Grid>
            
                <Grid item sm={6} xs={4}>
                    {offerDetailsMarkup}
              </Grid>
            </Grid>
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