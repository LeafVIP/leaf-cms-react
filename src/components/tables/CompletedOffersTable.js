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
import CompletedOfferTableViewCell from './CompletedOfferTableViewCell';

const styles = {
    table: {
      minWidth: 650,
    },
  }

export class CompletedOffersTable
 extends Component {
    render() {
      const {
        data:{
          loading,
          offers,
          completedOffers
        }
      } = this.props;

        let completedOffersMarkup = !loading & offers !== null ? 
        completedOffers.map((offer) =>
            <CompletedOfferTableViewCell 
              offer={offer} />
        )  
           : (
            <>Loading completed offers for user: </>
          );

        return (
            <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Completed Offers</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {completedOffersMarkup}
        </TableBody>
      </Table>
    </TableContainer>
        )
    }
}

CompletedOffersTable
.propTypes = {
    offers: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  }
  
  const mapStateToProps = (state) => ({
    data: state.data
  });


const mapDispatchToProps = {

};

  
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CompletedOffersTable));
