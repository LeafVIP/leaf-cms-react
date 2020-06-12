import React, { useState, setState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import { ListItemText } from '@material-ui/core';

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
    },
    saveBtn: {
      color: '#03ddff',
      width: '100%'
    }
  }));


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
export default function CreateOffer({open, onClose, onSave}) {
    
    const classes = useStyles();

    const state = {
        campaignName: '',
        brandId: '',
        brandName: '',
        brandLicense: '',
        originalQuantity: 20,
        rewardAmount: 5,
        productName: '',
        productDescription: '',
        surveyCode: '',
        surveyID: ''
    }

    const handleChange = (event) => {
        console.log(`handleChange: ${event.target.name}: ${event.target.value}`)
        state[event.target.name] = event.target.value
    }

    
    /*
    const [campaignName, setCampaign] = useState('');
    const [brandId, setBrandId] = useState('');
    const [brandName, setBrandName] = useState('');
    const [brandLicense, setBrandLicense] = useState('');
    const [originalQuantity, setQuantity] = useState(10);
    const [rewardAmount, setReward] = useState(5);
    const [productName, setProductName] = useState('')
    const [productDescription, setProductDescription] = useState('');
    const [surveyCode, setSurveyCode] = useState('');
    const [surveyId, setSruveyId] = useState('');


    const handleCampaign = (event) => {
        setCampaign(event.target.value);
    }
    const handleBrandId = (event) => {
        setBrandId(event.target.value);
    }
    const handleBrandName = (event) => {
        setBrandName(event.target.value);
    }
    const handleBrandLicense = (event) => {
        setBrandLicense(event.target.value);
    }
    const handleQuantity = (event) => {
        setQuantity(event.target.value);
    }
    const handleReward = (event) => {
        setCampaign(event.target.value);
    }
    const handleCampaign = (event) => {
        setCampaign(event.target.value);
    }
    const handleCampaign = (event) => {
        setCampaign(event.target.value);
    }
    */
    const handleClose = () => {
        onClose();
    }

    const handleSave = () => {
        const campaignName = state.campaignName;
        const productName = state.productName;
        const brandId = state.brandId;
        const brandName = state.brandName;
        const brandLicense = state.brandLicense;
        const originalQuantity = state.originalQuantity;
        const rewardAmount = state.rewardAmount;
        const productDescription = state.productDescription;
        const surveyCode = state.surveyCode;
        const surveyId = state.surveyId;

        const newOffer = {
            campaignName,
            productName,
            brandId,
            brandName,
            brandLicense,
            originalQuantity,
            rewardAmount,
            productDescription,
            surveyCode,
            surveyId
        }

        onSave(newOffer);
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
                      
                    </Toolbar>
                </AppBar>

                <List>
                <ListItem>
                      <TextField 
                            name="campaignName"
                            label="Campaign"
                            type="text"
                            className={classes.textField}
                            placeholder={state.campaignName}
                            onChange={handleChange} />
                    </ListItem>
                    <Divider />

                    <ListItem>
                      <TextField 
                            name="productName"
                            label="Product Name"
                            type="text"
                            className={classes.textField}
                            placeholder={state.productName}
                            onChange={handleChange} />
                    </ListItem>
                    <Divider />


                    <ListItem>
                      <TextField 
                            name="brandId"
                            label="Brand - ID"
                            type="text"
                            className={classes.textField}
                            placeholder={state.brandId}
                            onChange={handleChange} />
                    </ListItem>
                    <Divider />


                    <ListItem>
                      <TextField 
                            name="brandName"
                            label="Brand - Name"
                            type="text"
                            className={classes.textField}
                            placeholder={state.brandName}
                            onChange={handleChange} />
                    </ListItem>
                    <Divider />


                    <ListItem>
                      <TextField 
                            name="brandLicense"
                            label="Brand - License"
                            type="text"
                            className={classes.textField}
                            placeholder={state.brandLicense}
                            onChange={handleChange} />
                    </ListItem>
                    <Divider />


                    <ListItem>
                      <TextField 
                            name="originalQuantity"
                            label="Quantity"
                            type="number"
                            className={classes.textField}
                            placeholder={state.originalQuantity}
                            onChange={handleChange} />
                    </ListItem>
                    <Divider />


                    <ListItem>
                      <TextField 
                            name="rewardAmount"
                            label="Reward"
                            type="number"
                            className={classes.textField}
                            placeholder={state.rewardAmount}
                            onChange={handleChange} />
                    </ListItem>
                    <Divider />

                    <ListItem>
                      <TextField 
                            name="productDescription"
                            label="Description"
                            type="text"
                            multiline
                            className={classes.textField}
                            placeholder={state.productDescription}
                            onChange={handleChange} />
                    </ListItem>
                    <Divider />

                    <ListItem>
                      <TextField 
                            name="surveyCode"
                            label="Survey Code"
                            type="text"
                            className={classes.textField}
                            placeholder={state.surveyCode}
                            onChange={handleChange} />
                    </ListItem>
                    <Divider />

                    <ListItem>
                      <TextField 
                            name="surveyId"
                            label="Survey ID"
                            type="text"
                            className={classes.textField}
                            placeholder={state.surveyId}
                            onChange={handleChange} />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                    </ListItem>
                    <ListItem>
                          <Button className={classes.saveBtn} onClick={handleSave}>
                            Save
                          </Button>
                    </ListItem>
                </List>
            </Dialog>

        </div>
    )
}