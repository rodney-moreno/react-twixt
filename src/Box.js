import React from 'react';

function Circle(props) {
    return <circle cx={props.cx} cy={props.cy} r="6" onClick={props.onClick} fill = {props.color}/>
}

export default Circle;