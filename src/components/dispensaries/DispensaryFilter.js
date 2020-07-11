import React from 'react';
import Chip from '@material-ui/core/Chip';

export default function DispensaryFilter({name, dispensaries, id, onFilter, onDelete}) {

    const handleClick = () => {
        onFilter(dispensaries);
    }

    const handleDelete = () => {
        onDelete(id);
    }
    return (
        <Chip 
            label={name} 
            onClick={handleClick} 
            onDelete={handleDelete} />
    )
}
