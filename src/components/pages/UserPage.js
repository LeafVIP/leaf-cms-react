import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import User from '../User';
import UserDetails from '../UserDetails';
import { connect } from 'react-redux';
import { getUsers, setUser } from '../../redux/actions/dataActions';

const styles = {
    container: {
        width: '100%',
        flex: 1,
        padding: 25
    },
   
};

class UserPage extends Component {
  state = { user: '' }


    componentDidMount() {
        this.props.getUsers();
    }
   
    render() {
        const  { users, user, loading } = this.props.data;

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
              className={styles.card}
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

            <Grid item sm={6} xs={8}>  
              {recentUsersMarkup}
            </Grid>
            <Grid item sm={6} xs={4}>
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
  