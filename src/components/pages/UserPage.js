import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Search from '../Search';

import PropTypes from 'prop-types';
import User from '../User';

import UserDetails from '../UserDetails';
import { connect } from 'react-redux';
import { getUsers, setUser } from '../../redux/actions/dataActions';


const styles = {
  search: {
    flex: 1,
    width: '100%'
  }

};

class UserPage extends Component {
  state = { user: '' }


    componentDidMount() {
        this.props.getUsers();
    }
   
    render() {
        const  { users, loading } = this.props.data;

        let userDetailsMarkup = !loading && users !== null ?
        (
          <UserDetails users={users} />
        )
        :
        (
          <div>
            Loading...
           </div>
        )

        let recentUsersMarkup = !loading && users !== null ? 
        users.map((user) =>
            <User 
              key={user.authId}
              item={user} />
        )  
           : (
           <div>
             Loading...
           </div>
          );

          return (
           
            <Grid container spacing={10}>
            <Grid item sm={8} xs={8}> 
            <Search className={styles.search} />
              {recentUsersMarkup}
            </Grid>
            <Grid item sm={4} xs={4}>
              {userDetailsMarkup}
            </Grid>
            </Grid>
      
          );
    }
}

UserPage.propTypes = {
    getUsers: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => ({
    data: state.data,
  });

  export default connect(
    mapStateToProps,
    { getUsers, setUser }
  )(UserPage);
  