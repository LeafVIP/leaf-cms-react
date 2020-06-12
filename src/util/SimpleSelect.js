import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
    ...theme.root,
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SimpleSelect = (props) => {
  const classes = useStyles();
  const [offer, setOffer] = useState({});

  const handleChange = (event) => {
    setOffer(event.target.value);
    props.onChange(event.target.value);
  };


  return (

    <FormControl className={classes.formControl}>
    <InputLabel id="demo-simple-select-label">Offers</InputLabel>
    <Select
      name="offer"
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={offer}
      onChange={handleChange}
    >
        {props.items.map(item => {
            return <MenuItem key={item.productName} value={item}>{item.productName}</MenuItem>
        })}

    </Select>
  </FormControl>
  )
       
}

SimpleSelect.propTypes = {
    items: PropTypes.array.isRequired
}
export default SimpleSelect;