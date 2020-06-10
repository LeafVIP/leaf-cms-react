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
    deleteBtn: {
        color:'#FF00CC'
    },
    img: {
        maxWidth: 400,
        maxHeight: 300
    }
  }));


  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  

export default function EditBrand({brand, open, onClose, onSave, onDelete}) {

    const classes = useStyles();
    
    const [license, setLicense] = useState(brand.license);
    const [name, setName] = useState(brand.name);
    const [detailsState, setDetailsState] = useState('view');

    const handleClose = () => {
      setDetailsState('view')
      onClose()
    };

    const handleEdit = () => {
      setDetailsState('edit');
    }
    const handleSave = () => {
     
      const newBrand = {
        id: brand.id,
        license,
        name
      }
      onSave(newBrand);
      handleClose()
    }

    const handleDelete = () => {
        onDelete(brand.id);
        handleClose();
    }

    const handleLicenseChange = (event) => {
      setLicense(event.target.value);
    };

    const handleNameChange = (event) => {
      setName(event.target.value);
    };

    return (
        <div>
             <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        {
                            detailsState === 'view' ? (
                                <Typography variant="h6" className={classes.title}>
                                    {brand.name}
                                </Typography>    
                            ) : (
                                <Typography variant="h6" className={classes.title}>
                                    Update 
                                </Typography>   
                            )
                        }
      

                        {
                          detailsState === 'view' ? (
                            <Button autoFocus color="inherit" onClick={handleEdit}>
                            {
                                <span>Edit</span>
                            } 
                         </Button>
                          ) : (
                            <Button autoFocus className={classes.deleteBtn} onClick={handleDelete}>
                            {
                                 <span>Delete</span>
                            } 
                         </Button>
                          )
                        }
                   
                    </Toolbar>
                </AppBar>

                <List>
                    <ListItem>
                        <ListItemText primary="Firebase ID" secondary={brand.id} />
                    </ListItem>
                    <Divider />
                    {
                      detailsState === 'edit' ? (
                        <div>
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
                        </div>
                       
                      ) : (
                        <div></div>
                      )
                    }
                    <ListItem>

                      {
                        detailsState === 'view' ? (
                          <ListItemText primary="License" secondary={brand.license} />
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
                </List>
                <Button onClick={handleSave}>Save</Button>
            </Dialog>
        </div>
    )
}
