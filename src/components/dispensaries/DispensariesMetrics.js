import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { withStyles, makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    img: {
        maxWidth: 400,
        maxHeight: 300
    }
  }));

class DispensariesMetrics extends Component {
    render() {
        
        const {dispensaries, loading} = this.props.data;

        const totalUsers = () => {
            let count = 0;
            dispensaries.forEach(dispo => {
                count += dispo.users.length;
            });
            return count;
        }


        let markup = !loading && dispensaries !== null ? (
            <Grid container spacing={1}>
            <Grid item>
                 In-Network Users: {totalUsers()}
            </Grid>
        </Grid>
        ) : (
            <div></div>
        )

        return (
            <div>{markup}</div>
        )
    }
}

DispensariesMetrics.propTypes = {
    data: PropTypes.object.isRequired,
    dispensaries: PropTypes.array,
    loading: PropTypes.bool
}

const mapStateToProps = (state) => ({
    data: state.data
});

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(DispensariesMetrics));
