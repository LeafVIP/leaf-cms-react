import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import UserTableViewCell from './UserTableViewCell';
import { Toolbar } from '@material-ui/core';

const styles = {
    table: {
      minWidth: 650,
    },
  }

export class DispensaryUserTable extends Component {
    render() {
      const {
        data:{
          loading,
          users
        }
      } = this.props;

        let usersMarkup = !loading & users !== null ? 
        users.map((user) =>
            <UserTableViewCell 
              user={user} />
        )  
           : (
            <>Loading users for dispensary: </>
          );

          function createData(name, calories, fat, carbs, protein) {
            return { name, calories, fat, carbs, protein };
          }

        return (
            <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <Toolbar>
            Users
          </Toolbar>
          <TableRow>
            <TableCell>NAME</TableCell>
            <TableCell align="right">ROLE</TableCell>
            <TableCell align="right">EMAIL</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         
          {usersMarkup}
        </TableBody>
      </Table>
     
    </TableContainer>
        )
    }
}

DispensaryUserTable.propTypes = {
    users: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired
  }
  
  const mapStateToProps = (state) => ({
    data: state.data
  });


const mapDispatchToProps = {

};

  
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DispensaryUserTable));
