import React from 'react';
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
  

export default function EditUser({user, open, onClose, onBadgeClick, onUploadBadgeImage}) {

    const classes = useStyles();
    
    const handleClose = () => {
      onClose()
    };

    const handleEditThumbnail = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    }

    const handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        formData.append('Access-Control-Allow-Origin', '*')
        console.log('upload badge image for userId: ' +user.authUid +' data ' +formData);
        onUploadBadgeImage(user.authUid, formData);
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
                            {user.firstName} {user.lastName}
                        </Typography>      
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>

                <List>
                    <ListItem>
                        <ListItemText primary="Firebase ID" secondary={user.authUid} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Email" secondary={user.email} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Phone" secondary={user.phoneNumber} />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="dispensary" secondary={user.dispensary} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Phone" secondary={user.phoneNumber} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Platform" secondary={user.platform} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Version" secondary={user.version} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Push Notification" secondary={(user.fcmToken === undefined || user.fcmToken === '' ) ? 'Disabled' : 'Enabled' } />
                    </ListItem>
                    <Divider />
                    < ListItem button value={user} onClick={onBadgeClick}>
                        <ListItemText primary="Badge State" secondary={user.badgeState} />
                    </ListItem>
                    <Divider />
                    <ListItem
                        button
                        onClick={handleEditThumbnail}>

                        <img 
                            className={classes.img} 
                            src={user.badgeFrontUrl} 
                            alt={user.authUid} />

                         <input
                            type="file"
                            id="imageInput"
                            hidden="hidden"
                            onChange={handleImageChange} />

                    </ListItem>
                </List>
            </Dialog>
        </div>
    )
}
