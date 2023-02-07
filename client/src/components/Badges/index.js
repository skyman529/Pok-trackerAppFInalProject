//This is to render the types badges -Faith
import React from 'react';
import Badge from 'react-bootstrap/Badge';

import './style.css';


export default function Badges(props) {

  const types = props.types;

  const listTypes = types.map((type) =>
    <Badge pill id={type} className="pill">{type.toUpperCase()}</Badge>
  );
  return (
    <div>{listTypes}</div>
  )
}