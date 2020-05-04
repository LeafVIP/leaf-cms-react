import React, { Component } from 'react';

import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import Nav from '../util/DispensaryNav';


class Dispensary extends Component {
    render() {
        const{
            item: {
                dispensaryId, 
                displayName,
                address,
                license,
                cmid
            }
        } = this.props;

        return (
            <Card>
                <CardContent >
                <Typography
                        variant="h6"
                        color="textPrimary">
                            {displayName }
                        
                        </Typography> 
                </CardContent>
            </Card>
        );
    }
};

Dispensary.propTypes = {
    item: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    // user: state.user
});

const mapDispatchToProps = {
    
};

export default connect(mapStateToProps, mapDispatchToProps)(Dispensary);