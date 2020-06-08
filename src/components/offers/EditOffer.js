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
  

export default function EditOffer({offer, open, onClose}) {

    const classes = useStyles();
    
    const handleClose = () => {
      onClose()
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
                            {offer.productName}
                        </Typography>      
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>

                <List>
                    <ListItem>
                        <ListItemText primary="Firebase ID" secondary={offer.id} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Thumbnail" secondary={offer.imagePath} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Description" secondary={offer.productDescription} />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="Reward" secondary={offer.rewardAmount} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Quantity" secondary={offer.originalQuantity} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Video" secondary={offer.videoUrl} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Survey Code" secondary={offer.surveyCode} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Job Filter" secondary={offer.jobTypes} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Dispensary Filter" secondary={offer.dispensaries} />
                     </ListItem>
                </List>
            </Dialog>
        </div>
    )
}
