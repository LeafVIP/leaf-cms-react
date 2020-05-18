import React, { Component } from 'react';
import { connect } from 'react-redux';// Mui
import Toolbar from '@material-ui/core/Toolbar';

import Add from '@material-ui/icons/Add';
import MyButton from '../util/MyButton';

const styles = {
    container: {
        margin: 'auto'
    }
  
}
class DispensaryNav extends Component {

    newDispensary = () => {
        
    }

    render() {
 

       
        return (
             <Toolbar className={styles.container}>
                <MyButton
                    tip="new dispensary"
                    onClick={this.newDispensary}>
                        <Add />
                    </MyButton>
                </Toolbar>
        )
    }
}

DispensaryNav.propTypes = {
    // authenticated: PropTypes.bool.isRequired,
    // logoutUser: PropTypes.func
};

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, {  })(DispensaryNav);