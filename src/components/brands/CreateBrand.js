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
  

export default function CreateBrand({open, onClose, onSave}) {

    const classes = useStyles();
    
    const [name, setName] = useState('');
    const [license, setLicense] = useState('');


    const handleClose = () => {
      onClose();
    };

    const handleSave = () => {
      const newBrand = {
        name,
        license,
        users: []
      }
      onSave(newBrand);
      handleClose();
    }

    const handleNameChange = (event) => {
      setName(event.target.value);
    };
    const handleLicenseChange = (event) => {
      setLicense(event.target.value);
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
                            name="name"
                            label="Name"
                            type="text"
                            className={classes.textField}
                            placeholder={name}
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
