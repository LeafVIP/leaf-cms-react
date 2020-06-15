import React, { Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDispensaryUsers, getDispensaries, selectDispensary, getTop50, updateDispensary, createDispensary } from '../../redux/actions/dispensaryActions';
import { getOffers, updateOffer } from '../../redux/actions/dataActions';
import Grid from '@material-ui/core/Grid';
import EditDispensary from '../dispensaries/EditDispensary';
import CreateDispensary from '../dispensaries/CreateDispensary';
import DispensariesTable from '../dispensaries/DispensariesTable';
import DispensariesMetrics from '../dispensaries/DispensariesMetrics';

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
        this.props.getTop50();
      }
    }

    createSortHandler = () => () => {
      // onRequestSort(event, property);
    };
   
    render() {

        const { dispensaries, dispensary, loading, offers } = this.props.data;

        const showDispensaryDetails = (dispensary) => {
            this.dispensary = dispensary;
            this.setState({open: true, add: false, create: false, dispensary: dispensary});
          };

        const closeModal = () => {
          this.setState({open: false, add:false, create: false});
        }
        
        const saveDispensary = (newDispensary) => {
          this.props.updateDispensary(dispensary.id, newDispensary);
          this.setState({open: false});
        }

        const addNewDispensaryClicked = () => {
          console.log('addNewDispensaryClicked');
          this.setState({create: true, open: false});
        }

        const saveNewDispensary = (newDispensary) => {
          console.log('save new dispensary: ' +newDispensary.displayName);
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

        const onAllDispensaries = () => {
          this.props.getDispensaries();
        }

        const onTop50 = () => {
          this.props.getTop50();
        }
          return (
              <Fragment>  
                <Grid container spacing={3}>
                <Grid item sm={12} xs={3}> 
                {
                  !loading && dispensaries !== null ? (
           
                    <DispensariesMetrics dispensaries={dispensaries} />
     
                  ) : (<></>)
                }
               
                  </Grid>
                <Grid item sm={12} xs={3}> 
                    <Grid container spacing={3}>           
                            {
                              !loading && dispensaries !== null ? (
                                <DispensariesTable 
                                  dispensaries={dispensaries}
                                  offers={offers}
                                  onClose={closeModal}
                                  onSelectItem={showDispensaryDetails}
                                  onCreateItem={addNewDispensaryClicked} 
                                  onCheckItem={onDispensaryChecked}
                                  onAddClicked={onAddToOffer}
                                  onAll={onAllDispensaries}
                                  onTop50={onTop50}/> 
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
    getDispensaries: PropTypes.func.isRequired,
    selectDispensary: PropTypes.func.isRequired,
    getDispensaryUsers: PropTypes.func.isRequired,
    updateDispensary: PropTypes.func.isRequired,
    createDispensary: PropTypes.func.isRequired,
    getTop50: PropTypes.func.isRequired,
    updateOffer: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    dispensaries: PropTypes.array
};

const mapStateToProps = (state) => ({
    data: state.data,
});

const mapDispatchToProps = {
   getDispensaries,
   getDispensaryUsers,
   selectDispensary,
   getTop50,
   updateDispensary,
   createDispensary,
   getOffers,
   updateOffer
};

export default connect(mapStateToProps, mapDispatchToProps)(DispensaryPage);

