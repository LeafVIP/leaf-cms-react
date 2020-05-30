import React, { Component,Fragment } from 'react';
import Search from '../Search';
import PropTypes from 'prop-types';
import SubNav from '../ui/UserSubNav';
import User from '../User';
import UserDetails from '../UserDetails';
import UserSkeleteon from '../../util/UserSkeleton';
import { connect } from 'react-redux';
import { getUsers, setUser,getCompletedOffers } from '../../redux/actions/dataActions';
import {approveBadge } from '../../redux/actions/userActions';
import Grid from '@material-ui/core/Grid';

class UserPage extends Component {

    componentDidMount() {
        this.props.getUsers();
    }
   
    render() {
        const  { users, user, offers, loading } = this.props.data;

        let userDetailsMarkup = !loading && user !== null ?
        (
            <UserDetails key="userDetails" user={user} />
        )
        :
        (
          <div>
            Loading...
           </div>
        )

        let recentUsersMarkup = !loading && users !== null ? 
        users.map((data) =>
            <User 
              key={data.authId}
              user={data}
              isActive={data === user} />
        )  
           : (
           <UserSkeleteon />
          );

    
          return (
           <Fragment>
             <SubNav />
             <Search items={users}/>
             <br />
            <Grid container spacing={10}>
                <Grid item sm={6} xs={6}> 
                    {recentUsersMarkup}
                </Grid>
           
        
                      <Grid item sm={6} xs={6}>
                          {userDetailsMarkup}
                      </Grid>
               
            </Grid>
            </Fragment>
      
          );
    }
}

UserPage.propTypes = {
    getUsers: PropTypes.func.isRequired,
    approveBadge: PropTypes.func.isRequired,
    getCompletedOffers: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
    user: PropTypes.object,
    data: PropTypes.object.isRequired,

};


const mapStateToProps = (state) => ({
    data: state.data,
  });

  export default connect(
    mapStateToProps,
    { getUsers, setUser, approveBadge, getCompletedOffers }
  )(UserPage);
  