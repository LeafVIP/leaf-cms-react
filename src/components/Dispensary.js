import React, { Component } from 'react';

import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';

const styles = {
    card: {
      position: 'relative',
      display: 'flex',
      marginBottom: 20
    },
    card_active: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20,
        backgroundColor: '#CCC'
    },

    card_notactive: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20,
        backgroundColor: '#FFFFFF'
    },
    image: {
      minWidth: 200,
    },
    content: {
      padding: 25,
      objectFit: 'cover'
    }
  };
class Dispensary extends Component {
    render() {
        const{
            isActive,
            classes,
            item: {
                displayName,
            }
        } = this.props;

        return (
            <Card className={isActive === true ? classes.card_active : classes.card_notactive}>
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
    item: PropTypes.object.isRequired,
    isActive: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    // user: state.user
});

const mapDispatchToProps = {
    
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dispensary));