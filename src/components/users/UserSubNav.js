import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {setUsers, getUserData, filterUsers} from '../../redux/actions/userActions';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

class UserSubNav extends Component {
	render() {
        const { users, filterUsers, onFilter } = this.props;

        const clearFilter = () => {
            filterUsers(users);
            onFilter(users);
        }

        const filterApproved = () => {
            const newUsers = users.filter(function(user) {
                return user.badgeState === "approved";
            })
            filterUsers(newUsers);
            onFilter(newUsers);
        }

        const filterInReview = () => {
            const newUsers = users.filter(function(user) {
                return user.badgeState === "inReview";
            })
            filterUsers(newUsers);
            onFilter(newUsers);
        }


        const filterIos = () => {
            const newUsers = users.filter(function(user) {
                return user.platform === "ios";
            })
            filterUsers(newUsers);
            onFilter(newUsers);
        }

        const filterAndroid = () => {
            const newUsers = users.filter(function(user) {
                return user.platform === "android";
            })
            filterUsers(newUsers);
            onFilter(newUsers);
        }

        const filterBrand = () => {
            const newUsers = users.filter(function(user) {
                return user.role === "brand";
            })
            filterUsers(newUsers);
            onFilter(newUsers);
        };
        const filterBudtender = () => {
            const newUsers = users.filter(function(user) {
                return user.role === "budtender";
            })
            filterUsers(newUsers);
            onFilter(newUsers);
        }

        const filterManager = () => {
            const newUsers = users.filter(function(user) {
                return user.role === "manager";
            })
            filterUsers(newUsers);
            onFilter(newUsers);
        }

        const filterBuyer = () => {
            const newUsers = users.filter(function(user) {
                return user.role === "buyer";
            })
            filterUsers(newUsers);
            onFilter(newUsers);
        }

        const filterFrontDesk = () => {
            const newUsers = users.filter(function(user) {
                return user.role === "frontdesk";
            })
            filterUsers(newUsers);
            onFilter(newUsers);
        }

        const filterSecurity = () => {
            const newUsers = users.filter(function(user) {
                return user.role === "security";
            })
            filterUsers(newUsers);
            onFilter(newUsers);
        }
    
		const totalUsers = (ary) => {
			return ary.length;
		};

		const approvedUsers = () => {
			const newUsers = users.filter(function(user) {
				return user.badgeState === 'approved';
			});
            return newUsers.length;
		};

		const inReviewUsers = (ary) => {
			if (ary !== null) {
				const numApproved = ary.filter(function(user) {
					return user.badgeState === 'inReview';
                });
				return numApproved.length;
			}
		};


		const numberOfBrandUsers = (ary) => {
			if (ary !== null) {
				return usersByRole(ary, 'brand').length;
			}
			return 0;
        };

        const numberOfBudtenders = (ary) => {
			if (ary !== null) {
				return usersByRole(ary, 'budtender').length;
			}
			return 0;
        };


        const numberOfManagers = (ary) => {
			if (ary !== null) {
				return usersByRole(ary, 'manager').length;
			}
			return 0;
        };

		const numberOfBuyerUsers = (ary) => {
			if (ary !== null) {
				return usersByRole(ary, 'buyer').length;
			}
			return 0;
        };
        const numberOfSecurityUsers = (ary) => {
			if (ary !== null) {
				return usersByRole(ary, 'security').length;
			}
			return 0;
        };
        const numberOfFrontDeskUsers = (ary) => {
			if (ary !== null) {
				return usersByRole(ary, 'frontdesk').length;
			}
			return 0;
		};

		const usersByRole = (ary, role) => {
			if (ary !== null) {
				const users = ary.filter(function(user) {
					return user.role === role;
				});
				return users;
			}
		};

		const usersByPlatform = (ary, platform) => {
			if (ary !== null) {
				const numberOfUsers = ary.filter(function(user) {
					return user.platform === platform;
				});
				return numberOfUsers.length;
			}
		};

		return (
            <Fragment>
			<Breadcrumbs aria-label="breadcrumb">
				<Link color="inherit" onClick={clearFilter} >total: {totalUsers(users)}</Link>
				<Link color="inherit" onClick={filterApproved} >approved: {approvedUsers(users)}</Link>
				<Link color="inherit" onClick={filterInReview} >inReview: {inReviewUsers(users)}</Link>
				<Link color="inherit" onClick={filterIos} >ios: {usersByPlatform(users, 'ios')}</Link>
				<Link color="inherit" onClick={filterAndroid} >android: {usersByPlatform(users, 'android')}</Link>			
			</Breadcrumbs>

            <Breadcrumbs>
                <Link color="inherit" onClick={filterBrand} >brand users: {numberOfBrandUsers(users)}</Link>
                <Link color="inherit" onClick={filterBudtender}>budtenders: {numberOfBudtenders(users)}</Link>
                <Link color="inherit" onClick={filterManager}>managers: {numberOfManagers(users)}</Link>
                <Link color="inherit" onClick={filterBuyer}>buyers: {numberOfBuyerUsers(users)}</Link>
                <Link color="inherit" onClick={filterFrontDesk}>frontdesk: {numberOfFrontDeskUsers(users)}</Link>
                <Link color="inherit" onClick={filterSecurity}>security: {numberOfSecurityUsers(users)}</Link>
            </Breadcrumbs>
            </Fragment>
		);
	}
}

UserSubNav.propTypes = {
    users: PropTypes.array.isRequired,
    getUserData: PropTypes.func.isRequired,
    setUsers: PropTypes.func.isRequired,
    filterUsers: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    users: state.data.users,
    filterUsers: state.data.filterUsers
});

const mapDispatchToProps = {
    getUserData,
    setUsers,
    filterUsers
};
export default connect(mapStateToProps, mapDispatchToProps)(UserSubNav);
