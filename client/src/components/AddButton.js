import React from 'react';
import Button from 'react-bootstrap';


const AddButton = (props) => {
    return (
        <Button variant="primary" id='pokeCard' data-id={props.data}>Add Pokemon</Button>
    )
};
export default AddButton;