import React from 'react';
import Button from 'react-bootstrap/Button';
import './CardDisplay.css';

const CardDisplay = (props) => {

  const images = props.imageList.map((image, index) => {
    if(index !== 0){
      return <img key={index} className='item-card' src={'images/' + image} alt='card'></img>;
    }
    else{
      return null;
    }
  });

  return (
    <div className='grid-item'>
      <div className='export-bar'>
        <Button className='material-button' onClick={() => props.downloadTextList()}>Download Text List</Button>
      </div>
      <div className='display'>
        <Button hidden={!props.isMobile} className='material-button sticky-top' onClick={() => props.mobileHideImages()}>Return to List</Button>
        <img className='unit-card' src={'images/' + props.imageList[0]} alt='card'></img>
        {images}
      </div>
    </div>
  )
}

export default CardDisplay