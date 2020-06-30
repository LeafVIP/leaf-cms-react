import React from 'react';
import Chip from '@material-ui/core/Chip';

export default function DispensaryFilter({name, dispensaries, onFilter}) {

    const handleClick = () => {
        onFilter(dispensaries);
    }
    return (
        <Chip label={name} onClick={handleClick} />
    )
}
