import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSurveys } from '../../redux/actions/surveyActions';
import withStyles from '@material-ui/core/styles/withStyles';
// import Grid from '@material-ui/core/Grid';

const styles = (theme) => ({
    ...theme.root
})
class SurveyPage extends Component {


    componentDidMount() {
        this.props.getSurveys();
    }
    render() {

        // const {surveyData, loading} = this.props.survey;

        return (
            <div>
               
            </div>
        )
    }
}

SurveyPage.propTypes = {
    getSurveys: PropTypes.func.isRequired,
    survey: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    survey: state.survey,
    UI: state.UI
})

const mapDispatchToProps = {
    getSurveys
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SurveyPage));
