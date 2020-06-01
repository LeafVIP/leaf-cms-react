import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class UserTableViewCell extends Component {
    render() {
        const { user: {
            authId,
            firstName,
            lastName,
            email,
            role,
        }} = this.props;
        return (
            <TableRow key={authId}>
              <TableCell component="th" scope="row">
                <div>name</div>
              </TableCell>
              <TableCell align="right">role</TableCell>
              <TableCell align="right">email</TableCell>
            </TableRow>
        )
    }
}

UserTableViewCell.propTypes = {
    user: PropTypes.object.isRequired
}   

const mapStateToProps = (state) => ({
    user: state.data.user
})

export default connect(mapStateToProps, {})(UserTableViewCell);
