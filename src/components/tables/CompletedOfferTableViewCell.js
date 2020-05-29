import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class CompletedOfferTableViewCell extends Component {
    render() {
        const { offer: {
           displayName,
           id
        }} = this.props.data;
        return (
            <TableRow key={id}>
              <TableCell component="th" scope="row">
                {displayName}
              </TableCell>
            </TableRow>
        )
    }
}

CompletedOfferTableViewCell.propTypes = {
    offer: PropTypes.object.isRequired
}   

const mapStateToProps = (state) => ({
    data: state.data
})

export default connect(mapStateToProps, {})(CompletedOfferTableViewCell);
