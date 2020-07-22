import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OffersTable from '../offers/OffersTable';
import EditOffer from '../offers/EditOffer';
import Search from '../../util/Search';
import CreateOffer from '../offers/CreateOffer';
import { getOffers, createOffer, deleteOffer, updateOffer, uploadOfferImage, deleteDispensaries } from '../../redux/actions/dataActions';

class OfferPage extends Component {

    constructor(props) {
        super(props);
        this.state = {edit: false, create: false, offer: undefined};
    }

    componentDidMount() {
        this.props.getOffers();
    }
    render () {
        const { offers, offer, loading } = this.props.data;

        const showOfferDetails = (offer) => {
            this.setState({edit: true, create: false, offer: offer});
        }
        const createOffer = () => {
            this.setState({edit: false, create: true, offer: undefined});
        }

        const closeModal = () => {
            this.setState({edit: false, create: false, offer: undefined});
        }

        const updateOffer = (offerId, newOffer) => {
            this.props.updateOffer(offerId, newOffer);
            closeModal();
        }

        const createNewOffer = (newOffer) => {
            this.props.createOffer(newOffer);
        }

        const updateThumbnail = (id, data) => {
            this.props.uploadOfferImage(id, data);
            closeModal();
        }
        const deleteOffer = (id) => {
            this.props.deleteOffer(id);
        }

        const handleClearDispensaries = (id) => {
            this.props.deleteDispensaries(id);
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
                                onSelectItem={showOfferDetails}
                                onCreateItem={createOffer} />
                             
                             ) : (
                               <div>Loading...</div>
                             )
                           }
                   </Grid>
               </Grid>
               {
                    !loading ? (
                       
                            <div>
                                <EditOffer
                                    offer={this.state.offer ?? offer}
                                    open={this.state.edit}
                                    onClose={closeModal}
                                    onSave={updateOffer}
                                    onDelete={deleteOffer}
                                    onUploadThumbnail={updateThumbnail}
                                    onClearDispensaries={handleClearDispensaries} />

                                <CreateOffer
                                    open={this.state.create}
                                    onClose={closeModal}
                                    onSave={createNewOffer} />
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
    updateOffer: PropTypes.func.isRequired,
    uploadOfferImage: PropTypes.func.isRequired,
    deleteDispensaries: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data
});

const mapActionsToProps = {
    getOffers,
    createOffer,
    deleteOffer,
    updateOffer,
    uploadOfferImage,
    deleteDispensaries
}

export default connect(mapStateToProps, mapActionsToProps)(OfferPage);