import React, { Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDispensaries, selectDispensary, getTop50 } from '../../redux/actions/dispensaryActions';
import Dispensary from '../Dispensary';
import Grid from '@material-ui/core/Grid';
import CreateDispensary from '../CreateDispensary';
import DispensaryDetails from '../DispensaryDetails';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import DispensarySkeleton from '../../util/DispensarySkeleteon';


const styles = {
    container: {
        width: '100%',
        flex: 1,
        flexDirection:'row',
        padding: 25
    }
}
class DispensaryPage extends Component {
    componentDidMount() {
        this.props.getTop50();
    }
    render() {
        const { dispensaries, dispensaryUsers, dispensary, loading } = this.props.data;

        const setDispensary = (dispensary) => () => {
          this.props.selectDispensary(dispensary); 
       };

       let dispensariesMarkup = !loading && dispensaries !== null ? 
       dispensaries.map((dispo) =>
       <div onClick={setDispensary(dispo)} key={dispo.id}>
           <Dispensary 
             className={styles.card}
             key={dispo.displayName}
             item={dispo}
             isActive={dispo === dispensary} />
           <br />
       </div>
       )  
          : (
          <DispensarySkeleton />
         );


         let userTableMarkup = !loading && dispensaryUsers !== null ? 
         (
              <Grid item>
                <div>users</div>
                     {/* <DispensaryUserTable users={dispensaryUsers} /> */}
               </Grid>
         ): (
          <Grid item>
            <div>loading users...</div>
          </Grid>
         )

         const filterTop50 = () => {
          this.props.getTop50();
      }

      const filterAll = () => {
        this.props.getDispensaries();
    }

          return (
            <Fragment>
                  <Grid container spacing={2}>
                  <Grid item>
                         <CreateDispensary />
                    </Grid>
                    <Grid item>
                      <Breadcrumbs aria-label="breadcrumb">
				                <Link color="inherit" onClick={filterTop50} >Top 50</Link>
				                <Link color="inherit" onClick={filterAll} >All</Link>
		                </Breadcrumbs>

                    </Grid>
                   
                
                  </Grid>
                  
                  
            
                  <Grid container spacing={10}>
                        <Grid item sm={6} xs={8}>
                              {dispensariesMarkup}
                        </Grid>
                        <Grid item sm={4} xs={6}>
                          <Grid container spacing={4}>
                              <Grid item>
                                  <DispensaryDetails dispensary={dispensary} />
                              </Grid>
                            {userTableMarkup}
                              
                              
                          </Grid>
                            
                        </Grid>
                        
                    </Grid>
              </Fragment>
          );
    }
}

DispensaryPage.propTypes = {
    getDispensaries: PropTypes.func.isRequired,
    selectDispensary: PropTypes.func.isRequired,
    getTop50: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    data: state.data
});

const mapDispatchToProps = {
   getDispensaries ,
   selectDispensary,
   getTop50
};

export default connect(mapStateToProps, mapDispatchToProps)(DispensaryPage);

