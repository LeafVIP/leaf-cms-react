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
import JobTypeTransferList from '../../util/JobTypeTransferList';

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


  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  

export default function EditOffer({offer, open, onClose, onSave, onDelete}) {

    const classes = useStyles();

    const [displayState, setDisplayState] = useState('view');

    const state = {
        open: false,
        brandLicense: offer.brandLicense,
        brandName: offer.brandName,
        brandId: offer.brandId,
        imagePath: offer.imagePath,
        originalQuantity: offer.originalQuantity,
        rewardAmount: offer.rewardAmount,
        videoLength: offer.videoLength,
        productName: offer.productName,
        productDescription: offer.productDescription,
        videoUrl: offer.videoUrl,
        surveyCode: offer.surveyCode,
        surveyId: offer.surveyId,
        campaignName: offer.campaignName,
    };


    const [id] = useState(offer.id);

    const handleClose = () => {
      setDisplayState('view');
      onClose()
    };

    const handleEdit = () => {
        setDisplayState('edit');
    }

    const handleSave = () => {
        const productName = this.state.productName;
        const productDescription = this.state.productDescription;
        const brandName = this.state.brandName;
        const brandLicense = this.state.brandLicense;
        const brandId = this.state.brandId;
        const rewardAmount = this.state.rewardAmount;
        const originalQuantity = this.state.originalQuantity;
        const jobTypes = this.state.jobTypes;
        const dispensaries = this.state.dispensaries;
        const videoUrl = this.state.videoUrl;
        const imageUrl = this.state.imageUrl;
        const surveyCode = this.state.surveyCode;

        const newOffer = {
            id,
            productName,
            productDescription,
            brandName, 
            brandId,
            brandLicense,
            rewardAmount,
            originalQuantity,
            jobTypes,
            dispensaries,
            imageUrl,
            videoUrl,
            surveyCode
        }
        onSave(newOffer);
        setDisplayState('edit');
    }

    const handleChange = (event) => {
        console.log('handleChange: ' +event.target.name + ' - ' +event.target.value);
       this.setState({[event.target.name]: event.target.value});
    };

    const handleDelete = () => {
        onDelete(id);
    }

    return (
        <div>
             <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                       
                                {
                                    displayState === 'edit' ? (
                                        <TextField
                                            name="productName"
                                            label="Product Name"
                                            type="text"
                                            placeholder={state.productName}
                                            onChange={handleChange} />
                                    ) : (
                                        <Typography variant="h6" className={classes.title}>
                                            {state.productName}
                                         </Typography>  

                                    )
                                }
                     
                     
                                { displayState === 'view' ?(
                                    <Button autoFocus color="inherit"  onClick={handleEdit}>
                                         Edit
                                     </Button>
                                ) : (<div>
                                    <Button autoFocus color="inherit"  onClick={handleDelete}>
                                         Delete
                                     </Button>
                                </div>) }
                                
                    </Toolbar>
                </AppBar>

                <List>
                    <ListItem>
                        <ListItemText primary="Firebase ID" secondary={id} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Thumbnail" secondary={state.imagePath} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Description" secondary={state.productDescription} />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="Reward" secondary={state.rewardAmount} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Quantity" secondary={state.originalQuantity} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Video" secondary={state.videoUrl} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Survey Code" secondary={state.surveyCode} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Filters"/>
                        {/* <JobTypeTransferList /> */}
                    </ListItem>
    
                </List>
            </Dialog>
        </div>
    )
}
