import React, { Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDispensaries, selectDispensary, getTop50 } from '../../redux/actions/dispensaryActions';
import Dispensary from '../Dispensary';
import Grid from '@material-ui/core/Grid';
import CreateDispensary from '../CreateDispensary';
import DispensaryDetails from '../DispensaryDetails';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import DispensarySkeleton from '../../util/DispensarySkeleteon';
import DispensaryUserTable from '../tables/DispensaryUserTable';
import { TableRow, TableBody } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = {
    container: {
        width: '100%',
        flex: 1,
        flexDirection:'row',
        padding: 25
    }
}
class DispensaryPage extends Component {
    componentDidMount() {
        this.props.getTop50();
    }
    render() {
        const { dispensaries, dispensary, users, loading } = this.props.data;

        const setDispensary = (dispensary) => () => {
          this.props.selectDispensary(dispensary); 
       };

       let dispensariesMarkup = !loading && dispensaries !== null ? 
       dispensaries.map((dispo) =>
  
        <TableRow onClick={setDispensary}>
          <TableCell>{dispo.displayName}</TableCell>
          <TableCell>{dispo.users.length}</TableCell>
          <TableCell>{0}</TableCell>
          <TableCell>{100}</TableCell>
        </TableRow>
   
       )  
          : (
          <CircularProgress color="secondary" />
         );


        

         const filterTop50 = () => {
          this.props.getTop50();
      }

      const filterAll = () => {
        this.props.getDispensaries();
    }

    const headCells = [
      { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
      { id: 'users', numeric: true, disablePadding: false, label: 'Users' },
      { id: 'employees', numeric: true, disablePadding: false, label: 'Employees' },
      { id: 'saturation', numeric: true, disablePadding: false, label: 'saturation' },
    ];


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
                  
                  
            
                  <Grid container spacing={10}>
                        <Grid item sm={6} xs={8}>
                              {/* {dispensariesMarkup} */}
                              <Table aria-label="dispensaries">
                                <TableHead>
                                  <TableRow>
                                    <TableCell align="left" >name</TableCell>
                                    <TableCell align="center>">users</TableCell>
                                    <TableCell align="center>">employees</TableCell>
                                    <TableCell align="center>">saturation</TableCell>
                                  </TableRow>
                                </TableHead>
                                {dispensariesMarkup}
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
    getTop50: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    data: state.data,
});

const mapDispatchToProps = {
   getDispensaries ,
   selectDispensary,
   getTop50
};

export default connect(mapStateToProps, mapDispatchToProps)(DispensaryPage);

