import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

// DEV
// const storageBucket = 'https://firebasestorage.googleapis.com/v0/b/leafvip-dev.appspot.com/o/offerImagesPath%2f';

// PROD
const storageBucket ='https://firebasestorage.googleapis.com/v0/b/leafvip-c42db.appspot.com/o/offerImagesPath%2f';

const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    img: {
        maxWidth:320
    },
    saveBtn: {
        background: '#0389ff'
    },
    deleteBtn: {
        flex: 1,
        color: '#FF0000'
    },
  }));


  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  

export default function EditOffer({offer, open, onClose, onSave, onDelete, onUploadThumbnail}) {

    const classes = useStyles();

    // view / edit
    const [displayState, setDisplayState] = useState('view');

    // is the offer live?
    const [isActive, setIsActive] = useState(offer.isActive);
    

    
    const state = {
        open: false,
        id: offer.id,
        brandLicense: offer.brandLicense,
        brandName: offer.brandName,
        brandId: offer.brandId,
        remainingQuantity: offer.remainingQuantity,
        rewardAmount: offer.rewardAmount,
        productName: offer.productName,
        productDescription: offer.productDescription,
        surveyCode: offer.surveyCode,
        surveyId: offer.surveyId,
        campaignName: offer.campaignName,
        isActive: offer.isActive,
        imagePath: offer.imagePath,
        videoUrl: offer.videoUrl,
        dispensaries: offer.dispensaries,
        dispensaryObjects: offer.dispensaryObjects,
        jobTypes: offer.jobTypes
    };

        // job types
        const [budtender, setBudtender] = useState(state.jobTypes && state.jobTypes.indexOf('budtender') >= 0 ? true : false);
        const [manager, setManager] = useState(offer.jobTypes ? offer.jobTypes.indexOf('manager') >= 0 : false);
        const [buyer, setBuyer] = useState(offer.jobTypes ? offer.jobTypes.indexOf('buyer') >= 0 : false);
        const [frontdesk, setFrontdesk] = useState(offer.jobTypes ? offer.jobTypes.indexOf('frontdesk') >= 0 : false);
        const [security, setSecurity] = useState(offer.jobTypes ? offer.jobTypes.indexOf('security') >= 0 : false);
        const [brand, setBrand] = useState(offer.jobTypes ? offer.jobTypes.indexOf('brand') >= 0 : false);
     

    const handleClose = () => {
      setDisplayState('view');
      onClose()
    };

    const handleEdit = () => {
       if(state.jobTypes !== null && state.jobTypes !== undefined  && state.jobTypes !== []) { 
           console.log('jobTypes = ' +state.jobTypes);
            setBudtender(state.jobTypes.indexOf('budtender') >= 0)
            setManager(state.jobTypes.indexOf('manager') >= 0)
            setBuyer(state.jobTypes.indexOf('buyer') >= 0)
            setFrontdesk(state.jobTypes.indexOf('frontdesk') >= 0)
            setSecurity(state.jobTypes.indexOf('security') >= 0)
            setBrand(state.jobTypes.indexOf('brand') >= 0)
       }

        setDisplayState('edit');
    }
    const handleEditThumbnail = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    }

    const handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        formData.append('Access-Control-Allow-Origin', '*')
        onUploadThumbnail(state.id, formData);
      };

      const getJobTypes = () => {
          const jobs = [];
            if (budtender) {
                jobs.push('budtender');
            }
            if(manager) {
                jobs.push('manager');
            }

            if(buyer) {
                jobs.push('buyer');
            }

            if (frontdesk) {
                jobs.push('frontdesk');
            }

            if (security) {
                jobs.push('security');
            }

            if(brand) {
                jobs.push('brand');
            }

            return jobs;
      }
    const handleSave = () => {
        const productName = state.productName;
        const productDescription = state.productDescription;
        const brandName = state.brandName;
        const brandLicense = state.brandLicense;
        const brandId = state.brandId;
        const rewardAmount = state.rewardAmount;
        const remainingQuantity = state.remainingQuantity;
        const dispensaries = state.dispensaries;
        const surveyCode = state.surveyCode;
        const jobTypes = getJobTypes();

        const newOffer = {
            productName,
            productDescription,
            brandName, 
            brandId,
            brandLicense,
            rewardAmount,
            remainingQuantity,
            jobTypes,
            dispensaries,
            surveyCode,
            isActive
        }

        console.log('save offer: active = ' +isActive);
        onSave(state.id, newOffer);
        setDisplayState('edit');
    }

    const handleChange = (event) => {
        console.log('handleChange: ' +event.target.name + ' - ' +event.target.value);
        state[event.target.name] = event.target.value;
    };


    const toggleActive = (event) => {
         setIsActive(!event.target.value);
    };

    const handleDelete = () => {
        onDelete(state.id);
        handleClose();
    }

    const handleClearDispensaries = () => {
        state["dispensaries"] = [];
        state["dispensaryObjects"] = []
    }
    const handleBudtender = (event) => {
        setBudtender(event.target.checked);
    }
    const handleManager = (event) => {
        setManager(event.target.checked);
    }
    const handleBuyer = (event) => {
        setBuyer(event.target.checked);
    }
    const handleFrontdesk = (event) => {
        setFrontdesk(event.target.checked);
    }
    const handleSecurity = (event) => {
        setSecurity(event.target.checked);
    }
    const handleBrand = (event) => {
        setBrand(event.target.checked);
    }

    return (
        <div>
             <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                       
                                <Typography variant="h6" className={classes.title}>
                                    {state.productName}
                                 </Typography>  
                     
                     
                                { displayState === 'view' ?(
                                    <Button autoFocus color="inherit"  onClick={handleEdit}>
                                         edit
                                     </Button>
                                ) : (<div>
                                    <Button autoFocus color="inherit"  onClick={handleSave}>
                                         save
                                     </Button>
                                </div>) }
                                
                    </Toolbar>
                </AppBar>

                <List>
                    <ListItem>
                        <ListItemText primary="Firebase ID" secondary={state.id} />
                    </ListItem>
                    <Divider />
                    {displayState === 'edit' ? (
                        <div>
                        <ListItem>
                            <TextField 
                                name="productName"
                                label="Name"
                                type="text"
                                className={classes.textField}
                                placeholder={state.productName}
                                onChange={handleChange} />
                        </ListItem>
                        </div>
                    ) :(<div></div>)}  
                    <ListItem>


                    {
                        displayState === 'view' ? (
                            <div>
                                <ListItemText primary="Offer Status" secondary={offer.isActive ? "Active" : "Inactive"} />    
                            </div>
                            
                        ) : (

                            <div>
                                <ListItemText primary="Offer Status" secondary={isActive ? "Active" : "Inactive"} /> 
                                <Switch
                                    name="isActive"
                                    checked={isActive}
                                    onClick={toggleActive}
                                    value={isActive}
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                            </div>
                        )
                    }
                     
                        
                    
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Thumbnail" />
                    </ListItem>

                    { 
                        displayState === 'view' ? (
                            <ListItem>
                                    <img 
                                    className={classes.img} 
                                    alt={state.productName}
                                    src={`${storageBucket}${state.imagePath}?alt=media`} />
                            </ListItem>
                        ) : (
                            <ListItem 
                                button 
                                onClick={handleEditThumbnail}>
                               
                                <img 
                                    className={classes.img} 
                                    alt={state.productName}
                                    src={`${storageBucket}${state.imagePath}?alt=media`} />
                            
                                <input
                                    type="file"
                                    id="imageInput"
                                    hidden="hidden"
                                    onChange={handleImageChange} />
                            </ListItem>
                        )
                    }
             
            
                    <Divider />

                    <ListItem>
                    { 
                        displayState === 'view' ? (
                
                            <ListItemText primary="Video URL" secondary={state.videoUrl} />
    
                        ) : (
                            <div>
                                <ListItemText primary="Enter Video URL" />
                                <TextField 
                                    name="videoUrl"
                                    label="Video URL"
                                    type="text"
                                    className={classes.textField}
                                    placeholder={state.videoUrl}
                                    onChange={handleChange} />
                            </div>
            
                        )
                    }
             
                </ListItem>
                    <Divider />

               
                    <ListItem>
                        {
                            displayState === 'view' ? (
                                <ListItemText primary="Description" secondary={state.productDescription} />
                            ) : (
                                <div>
                                    <ListItemText primary="Enter a product description" />
                                    <TextField 
                                        name="productDescription"
                                        label={state.productDescription}
                                        type="text"
                                        className={classes.textField}
                                        placeholder={state.productDescription}
                                        onChange={handleChange}
                                        multiline />
                                </div>
                            )
                        }
                      
                    </ListItem>
                    <Divider />
                    <ListItem>

                        {displayState === 'view' ? (
                            <ListItemText primary="Reward" secondary={state.rewardAmount} />
                            ) : (
                                <div>
                                    <ListItemText primary="Set a reward amount"/>
                                    <TextField 
                                        name="rewardAmount"
                                        label={state.rewardAmount.toString()}
                                        type="number"
                                        className={classes.textField}
                                        placeholder={state.rewardAmount.toString()}
                                        onChange={handleChange} />
                                </div>
                            )}
                        
                    </ListItem>
                    <Divider />
                    <ListItem>
                    {
                        displayState === 'view' ? (
                            <ListItemText primary="Quantity" secondary={state.remainingQuantity} />
                            ) : (
                                <div>
                                    <ListItemText primary="Enter quantity" />
                                    <TextField 
                                        name="remainingQuantity"
                                        label={state.remainingQuantity.toString()}
                                        type="number"
                                        className={classes.textField}
                                        placeholder={state.remainingQuantity.toString()}
                                        onChange={handleChange} />
                                </div>
                            )}
                    </ListItem>
                    <Divider />
                    <ListItem>
                     {
                        displayState === 'view' ? (
                            <ListItemText primary="Survey Code" secondary={state.surveyCode} />
                            ) : (
                                <div>
                                    <ListItemText primary="Enter a survey codee" />
                                    <TextField 
                                        name="surveyCode"
                                        label={state.surveyCode}
                                        type="text"
                                        className={classes.textField}
                                        placeholder={state.surveyCode}
                                        onChange={handleChange} />
                                </div>
                            )}
                    </ListItem>
                    <Divider />
                    <ListItem>
                     
                        { 
                            displayState === 'view' ? (
                                <div>
                                    <ListItemText 
                                        primary="Job Types" 
                                        secondary={state.jobTypes !== undefined || state.jobTypes === [] ?(state.jobTypes.map(job => { return job +", "})) : <div>none</div>} />
                                </div>
                            ) : (
                                <div>
                                    <ListItemText primary="Job Types" />
                                    <FormControl className={classes.formControl}>
                                        <FormGroup>
                                        <FormControlLabel 
                                            control={<Checkbox 
                                            checked={budtender} 
                                            onChange={handleBudtender}
                                            name="budtender" />}
                                            label="budtender"/>
                                            
                                        <FormControlLabel 
                                            control={<Checkbox 
                                            checked={manager} 
                                            onChange={handleManager}
                                            name="manager" />}
                                            label="manager"/>

                                        <FormControlLabel 
                                            control={<Checkbox 
                                            checked={buyer} 
                                            onChange={handleBuyer}
                                            name="buyer" />}
                                            label="buyer"/>

                                        <FormControlLabel 
                                            control={<Checkbox 
                                            checked={frontdesk} 
                                            onChange={handleFrontdesk}
                                            name="frontdesk" />}
                                            label="frontdesk"/>

                                        <FormControlLabel 
                                            control={<Checkbox 
                                            checked={security} 
                                            onChange={handleSecurity}
                                            name="security" />}
                                            label="security"/>

                                        <FormControlLabel 
                                            control={<Checkbox 
                                            checked={brand} 
                                            onChange={handleBrand}
                                            name="brand" />}
                                            label="brand"/>

                                          
                                        </FormGroup>
                                    </FormControl>
                                </div>
                            )

                        }
                    </ListItem>
                    <Divider />

                    <ListItem>
                        { 
                         
                            state.dispensaries ? ( 
                                displayState === 'view' ? (
                                    <ListItemText 
                                        primary={`Dispensaries (${state.dispensaries.length})`} 
                                        secondary={state.dispensaryObjects.map(dispo => {return dispo.displayName +', '})} />
                                ) : (
                                    
                                    <div>
                                        <ListItemText 
                                            primary={`Dispensaries (${state.dispensaries.length})`} 
                                            secondary={state.dispensaryObjects.map(dispo => {return dispo.displayName +', '})} />

                                        <Typography
                                         variant="button"
                                         onClick={handleClearDispensaries}>CLEAR</Typography>
                                    </div>
                                            
                                        
                                    ) 
                            ) : 
                            ( 
                                    <ListItemText 
                                        primary="Dispensaries"
                                        secondary='none' />
                            )
                        }
                       
                    </ListItem>
                    <Divider />
 
                </List>

                {
                    displayState === 'edit' ? (
                        <Button className={classes.deleteBtn} onClick={handleDelete}>
                            <span className={classes.btnTxt}>Delete</span>
                        </Button>
                    ) : (
                        <div></div>
                    )
                }
            </Dialog>
        </div>
    )
}
