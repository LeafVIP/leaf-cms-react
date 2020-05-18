import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Offer from '../Offer';
import OfferSkeleton from '../../util/OfferSkeleton';
import { connect } from 'react-redux';
import { getOffers } from '../../redux/actions/dataActions';


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
        const { offers, loading } = this.props.data;

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
                <Grid item sm={8} xs={8}>
                    {offersMarkup}
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