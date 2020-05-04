import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDispensaries, selectDispensary } from '../../redux/actions/dataActions';
import Dispensary from '../Dispensary';
import Grid from '@material-ui/core/Grid';
import DispensaryNav from '../../util/DispensaryNav';
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
       dispensaries.map((dispensary) =>
       <div onClick={setDispensary(dispensary)}>
           <Dispensary 
             className={styles.card}
             key={dispensary.displayName}
             item={dispensary} />
           <br />
       </div>
       )  
          : (
          <DispensarySkeleton />
         );

          return (
            <div>
              <DispensaryNav />
            <Grid container spacing={10}>

            <Grid item sm={6} xs={8}>
              {dispensariesMarkup}
            </Grid>
            <Grid item sm={6} xs={4}>
              {/* {currentUserMarkup} */}
              {/* <UserDetails user={user}/> */}
            </Grid>
          </Grid>
          </div>
          );
    }
}

DispensaryPage.propTypes = {
    getDispensaries: PropTypes.func.isRequired,
    selectDispensary: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data
});

const mapDispatchToProps = {
   getDispensaries ,
   selectDispensary
};

export default connect(mapStateToProps, mapDispatchToProps)(DispensaryPage);

