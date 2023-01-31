import React from 'react';
import Badge from 'react-bootstrap/Badge';

import './style.css';

const types = ["fire", "ice"];
const listTypes = types.map((type) =>
  <Badge pill id={type} className="pill">{type.toUpperCase()}</Badge>
);


export default function Badges() {
    return (
        <div>{listTypes}</div>
    )
}