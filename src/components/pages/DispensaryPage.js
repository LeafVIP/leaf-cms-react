import React, { Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {setDispensaries, getDispensaryUsers, getAllDispensaries, getDispensaries, selectDispensary, getTop50, updateDispensary, createDispensary, createList, getDispensaryLists } from '../../redux/actions/dispensaryActions';
import { getOffers, updateOffer } from '../../redux/actions/dataActions';
import Grid from '@material-ui/core/Grid';
import EditDispensary from '../dispensaries/EditDispensary';
import CreateDispensary from '../dispensaries/CreateDispensary';
import DispensariesTable from '../dispensaries/DispensariesTable';

class DispensaryPage extends Component {

  constructor(props) {
      super(props);
     this.state = {
       open: false, 
       create: false, 
       dispensary: undefined, 
       selectedDispensaries: []}
  }

  componentDidUpdate(prevProps) {
   if(prevProps.data.dispensaries !== this.props.data.dispensaries && this.props.data.dispensaries.length > 0) {
       this.props.getOffers();
   }
  }

    componentDidMount() {
      if(this.props.data.dispensaries.length === 0) {
        this.props.getAllDispensaries();
      }

      if (this.props.data.dispensary_lists.length === 0) {
        this.props.getDispensaryLists();
      }
    }

    createSortHandler = () => () => {
      // onRequestSort(event, property);
    };
   
    render() {

        const { dispensaries, dispensary, dispensary_lists, offers, loading } = this.props.data;
       
        const showDispensaryDetails = (dispo) => {
            this.setState({open: true, add: false, create: false, dispensary: dispo});
          };

        const closeModal = () => {
          this.setState({open: false, add:false, create: false});
        }
        
        const saveDispensary = (newDispensary) => {
          this.props.updateDispensary(newDispensary);
          this.setState({open: false});
        }

        const onFilterDispensaries = (dispensaries) => {
          this.props.getDispensaries(dispensaries);
        }
        const addNewDispensaryClicked = () => {
          this.setState({create: true, open: false});
        }

        const saveNewDispensary = (newDispensary) => {
          this.props.createDispensary(newDispensary);
          this.setState({create: false, dispensary});
        }


        const onDispensaryChecked = (dispensaries) => {
          let currentDispensaries = this.state.selectedDispensaries;
          currentDispensaries.push()
          this.setState({selectedDispensaries: dispensaries})
          console.log('dispensaries = ' +this.state.selectedDispensaries.length);
        }

        const onAddToOffer = (offer) => {
          console.log('add to offer');
          const ids = this.state.selectedDispensaries.map(dispo => {
            return dispo.id;
          })

          this.props.updateOffer(offer.id, {
            dispensaries: ids,
            dispensaryObjects: this.state.selectedDispensaries
          });
        }

        const onCreateList = (name) => {
          const ids = this.state.selectedDispensaries.map(dispo => {
            return dispo.id;
          })
          this.props.createList(name, ids);
        }

        const handleSelectItems = (dispensaries) => {
          this.setState({selectedDispensaries: dispensaries});
        }

          return (
              <Fragment>  
                <Grid container spacing={3}>
              
                <Grid item sm={12} xs={3}> 
                    <Grid container spacing={3}>           
                            {
                              !loading && dispensaries !== null  && dispensary_lists !== null ? (
                                <DispensariesTable 
                                  dispensaries={dispensaries}
                                  dispensary_lists = {dispensary_lists}
                                  offers={offers}
                                  onClose={closeModal}
                                  onSelectItem={showDispensaryDetails}
                                  onCreateItem={addNewDispensaryClicked} 
                                  onCreateNewList={onCreateList}
                                  onSelectItems={handleSelectItems}
                                  onCheckItem={onDispensaryChecked}
                                  onAddClicked={onAddToOffer}
                                  onFilterDispensaries={onFilterDispensaries}/> 
                              ) : (
                                <div>Loading...</div>
                              )
                            }
                    </Grid>
                </Grid>
                { 
                  !loading && dispensary !== undefined ? (
                    <div>
                      <EditDispensary 
                          dispensary={this.state.dispensary ?? dispensary} 
                          open={this.state.open} 
                          onClose={closeModal}
                          onSave={saveDispensary} />

                 
                          <CreateDispensary
                            open={this.state.create}
                            onClose={closeModal}
                            onSave={saveNewDispensary} />

</div>
                          
                    ) : (
                      <></>
                    )}
                    

            </Grid>

              </Fragment>
          );
    }
}

DispensaryPage.propTypes = {
    getOffers: PropTypes.func.isRequired,
    setDispensaries: PropTypes.func.isRequired,
    getDispensaries: PropTypes.func.isRequired,
    getAllDispensaries: PropTypes.func.isRequired,
    selectDispensary: PropTypes.func.isRequired,
    getDispensaryUsers: PropTypes.func.isRequired,
    updateDispensary: PropTypes.func.isRequired,
    createDispensary: PropTypes.func.isRequired,
    getDispensaryLists: PropTypes.func.isRequired,
    createList: PropTypes.func.isRequired,
    getTop50: PropTypes.func.isRequired,
    updateOffer: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    offer: PropTypes.object,
    dispensaries: PropTypes.array
};

const mapStateToProps = (state) => ({
    data: state.data,
});

const mapDispatchToProps = {
   getAllDispensaries,
   getDispensaries,
   setDispensaries,
   getDispensaryUsers,
   selectDispensary,
   getTop50,
   updateDispensary,
   createDispensary,
   getOffers,
   updateOffer,
   createList,
   getDispensaryLists
};

export default connect(mapStateToProps, mapDispatchToProps)(DispensaryPage);

