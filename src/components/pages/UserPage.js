import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import SubNav from '../users/UserSubNav';
import { connect } from 'react-redux';
import { getUserData, updateUser, deleteUser, createUser } from '../../redux/actions/userActions';
import Grid from '@material-ui/core/Grid';
import UsersTable from '../users/UsersTable'
import EditUser from '../users/EditUser';
import CreateUser from '../users/CreateUser';


class UserPage extends Component {

  constructor(props) {
    super(props);
    this.state = {open: false, create: false, user: undefined}
  }

    componentDidMount() {
        this.props.getUserData();
    }
   
    render() {
        const  { users, user, loading } = this.props.data;

        const showUserDetails = (user) => {
          console.log('showUserDetails: user.authUid: ' +user.authUid); 
          this.user = user;

          this.setState({open: true, create: false, user: user});
        }

        const showNewUser = () => {
          console.log('showNewUser');
          this.setState({open: false, create: true, user: undefined});
        }
        const saveUser = (data) => {
          this.props.createUser(data);
        }
        const hideModal = () => {
          this.setState({open: false, create: false, user: undefined});
        }

        const deleteUserDetails = (userId) => {
          this.props.deleteUser(userId);
        }

        const toggleBadgeState = (event) => {
          const newBadgState = user.badgeState === 'approved' ? 'inReview' : 'approved'
          this.props.updateUser(user.authUid, {badgeState: newBadgState})
        }

        const uploadBadgeImage = (userId, data) => {
          console.log(`upload badge image ${userId} - ${data}`);
        }

 
          return (  
           <Fragment>
             <SubNav /> <br />
            <Grid container spacing={3}>
                <Grid item sm={12} xs={3}> 
                    <Grid container spacing={3}>           
                            {
                              !loading && users !== null ? (
                                <UsersTable users={user}
                                 onSelectUser={showUserDetails} 
                                 onCreateItem={showNewUser}/>
                              
                              ) : (
                                <div>Loading...</div>
                              )
                            }
                    </Grid>
                </Grid>
                {!loading && users !== null ? (
                  <div>
                    <EditUser 
                        user={this.state.user ?? user} 
                        open={this.state.open} 
                        onClose={hideModal}
                        onDelete={deleteUserDetails}
                        onBadgeClick={toggleBadgeState}
                        onUploadBadge={uploadBadgeImage} />

                    <CreateUser 
                        open={this.state.create} 
                        onClose={hideModal}
                        onSave={saveUser} />
                  </div>
                ) : (<div></div>)}
            </Grid>
            </Fragment>
      
          );
    }
}

UserPage.propTypes = {
    getUserData: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    createUser: PropTypes.func.isRequired,
    user: PropTypes.object,
    data: PropTypes.object.isRequired
};


const mapStateToProps = (state) => ({
    data: state.data,
});

const mapDispatchToProps = {
  getUserData,
  updateUser,
  deleteUser,
  createUser
}

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(UserPage);
  