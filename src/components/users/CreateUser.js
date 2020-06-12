import React, { useState } from 'react';
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
  

export default function CreateUser({open, onClose, onSave}) {

    const classes = useStyles();
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [zip, setZip] = useState('');
    const [payPalPayoutReceiver, setPayPalPayoutReceiver] = useState('');
    const [platform, setPlatform] = useState('');
    


    const handleClose = () => {
      onClose();
    };

    const handleFirstNameChange = (event) => {
      setFirstName(event.target.value);
    }

    const handleLastNameChange = (event) => {
      setLastName(event.target.value);
    }

    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    }

    const handlePhoneChange = (event) => {
      setPhoneNumber(event.target.value);
    }

    const handleZipChange = (event) => {
      setZip(event.target.value);
    }

    const handlePaypalChange = (event) => {
      setPayPalPayoutReceiver(event.target.value);
    }

    const handlePlatformChange = (event) => {
      setPlatform(event.target.value);
    }

    

    const handleSave = () => {
      const newUser = {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        zip,
        badgeState: 'inReview'
      }
      onSave(newUser);
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
                            name="firstName"
                            label="First Name"
                            type="text"
                            className={classes.textField}
                            placeholder={`${firstName}`}
                            onChange={handleFirstNameChange} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <TextField 
                            name="lastName"
                            label="Last Name"
                            type="text"
                            className={classes.textField}
                            placeholder={`${lastName}`}
                            onChange={handleLastNameChange} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                          <TextField 
                            name="email"
                            label="Email"
                            type="text"
                            className={classes.textField}
                            placeholder={email}
                            onChange={handleEmailChange} />
                    </ListItem>
                    <Divider />

                    <ListItem>
                          <TextField 
                            name="password"
                            label="Password"
                            type="text"
                            className={classes.textField}
                            placeholder={password}
                            onChange={handlePasswordChange} />
                    </ListItem>
                    <Divider />

                    <ListItem>
                          <TextField 
                            name="phoneNumber"
                            label="Phone Number"
                            type="text"
                            className={classes.textField}
                            placeholder={phoneNumber}
                            onChange={handlePhoneChange} />
                    </ListItem>
                    <Divider />


                    <ListItem>
                          <TextField 
                            name="payPalPayoutReceiver"
                            label="Paypal Identifier"
                            type="text"
                            className={classes.textField}
                            placeholder={payPalPayoutReceiver}
                            onChange={handlePaypalChange} />
                    </ListItem>
                    <Divider />


                    <ListItem>
                          <TextField 
                            name="platform"
                            label="Platform"
                            type="text"
                            className={classes.textField}
                            placeholder={platform}
                            onChange={handlePlatformChange} />
                    </ListItem>
                    <Divider />

                    <ListItem button>
                         <ListItemText primary="Dispensary" />
                    </ListItem>
                    <Divider />

                    <ListItem>
                          <TextField 
                            name="zip"
                            label="Zip Code"
                            type="text"
                            className={classes.textField}
                            placeholder={zip}
                            onChange={handleZipChange} />
                    </ListItem>
                    <Divider />
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
