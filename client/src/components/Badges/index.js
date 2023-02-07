//This is to render the types badges -Faith
import React from 'react';
import Badge from 'react-bootstrap/Badge';

import './style.css';


export default function Badges(props) {

  const pokeType = props.pokeType;

  const listTypes = pokeType.map((type) =>
    <Badge pill id={type.toLowerCase()} className="pill">{type}</Badge>
  );
  return (
    <div>{listTypes}</div>
  )
}