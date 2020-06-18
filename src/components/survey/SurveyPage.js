import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSurveys, setSurvey } from '../../redux/actions/surveyActions';
import SurveyDetails from './SurveyDetails';
import SurveyTable from './SurveyTable';
import CreateSurvey from './CreateSurvey';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

class SurveyPage extends Component {
    componentDidMount() {
        this.props.getSurveys();
    }
    render() {

       
        const {surveyData, surveyDetails, loading} = this.props.survey;
   


        const onSelectSurvey = (survey) => {
           this.props.setSurvey(survey);
        }

        return (
            <Grid 
                container
                spacing={16}
                justify='center'>


                <Grid item>
                    <CreateSurvey />
                {
                    !loading && surveyData !== null ? (
                        <SurveyTable
                             items={surveyData}
                             onSelectItem={onSelectSurvey} />
                    ) : (
                        <CircularProgress />
                    )
                }


                </Grid>  
                <Grid 
                    item>
                    {
                        !loading && surveyDetails !== {} ? (<SurveyDetails survey={surveyDetails}/>) : (<div></div>)
                    }
                </Grid>
            </Grid>     
        )
    }
}

SurveyPage.propTypes = {
    getSurveys: PropTypes.func.isRequired,
    setSurvey: PropTypes.func.isRequired,
    survey: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    survey: state.survey,
    UI: state.UI
})

const mapDispatchToProps = {
    getSurveys,
    setSurvey
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyPage);
