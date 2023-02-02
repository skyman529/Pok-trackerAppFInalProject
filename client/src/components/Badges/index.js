//This is to render the types badges -Faith
import React from 'react';
import Badge from 'react-bootstrap/Badge';

import './style.css';

const types = ["fire", "ice"]; //this is where we pass in the types

const listTypes = types.map((type) =>
  <Badge pill id={type} className="pill">{type.toUpperCase()}</Badge>
);


export default function Badges() {
    return (
        <div>{listTypes}</div>
    )
}