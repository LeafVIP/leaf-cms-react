import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { getSurvey } from '../../redux/actions/surveyActions';

const styles = (theme) => ({
    ...theme.root,
    container: {
        margin: theme.spacing(4),
        minWidth: 120,
      }
  
  });

class SurveyDetails extends Component {

    render() {

        const {
            classes,
            survey: {
                surveyDetails,
                surveyResults,
                loading
            },
        
        } = this.props;
        return (
            <div>
          {
              surveyDetails.title !== undefined ? (
                <div className={classes.container}>
                    <Typography variant="body1">
                        {surveyDetails.title}
                    </Typography>
                    <Typography variant="body2">
                        {surveyDetails.surveyId}
                    </Typography>
                    
                    {
                        !loading && surveyResults !== null ? (
                            <div>
                                results loaded
                            </div>
                        ) : (<div>loading results</div>)
                    }
                </div>
              ) : (
                <div></div>
              )
          }
          </div>
        )
    }
}

const mapStateToProps = (state) => ({
    survey: state.survey
})
const mapActionsToProps = {
    getSurvey
}
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(SurveyDetails));
