import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOffers, createOffer, deleteOffer } from '../../redux/actions/offerActions';
import OffersTable from '../offers/OffersTable';
import EditOffer from '../offers/EditOffer';
import Search from '../../util/Search';

class OfferPage extends Component {

    constructor(props) {
        super(props);
        this.state = {open: false, create: false, offer: undefined};
    }

    componentDidMount() {
        this.props.getOffers();
    }
    render () {
        const { offers, offer, loading } = this.props.data;

        const showOfferDetails = (offer) => {
            console.log('showOfferDetails: ' +offer.productName);
            this.offer = offer;
            this.setState({open: true, offer: offer});
        }

        const closeModal = () => {
            this.setState({open: false, create: false, offer: undefined});
        }

        const deleteOffer = (offerId) => {
            this.props.deleteOffer(offerId);
        }

        return(
            <Fragment>
            <Search items={offers}/>
            <br />
           <Grid container spacing={3}>
               <Grid item sm={12} xs={3}> 
                   <Grid container spacing={3}>           
                           {
                             !loading && offers !== null ? (
                               <OffersTable 
                                offers={offers} 
                                onSelectItem={showOfferDetails} />
                             
                             ) : (
                               <div>Loading...</div>
                             )
                           }
                   </Grid>
               </Grid>
               {
                    !loading && this.state.offer !== undefined ? (
                       
                       <div>
                                <EditOffer
                                    offer={this.state.offer ?? offer}
                                    open={this.state.open}
                                    onClose={closeModal}
                                    onDelete={deleteOffer} />
                            </div>
                        
                    
                    ) : (
                        <div></div>
                    )
                }
                
           </Grid>
           </Fragment>
        )
    }
}

OfferPage.propTypes = {
    getOffers: PropTypes.func.isRequired,
    createOffer: PropTypes.func.isRequired,
    deleteOffer: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data
});

const mapActionsToProps = {
    getOffers,
    createOffer,
    deleteOffer
}

export default connect(mapStateToProps, mapActionsToProps)(OfferPage);