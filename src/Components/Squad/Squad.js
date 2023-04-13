import React from 'react';
import './Squad.css';

const Squad = (props) => {
    return (
        <div className='squad-container'>
            <span>{props.squad.name}: {props.squad.caps} caps</span>
        </div>
    );
}

export default Squad;