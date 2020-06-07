import React, { Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDispensaryUsers, getDispensaries, selectDispensary, getTop50 } from '../../redux/actions/dispensaryActions';
import Grid from '@material-ui/core/Grid';
import CreateDispensary from '../dispensaries/CreateDispensary';
import DispensaryDetails from '../dispensaries/DispensaryDetails';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell'; 
import { TableRow } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditDispensary from '../dispensaries/EditDispensary';

// const styles = {
//     container: {
//         width: '100%',
//         flex: 1,
//         flexDirection:'row',
//         padding: 25
//     }
// }

let didFetchUsers = false;
class DispensaryPage extends Component {

    componentDidMount() {
      didFetchUsers = false;
        this.props.getTop50();
    }

    createSortHandler = (property) => (event) => {
      // onRequestSort(event, property);
    };
   
    render() {


      this.componentDidUpdate = (prevProps) => {
        if(dispensary !== null) 
        {
          this.props.getDispensaryUsers(dispensary.users);
          didFetchUsers = true;
        }
       
      }
        const { dispensaries, dispensary, dispensaryUsers, loading } = this.props.data;

        const setDispensary = (dispensary) => () => {
          didFetchUsers = false;
          this.props.selectDispensary(dispensary); 
       };


       function saturationRate(users, employees) {
         if (users === 0 || employees === 0) {
           return 0;
         }

         return (users / employees).toFixed(2) * 100;
       }

       let dispensariesMarkup = !loading && dispensaries !== null ? 
       dispensaries.map((dispo) =>
  
    
        <TableRow onClick={setDispensary(dispo)}>
          <TableCell>{dispo.displayName}</TableCell>
          <TableCell>{dispo.users.length}</TableCell>
          <TableCell>{dispo.employees}</TableCell>
          <TableCell>{saturationRate(dispo.users.length, dispo.employees)}%</TableCell>
          <TableCell align="left"><EditDispensary /></TableCell>
        </TableRow>
   
       )  
          : (
          <CircularProgress color="secondary" />
         );

         const filterTop50 = () => {
          this.props.getTop50();
      }


      let usersMarkup = !loading && dispensaryUsers !== null ? 
      dispensaryUsers.map((user) =>
       <TableRow>
         <TableCell>{user.firstName} {user.lastName}</TableCell>
         <TableCell>{user.role}</TableCell>
       </TableRow>

      )  
         : (
         <CircularProgress color="secondary" />
        );

      const filterAll = () => {
        this.props.getDispensaries();
    }

    // const headCells = [
    //   { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
    //   { id: 'users', numeric: true, disablePadding: false, label: 'Users' },
    //   { id: 'employees', numeric: true, disablePadding: false, label: 'Employees' },
    //   { id: 'saturation', numeric: true, disablePadding: false, label: 'saturation' },
    // ];


          return (
            <Fragment>
                  <Grid container spacing={2}>
                  <Grid item>
                         <CreateDispensary />
                    </Grid>
                    <Grid item>
                      <Breadcrumbs aria-label="breadcrumb">
				                <Link color="inherit" onClick={filterTop50} >Top 50</Link>
				                <Link color="inherit" onClick={filterAll} >All</Link>
		                </Breadcrumbs>
                    </Grid>
                  </Grid>
                  
                  
            
                  <Grid container spacing={8}>
                        <Grid item sm={6} xs={3}>
                            { loading ? (<center><CircularProgress color="secondary" /></center>) : (
                              
                              <Table aria-label="dispensaries">
                                <TableHead>
                                  <TableRow>
                                  <TableCell
                                      key="name"
                                      align="left"
                                      padding="default">
                                        name
                                      </TableCell>

                                      <TableCell
                                      key="name"
                                      align="left"
                                      padding="default">
                                        users
                                      </TableCell>

                                      <TableCell
                                      key="name"
                                      align="left"
                                      padding="default">
                                        employees
                                      </TableCell>

                                      <TableCell
                                      key="name"
                                      align="left"
                                      padding="default">
                                        saturation
                                      </TableCell>
                                  
                             
                                  </TableRow>
                                </TableHead>
                                {dispensariesMarkup}
                              </Table>
                              
                              )}
                             
                        </Grid>

                        <Grid item sm={6} xs={3}>
                          <DispensaryDetails dispensary={dispensary} />
                          <Table aria-label="dispensaries">
                                <TableHead>
                                  <TableRow>
                                    <TableCell align="left" >user</TableCell>
                                    <TableCell align="center>">role</TableCell>
                                  </TableRow>
                                </TableHead>
                                {usersMarkup}
                              </Table>
                        </Grid>
                       
                    </Grid>
              </Fragment>
          );
    }
}

DispensaryPage.propTypes = {
    getDispensaries: PropTypes.func.isRequired,
    selectDispensary: PropTypes.func.isRequired,
    getDispensaryUsers: PropTypes.func.isRequired,
    getTop50: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    data: state.data,
});

const mapDispatchToProps = {
   getDispensaries,
   getDispensaryUsers,
   selectDispensary,
   getTop50
};

export default connect(mapStateToProps, mapDispatchToProps)(DispensaryPage);

