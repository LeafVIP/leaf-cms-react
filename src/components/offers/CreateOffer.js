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
    
    const [productName] = useState('');
    const [brand] = useState({});
    const [originalQuantity] = useState(10);
    const [rewardAmount] = useState(5);
    const [campaignName] = useState('');
    const [productDescription] = useState('');
    const [surveyCode] = useState('');
    const [surveyId] = useState('');

    const handleChange = (event) => {
        console.log(`handleChange: ${event.target.name}: ${event.target.value}`)
        setState([event.target.name], event.target.value);
    }

    const handleClose = () => {
        onClose();
    }

    const handleSave = () => {
        const brandId = brand.id;
        const brandName = brand.name;
        const brandLicense = brand.license;

        const newOffer = {
            productName,
            brandId,
            brandName,
            brandLicense,
            originalQuantity,
            rewardAmount,
            campaignName,
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
                            name="productName"
                            label="Product Name"
                            type="text"
                            className={classes.textField}
                            placeholder={productName}
                            onChange={handleChange} />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary='Brand' secondary={brand.name} />
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