import React, { Component, useState } from 'react';
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
import { TextField } from '@material-ui/core';

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
  

export default function CreateDispensary({open, onClose, onSave}) {

    const classes = useStyles();
    
    const [displayName, setDisplayName] = useState('');
    const [license, setLicense] = useState('');
    const [cmId, setCmid] = useState('');
    const [address, setAddress] = useState('');
    const [employees, setEmployees] = useState(0);

    const handleClose = () => {
      onClose()
    };

    const handleSave = () => {
     
      const newDispensary = {
        displayName,
        license,
        cmId,
        address,
        employees,
        users: []
      }
      onSave(newDispensary);
      handleClose();
    }

    const handleNameChange = (event) => {
      setDisplayName(event.target.value);
    };
    const handleLicenseChange = (event) => {
      setLicense(event.target.value);
    };


    const handleCmidChange = (event) => {
      setCmid(event.target.value);
    };


    const handleAddressChange = (event) => {
      setAddress(event.target.value);
    };


    const handleEmployeeschange = (event) => {
      setEmployees(event.target.value);
    };



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
                            name="displayName"
                            label="Name"
                            type="text"
                            className={classes.textField}
                            placeholder={displayName}
                            onChange={handleNameChange} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                          <TextField 
                            name="license"
                            label="License"
                            type="text"
                            className={classes.textField}
                            placeholder={license}
                            onChange={handleLicenseChange} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                    
                          <TextField 
                            name="cmid"
                            label="CMID"
                            type="text"
                            className={classes.textField}
                            placeholder={cmId}
                            onChange={handleCmidChange} />
                   
                    </ListItem>
                    <Divider />
                    <ListItem button>
                          <TextField 
                            name="address"
                            label="Address"
                            type="text"
                            className={classes.textField}
                            placeholder={address}
                            onChange={handleAddressChange}
                            multiline/>
                    </ListItem>
                    <Divider />
                    <ListItem>
                          <TextField 
                            name="employees"
                            label='Employees'
                            type="number"
                            className={classes.textField}
                            placeholder={employees}
                            onChange={handleEmployeeschange} />
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
