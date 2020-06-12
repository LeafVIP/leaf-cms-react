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
import JobTypeTransferList from '../../util/JobTypeTransferList';
import Grid from '@material-ui/core/Grid';

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
        background: '#FF0000'
    },
    btnTxt: {
        color: '#FFF'
    }
  }));


  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  

export default function EditOffer({offer, open, onClose, onSave, onDelete, onUploadThumbnail}) {

    
    const classes = useStyles();
    const [displayState, setDisplayState] = useState('view');
    const [isActive, setIsActive] = useState(offer.isActive);

    const state = {
        open: false,
        id: offer.id,
        brandLicense: offer.brandLicense,
        brandName: offer.brandName,
        brandId: offer.brandId,
        originalQuantity: offer.originalQuantity,
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
        dispensaryObjects: offer.dispensaryObjects
    };

    const handleClose = () => {
      setDisplayState('view');
      onClose()
    };

    const handleEdit = () => {
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

    const handleSave = () => {
        const productName = state.productName;
        const productDescription = state.productDescription;
        const brandName = state.brandName;
        const brandLicense = state.brandLicense;
        const brandId = state.brandId;
        const rewardAmount = state.rewardAmount;
        const originalQuantity = state.originalQuantity;
        const jobTypes = state.jobTypes;
        const dispensaries = state.dispensaries;
        const surveyCode = state.surveyCode;

        const newOffer = {
            productName,
            productDescription,
            brandName, 
            brandId,
            brandLicense,
            rewardAmount,
            originalQuantity,
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

                    { 
                        displayState === 'view' ? (
                            <ListItem>
                                   <ListItemText primary="Video URL" secondary={state.videoUrl} />
                            </ListItem>
                        ) : (
                            <ListItem>
                                <TextField 
                                    name="videoUrl"
                                    label="Video URL"
                                    type="text"
                                    className={classes.textField}
                                    placeholder={state.videoUrl}
                                    onChange={handleChange} />
                            </ListItem>
                        )
                    }
             
            
                    <Divider />

               
                    <ListItem>
                        {
                            displayState === 'view' ? (
                                <ListItemText primary="Description" secondary={state.productDescription} />
                            ) : (
                                <TextField 
                                    name="productDescription"
                                    label="Description"
                                    type="text"
                                    className={classes.textField}
                                    placeholder={state.productDescription}
                                    onChange={handleChange}
                                    multiline />
                            )
                        }
                      
                    </ListItem>
                    <Divider />
                    <ListItem>

                        {displayState === 'view' ? (
                            <ListItemText primary="Reward" secondary={state.rewardAmount} />
                            ) : (
                                <TextField 
                                name="rewardAmount"
                                label="Reward"
                                type="number"
                                className={classes.textField}
                                placeholder={state.rewardAmount}
                                onChange={handleChange} />
                            )}
                        
                    </ListItem>
                    <Divider />
                    <ListItem>
                    {
                        displayState === 'view' ? (
                            <ListItemText primary="Quantity" secondary={state.originalQuantity} />
                            ) : (
                                <TextField 
                                    name="originalQuantity"
                                    label="Quantity"
                                    type="number"
                                    className={classes.textField}
                                    placeholder={state.originalQuantity}
                                    onChange={handleChange} />
                            )}
                    </ListItem>
                    <Divider />
                    <ListItem>
                     {
                        displayState === 'view' ? (
                            <ListItemText primary="Survey Code" secondary={state.surveyCode} />
                            ) : (
                                <TextField 
                                    name="surveyCode"
                                    label="Survey Code"
                                    type="text"
                                    className={classes.textField}
                                    placeholder={state.surveyCode}
                                    onChange={handleChange} />
                            )}
                    </ListItem>
                    <Divider />
                    <ListItem>
                     
                        { 
                            displayState === 'view' || state.jobTypes ? (

                                <div>
                                    <ListItemText primary="Job Types" secondary={state.jobTypes} />
                                </div>
                            ) : (
                                <div>
                                    <ListItemText primary="Job Types" secondary={state.jobTypes} />
                                    <JobTypeTransferList />
                                </div>
                            )

                        }
                    </ListItem>
                    <Divider />

                    <ListItem>
                        { 
                            state.dispensaries ? ( 
                                <ListItemText 
                                    primary={`Dispensaries (${state.dispensaries.length})`} 
                                    secondary={state.dispensaryObjects.map(dispo => {return dispo.displayName +', '})} />) 
                                : ( 
                                    <ListItemText 
                                        primary="Dispensaries"
                                             secondary='none' />
                                )
                        }
                       
                    </ListItem>

                    {
                        displayState === 'edit' ? (
                            <div>
                                <ListItem>

                                    <Grid container spacing={3}>

                                         <Grid item xs={6} sm={3}>
                                            <Button className={classes.deleteBtn} onClick={handleDelete}>
                                                <span className={classes.btnTxt}>Delete</span>
                                            </Button>
                                        </Grid>

                                        <Grid item xs={6} sm={3}>
                                            <Button className={classes.saveBtn} onClick={handleSave}>
                                                <span className={classes.btnTxt}>Save</span>
                                            </Button>
                                        </Grid>

                                     
                                    </Grid>
                                </ListItem>
                            </div>
                        ) : (<div></div>)
                    }
 
                </List>
            </Dialog>
        </div>
    )
}
