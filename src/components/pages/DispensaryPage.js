import React, { Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDispensaries, selectDispensary } from '../../redux/actions/dataActions';
import Dispensary from '../Dispensary';
import Grid from '@material-ui/core/Grid';
import CreateDispensary from '../CreateDispensary';
import DispensaryDetails from '../DispensaryDetails';
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
        this.props.getDispensaries();
    }
    render() {
        const { dispensaries, dispensary, loading } = this.props.data;

        const setDispensary = (dispensary) => () => {
          this.props.selectDispensary(dispensary); 
       };

       let dispensariesMarkup = !loading & dispensaries !== null ? 
       dispensaries.map((dispo) =>
       <div onClick={setDispensary(dispo)}>
           <Dispensary 
             className={styles.card}
             key={dispo.displayName}
             item={dispo}
             isActive={dispo == dispensary} />
           <br />
       </div>
       )  
          : (
          <DispensarySkeleton />
         );

          return (
            <Fragment>
              <CreateDispensary />
            
            <Grid container spacing={10}>

            <Grid item sm={6} xs={8}>
              {dispensariesMarkup}
            </Grid>
            <Grid item sm={6} xs={4}>
              <DispensaryDetails dispensary={dispensary} />
            </Grid>
          </Grid>
          </Fragment>
          );
    }
}

DispensaryPage.propTypes = {
    getDispensaries: PropTypes.func.isRequired,
    selectDispensary: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    offers: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data
});

const mapDispatchToProps = {
   getDispensaries ,
   selectDispensary
};

export default connect(mapStateToProps, mapDispatchToProps)(DispensaryPage);

