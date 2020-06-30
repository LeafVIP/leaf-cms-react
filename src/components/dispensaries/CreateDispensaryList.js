import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField'
import MyButton from '../../util/MyButton';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

function CreateDispensaryList({onSave}) {
    const state = {
        name: ''
    }

    const handleChange = (event) => {
         state.name = event.target.value;
    }

    const handleSave = () => {
        const name = state.name;
        onSave(name);
    }

    return (
        <div>
            <TextField
                label="Name"
                type="text"
                onChange={handleChange} />
            <MyButton
                tip="new list"
                onClick={handleSave}>
                    <PlaylistAddIcon />
                </MyButton>
        </div>
    )
}

CreateDispensaryList.propTypes = {
    dispensaries: PropTypes.array
}

export default CreateDispensaryList;