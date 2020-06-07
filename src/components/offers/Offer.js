import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

class Offer extends Component {
    render() {
        const {
            offer: {
                productName,
            }
        } = this.props;

        return (
            <Card>
                <CardContent>
                    <Typography
                        variant="h6"
                        color="textPrimary">
                            {productName}
                        </Typography>
                </CardContent>
            </Card>
        )
    }
}

Offer.propTypes = {
    offer: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {

};
export default connect(mapStateToProps, mapDispatchToProps)(Offer);