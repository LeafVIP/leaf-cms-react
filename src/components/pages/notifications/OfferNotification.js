import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { notifyOffer, notifyAll,  getOffers, setOffer } from '../../../redux/actions/dataActions';
import { CircularProgress } from '@material-ui/core';


const styles = (theme) => ({
    ...theme.root,
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    header: {

        margin: 20,
    },
    textField: {
        margin: 20
    },
    submit: {
        flex: 1,
        color:"#00B3FF"
    }
  
  });
  
  class OfferNotification extends Component {


    componentDidMount() {
        this.props.getOffers();
    }

    render() {
        const {
            classes,
            data:{
                loading,
                offers,
                offer,
                users
            },
            UI,
            onSelectOffer
        } = this.props;

        const state = {
            offer: '',
            title: '',
            message: ''
        }
    
        const handleChange = (event) => {
            console.log(`OfferNotification.handleChange: ${event.target.name} - ${event.target.value}`)
            state[event.target.name] = event.target.value;
        }

     
        const handleOfferChange = (event) => {
            state[event.target.name] = event.target.value;
            this.props.setOffer(getOffer(state.offer));
            onSelectOffer(state.offer);
        }

        const getOffer = (id) => {
            return this.props.data.offers.filter(offer => offer.id === id)[0];
        }

        const handleSubmit = () => {
            const title = state.title;
            const message = state.message;

            if(title === '') 
            {
                console.log('title required to send push notification');
                return;
            }

            if(message === '') {
                console.log('message required to send push notification');
                return;
            }

            if (offer.dispensaries === undefined) {
                console.log('send to all users');
                this.props.notifyAll(title, message);
            } else {
                console.log('offer.jobTypes = ' +offer.jobTypes);
                this.props.notifyOffer(title, message, offer.dispensaries, offer.jobTypes);
            }
            
        }

        let markup = !loading ? (
           <Paper className={classes.Paper}>
                <div className={classes.notification}>
                    <Grid 
                        container 
                        spacing={16}>

                            <Grid item xs={12}>
                                <Typography className={classes.header} variant="caption">
                                    OFFER NOTIFICATION
                                </Typography>
                            </Grid>
                   
                        
                                <div>
                                    <Grid item xs={12}>
                                        <div style={{width: '100%'}}>
                                            <FormControl variant="outlined" className={classes.formControl}>
                                                <InputLabel htmlFor="outlined-age-native-simple">select an offer</InputLabel>
                                                <Select
                                                native
                                                name="offer"
                                                value={state.offer.id}
                                                onChange={handleOfferChange}
                                                label="Offer"
                                                >
                                                <option aria-label="None" value="" />
                                                {
                                                    offers.map(offer => {
                                                    return <option name="offer" value={offer.id}>{`${offer.productName} by ${offer.brandName}`}</option>
                                                    })
                                                }
                                        
                                                </Select>
                                        </FormControl>
                                        </div>
                                    </Grid>
        
                                
                                    <Grid item xs={12}>
                                        <div style={{width: '80%'}} >
                                            <form  noValidate autoComplete="off">

                                                { UI.loading ? (
                                                    <TextField 
                                                        id="title" 
                                                        label="Title"
                                                        name="title"
                                                        placeholder="title goes here"
                                                        className={classes.textField}
                                                        onChange={handleChange}
                                                        fullWidth 
                                                        disabled/>
                                                ) : (
                                                    <TextField 
                                                        id="title" 
                                                        name="title"
                                                        label="Title"
                                                        placeholder="title goes here"
                                                        className={classes.textField}
                                                        onChange={handleChange}
                                                        fullWidth />
                                                )}
                                           
                                            </form>
                                    </div>
                                    </Grid>
        
                                
                                    <Grid item xs={12}>
                                        <div style={{width: '80%'}}>
                                            <form  noValidate autoComplete="off">

                                                {
                                                    UI.loading ? (
                                                    <TextField 
                                                        id="message" 
                                                        label="Message"
                                                        placeholder="message goes here" 
                                                        className={classes.textField}
                                                        onChange={handleChange}
                                                        fullWidth
                                                        multiline
                                                        disabled/>
                                                    ) : (
                                                    <TextField 
                                                        id="message" 
                                                        name="message"
                                                        label="Message"
                                                        placeholder="message goes here" 
                                                        className={classes.textField}
                                                        onChange={handleChange}
                                                        fullWidth
                                                        multiline/>
                                                    )
                                                }
                                         
                                            </form>
                                    </div>
                                    </Grid>
        
                                    {
                                        UI.loading ? (
                                            <Button
                                                className={classes.submit}
                                                disabled>
                                                    <CircularProgress color="secondary"/>
                                                </Button>
                                        ) : (
                                            <Button 
                                                className={classes.submit}
                                                onClick={handleSubmit}
                                                >send
                                            </Button>
                                        )
                                    }
                                   
                            
                                </div>
                               
                        
            </Grid>
                    
             <br />
                </div>
            </Paper>
        ) :
        (<div></div>)

        return markup;

    }

  };

  OfferNotification.propTypes = {
      classes: PropTypes.object.isRequired,
      offers: PropTypes.array.isRequired,
      notifyAll: PropTypes.func.isRequired,
      notifyOffer: PropTypes.func.isRequired,
      getOffers: PropTypes.func.isRequired,
      setOffer: PropTypes.func.isRequired,
  };

  const mapStateToProps = (state) => ({
      data: state.data,
      UI: state.UI
  });

  const mapActionsToProps = {
    getOffers,
    setOffer,
    notifyAll,
    notifyOffer
  };

  export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(OfferNotification));