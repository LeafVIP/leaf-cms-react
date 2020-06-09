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
    }
  }));


  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  

export default function EditDispensary({dispensary, open, onClose, onSave}) {

    const classes = useStyles();
    
    const [id] = useState(dispensary.dispensaryId);
    const [license, setLicense] = useState(dispensary.license);
    const [cmId, setCmid] = useState(dispensary.cmId);
    const [address, setAddress] = useState(dispensary.address);
    const [employees, setEmployees] = useState(dispensary.employees);
    const [detailsState, setDetailsState] = useState('view');

    const handleClose = () => {
      setDetailsState('view')
      onClose()
    };

    const handleEdit = () => {
      setDetailsState('edit');
    }
    const handleSave = () => {
     
      const newDispo = {
        id,
        license,
        cmId,
        address,
        employees
      }
      onSave(newDispo);
      setDetailsState('view');
    }

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
                        <Typography variant="h6" className={classes.title}>
                            {dispensary.displayName}
                        </Typography>      

                        {
                          detailsState === 'view' ? (
                            <Button autoFocus color="inherit" onClick={handleEdit}>
                            {
                                <span>Edit</span>
                            } 
                         </Button>
                          ) : (
                            <Button autoFocus color="inherit" onClick={handleSave}>
                            {
                                 <span>Save</span>
                            } 
                         </Button>
                          )
                        }
                   
                    </Toolbar>
                </AppBar>

                <List>
                    <ListItem>
                        <ListItemText primary="Firebase ID" secondary={id} />
                    </ListItem>
                    <Divider />
                    <ListItem>

                      {
                        detailsState === 'view' ? (
                          <ListItemText primary="License" secondary={license} />
                        ) : (
                          <TextField 
                            name="license"
                            label="License"
                            type="text"
                            className={classes.textField}
                            placeholder={license}
                            onChange={handleLicenseChange} />
                        )
                      }
                     
                    </ListItem>
                    <Divider />
                    <ListItem>
                    {
                        detailsState === 'view' ? (
                          <ListItemText primary="CMID" secondary={cmId} />
                        ) : (
                          <TextField 
                            name="cmid"
                            label="CMID"
                            type="text"
                            className={classes.textField}
                            placeholder={dispensary.cmId}
                            onChange={handleCmidChange} />
                        )
                     }
                    </ListItem>
                    <Divider />
                    <ListItem button>
                    {
                        detailsState === 'view' ? (
                          <ListItemText primary="Address" secondary={address} />
                        ) : (
                          <TextField 
                            name="address"
                            label="Address"
                            type="text"
                            className={classes.textField}
                            placeholder={address}
                            onChange={handleAddressChange}
                            multiline/>
                        )
                     }
                    </ListItem>
                    <Divider />
                    <ListItem>
                    {
                        detailsState === 'view' ? (
                          <ListItemText primary="Employees" secondary={dispensary.employees } />
                        ) : (
                          <TextField 
                            name="employees"
                            label='Employees'
                            type="number"
                            className={classes.textField}
                            placeholder={employees}
                            onChange={handleEmployeeschange} />
                        )
                     }
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText primary="Leaf Users" secondary={dispensary.users !== undefined ?  dispensary.users.length : 0} />
                    </ListItem>
                </List>
            </Dialog>
        </div>
    )
}
