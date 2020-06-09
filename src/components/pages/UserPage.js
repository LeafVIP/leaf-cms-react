import React, { Component, Fragment } from 'react';
import Search from '../../util/Search';
import PropTypes from 'prop-types';
import SubNav from '../users/UserSubNav';
import { connect } from 'react-redux';
import { getCompletedOffers} from '../../redux/actions/dataActions';
import { getUserData, updateUser, deleteUser } from '../../redux/actions/userActions';
import Grid from '@material-ui/core/Grid';
import UsersTable from '../users/UsersTable'
import EditUser from '../users/EditUser';


class UserPage extends Component {

  constructor(props) {
    super(props);
    this.state = {open: false, user: undefined}
  }

    componentDidMount() {
        this.props.getUserData();
    }
   
    render() {
        const  { users, user, loading } = this.props.data;

        const showUserDetails = (user) => {
          console.log('showUserDetails: user.authUid: ' +user.authUid); 
          this.user = user;

          this.setState({open: true, user: user});
        }

        const hideUserDetails = () => {
          this.setState({open: false, user: undefined});
        }

        const deleteUserDetails = (userId) => {
          this.props.deleteUser(userId);
        }

        const toggleBadgeState = (event) => {
          const newBadgState = user.badgeState === 'approved' ? 'inReview' : 'approved'
          this.props.updateUser(user.authUid, {badgeState: newBadgState})
        }
        let editUserMarkup = !loading && user !== null ? (
          <EditUser 
            user={this.state.user ?? user} 
            open={this.state.open} 
            onClose={hideUserDetails}
            onDelete={deleteUserDetails}
            onBadgeClick={toggleBadgeState} />
        ) : (
          <div></div>
        )
          return (  
           <Fragment>
             <SubNav />
             <Search items={users}/>
             <br />
            <Grid container spacing={3}>
                <Grid item sm={12} xs={3}> 
                    <Grid container spacing={3}>           
                            {
                              !loading && users !== null ? (
                                <UsersTable users={users} onSelectUser={showUserDetails} />
                              
                              ) : (
                                <div>Loading...</div>
                              )
                            }
                    </Grid>
                </Grid>
                {editUserMarkup}
            </Grid>
            </Fragment>
      
          );
    }
}

UserPage.propTypes = {
    getUserData: PropTypes.func.isRequired,
    getCompletedOffers: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    user: PropTypes.object,
    data: PropTypes.object.isRequired,

};


const mapStateToProps = (state) => ({
    data: state.data,
  });

  export default connect(
    mapStateToProps,
    { getUserData, updateUser, getCompletedOffers, deleteUser }
  )(UserPage);
  