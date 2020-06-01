import React, { Component,Fragment } from 'react';
import Search from '../Search';
import PropTypes from 'prop-types';
import SubNav from '../users/UserSubNav';
import User from '../users/User';
import UserDetails from '../users/UserDetails';
import UserSkeleteon from '../../util/UserSkeleton';
import { connect } from 'react-redux';
import { getCompletedOffers} from '../../redux/actions/dataActions';
import { getUserData, setUser } from '../../redux/actions/userActions';
import Grid from '@material-ui/core/Grid';
import  CircularProgress from '@material-ui/core/CircularProgress';

class UserPage extends Component {

    componentDidMount() {
        this.props.getUserData();
    }
   
    render() {
        const  { users, user, loading } = this.props.data;

        let userDetailsMarkup = !loading && user !== null ?
        (
            <UserDetails key="userDetails" user={user} />
        )
        :
        (
          <CircularProgress color="secondary"/>
        )

        let recentUsersMarkup = !loading && users !== null ? 
        users.map((data) =>
        <Grid item xs={12}>
            <User 
              key={data.authId}
              user={data}
              isActive={data === user} />
              </Grid>
        )  
           : (
           <CircularProgress color="secondary" />
          );

    
          return (
           <Fragment>
             <SubNav />
             <Search items={users}/>
             <br />
            <Grid container spacing={3}>
                <Grid item sm={6} xs={3}> 
                    <Grid container spacing={3}>
                            {recentUsersMarkup}
                    </Grid>
                </Grid>
           
        
                      <Grid item sm={6} xs={3}>
                          {userDetailsMarkup}
                      </Grid>
               
            </Grid>
            </Fragment>
      
          );
    }
}

UserPage.propTypes = {
    getUserData: PropTypes.func.isRequired,
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
    { getUserData, setUser, getCompletedOffers }
  )(UserPage);
  