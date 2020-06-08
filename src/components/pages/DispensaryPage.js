import React, { Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDispensaryUsers, getDispensaries, selectDispensary, getTop50, updateDispensary } from '../../redux/actions/dispensaryActions';
import Grid from '@material-ui/core/Grid';
import DispensaryDetails from '../dispensaries/DispensaryDetails';
import Search from '../../util/Search';
import DispensariesTable from '../dispensaries/DispensariesTable';
class DispensaryPage extends Component {

  constructor(props) {
      super(props);
     this.state = {open: false, dispensary: undefined}
  }

    componentDidMount() {
        this.props.getDispensaries();
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

        const hideDispensaryDetails = () => {
          this.setState({open: false, dispensary: undefined});
        }
        
        const saveDispensary = (newDispensary) => {
          this.props.updateDispensary(dispensary.id, newDispensary);
          this.setState({open: false, dispensary: undefined});
        }

        const createDispensary = () => {
          console.log('createDispensary');
          this.dispensary = undefined;
          this.setState({open: true, dispensary: undefined});
        }

          return (
              <Fragment>  
                <Grid container spacing={3}>
                <Grid item sm={12} xs={3}> 
                {
                  !loading && dispensaries !== null ? (
                   
                    <Search items={dispensaries}/>
               
                  ) : (<></>)
                }
               
                  </Grid>
                <Grid item sm={12} xs={3}> 
                    <Grid container spacing={3}>           
                            {
                              !loading && dispensaries !== null ? (
                                <DispensariesTable 
                                  dispensaries={dispensaries}
                                  onClose={hideDispensaryDetails}
                                  onSelectItem={showDispensaryDetails}
                                  onCreateItem={createDispensary}/> 
                              ) : (
                                <div>Loading...</div>
                              )
                            }
                    </Grid>
                </Grid>
                { 
                  !loading && dispensary !== null ? (
                      <DispensaryDetails 
                          dispensary={this.state.dispensary ?? dispensary} 
                          open={this.state.open} 
                          onClose={hideDispensaryDetails}
                          onSave={saveDispensary} />
                    ) : (
                      <div></div>
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
   updateDispensary
};

export default connect(mapStateToProps, mapDispatchToProps)(DispensaryPage);

