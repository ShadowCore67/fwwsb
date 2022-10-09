import React from 'react'
import './MobilePopUp.css'

const MobilePopUp = (props) => {
  return props.trigger ? (
    <div className='outer-popup' onClick={() => props.setTrigger(!props.trigger)}>
        <div className='popup'>
            {props.children}
        </div>
    </div>
  ) : ''
}

export default MobilePopUp