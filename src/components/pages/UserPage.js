import React, { Component, Fragment } from 'react';
import Search from '../../util/Search';
import PropTypes from 'prop-types';
import SubNav from '../users/UserSubNav';
import { connect } from 'react-redux';
import { getCompletedOffers} from '../../redux/actions/dataActions';
import { getUserData, updateUser } from '../../redux/actions/userActions';
import Grid from '@material-ui/core/Grid';
import UsersTable from '../users/UsersTable'
import EditUser from '../users/EditUser';


class UserPage extends Component {

  constructor(props) {
    super(props);
    this.state = {open: false}
  }

    componentDidMount() {
        this.props.getUserData();
    }
   
    render() {
        const  { users, user, loading } = this.props.data;

        const showUserDetails = (user) => {
          this.user = user;
          this.setState({open: true});
        }

        const hideUserDetails = () => {
          this.setState({open: false});
        }

        const toggleBadgeState = (event) => {
          const newBadgState = user.badgeState === 'approved' ? 'inReview' : 'approved'
          this.props.updateUser(user.authUid, {badgeState: newBadgState})
        }
        let editUserMarkup = !loading && user !== null ? (
          <EditUser 
            user={user} 
            open={this.state.open} 
            onClose={hideUserDetails}
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
    user: PropTypes.object,
    data: PropTypes.object.isRequired,

};


const mapStateToProps = (state) => ({
    data: state.data,
  });

  export default connect(
    mapStateToProps,
    { getUserData, updateUser, getCompletedOffers }
  )(UserPage);
  