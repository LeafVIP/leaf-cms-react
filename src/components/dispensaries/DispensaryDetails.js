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
  

export default function DispensaryDetails({dispensary, open, onClose, onSave}) {

    const classes = useStyles();
    
    const [license, setLicense] = useState(dispensary.license);
    const [cmId, setCmid] = useState(dispensary.cmId);
    const [address, setAddress] = useState(dispensary.address);
    const [employees, setEmployees] = useState(dispensary.employees);
    const [detailsState, setDetailsState] = useState('view');

    const handleClose = () => {
      setDetailsState('view')
      onClose()
    };

    const handleSave = () => {
      onSave(license, cmId, address, employees);
    }

    const handleState = () => {
      if (detailsState === 'view') {
        setDetailsState('edit');
      } else {
        setDetailsState('view');
        const dispensary = {
          license: license,
          cmId: cmId,
          address: address,
          employees: employees
         
        }
        handleSave(dispensary);
      
      }
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
                            {dispensary.displayName}
                        </Typography>      
                        <Button autoFocus color="inherit" onClick={handleState}>
                           {
                                detailsState === 'view' ? ( <span>Edit</span>) : 
                                (<span>Save</span>)
                           } 
                        </Button>
                    </Toolbar>
                </AppBar>

                <List>
                    <ListItem>
                        <ListItemText primary="Firebase ID" secondary={dispensary.id} />
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
                            placeholder={license}/>
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
                            placeholder={dispensary.cmId} />
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
                            placeholder={dispensary.address}
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
                            placeholder={employees}/>
                        )
                     }
                    </ListItem>
                </List>
            </Dialog>
        </div>
    )
}
