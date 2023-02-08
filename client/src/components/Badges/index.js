//This is to render the types badges -Faith
import React from 'react';
import Badge from 'react-bootstrap/Badge';

import './style.css';


export default function Badges(props) {
  const pokeType = props.pokeType;
  const id = props._id;

  const listTypes = pokeType.map((type) =>
      <Badge key={id+type} pill id={type.toLowerCase()} className="pokeText pill">{type}</Badge>
  );
  return (
    <div>{listTypes}</div>
  )
}