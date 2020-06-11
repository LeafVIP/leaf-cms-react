import React, { Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDispensaryUsers, getDispensaries, selectDispensary, getTop50, updateDispensary, createDispensary } from '../../redux/actions/dispensaryActions';
import Grid from '@material-ui/core/Grid';
import EditDispensary from '../dispensaries/EditDispensary';
import CreateDispensary from '../dispensaries/CreateDispensary';
import DispensariesTable from '../dispensaries/DispensariesTable';
import DispensariesMetrics from '../dispensaries/DispensariesMetrics';

class DispensaryPage extends Component {

  constructor(props) {
      super(props);
     this.state = {open: false, create: false, dispensary: undefined}
  }

    componentDidMount() {
        this.props.getTop50();
    }

    createSortHandler = () => () => {
      // onRequestSort(event, property);
    };
   
    render() {

        const { dispensaries, dispensary, loading } = this.props.data;

        const showDispensaryDetails = (dispensary) => {
            this.dispensary = dispensary;
            this.setState({open: true, dispensary: dispensary});
          };

        const closeModal = () => {
          this.setState({open: false, create: false});
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
                                  onClose={closeModal}
                                  onSelectItem={showDispensaryDetails}
                                  onCreateItem={addNewDispensaryClicked}/> 
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
    getDispensaries: PropTypes.func.isRequired,
    selectDispensary: PropTypes.func.isRequired,
    getDispensaryUsers: PropTypes.func.isRequired,
    updateDispensary: PropTypes.func.isRequired,
    createDispensary: PropTypes.func.isRequired,
    getTop50: PropTypes.func.isRequired,
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
   createDispensary
};

export default connect(mapStateToProps, mapDispatchToProps)(DispensaryPage);

