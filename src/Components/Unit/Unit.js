import './Unit.css';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

const Unit = (props) => {
    let count = 0;

    const [hover, setHover] = useState(false);

    if(props.type === 'unit'){
        props.list.forEach(unit => {
            if(unit.name === props.unit.name){
                count++;
            }
        });
    }
    else{
        switch(props.item.type){
            case 'rifle':
            case 'heavy':
            case 'pistol':
            case 'melee':
            case 'thrown':
                props.list[props.unitIndex].weapons.forEach(item => {
                    if(item.name === props.item.name){
                        count++;
                    }
                });
                break;
            case 'armor':
            case 'power armor':
            case 'clothing':
                props.list[props.unitIndex].armor.forEach(item => {
                    if(item.name === props.item.name){
                        count++;
                    }
                });
                break;
            case 'rifle mod':
            case 'pistol mod':
            case 'rifle/pistol mod':
            case 'heavy mod':
            case 'melee mod':
            case 'armor mod':
            case 'power armor mod':
            case 'creature mod':
            case 'robot mod':
                props.list[props.unitIndex].mods.forEach(item => {
                    if(item.name === props.item.name){
                        count++;
                    }
                });
                break;
            case 'food':
            case 'alcohol':
            case 'chem':
            case 'gear':
                props.list[props.unitIndex].consumables.forEach(item => {
                    if(item.name === props.item.name){
                        count++;
                    }
                });
                break;
            case 'perk':
            case 'leader perk':
                props.list[props.unitIndex].perks.forEach(item => {
                    if(item.name === props.item.name){
                        count++;
                    }
                });
                break;
            default:
                break;
        }
    }

    function Entry(){
        if(props.type === 'unit'){
            return (
                <div className='object'>
                    <span  onMouseEnter={() => showImage(true)} onMouseLeave={() => showImage(false)}>{props.unit.name} ({props.unit.caps})</span>
                    {count > 0 ? <span>x{count}</span> : <span></span>}
                    <Button variant='secondary' className='material-button' onClick={() => props.addUnit(props.unit)}><span className="material-symbols-outlined">add</span></Button>
                    <img className='hover-card' hidden={!hover} src={'images/' + props.unit.name.toLowerCase().replace(/[^a-zA-z\d()]]|\s|-/g, '') + '.png'} alt='unit'></img>
                </div>
            );
        }
        else{
            return (
                <div className='object'>
                    <span  onMouseEnter={() => showImage(true)} onMouseLeave={() => showImage(false)}>{props.item.name} ({props.item.caps})</span>
                    {count > 0 ? <span>x{count}</span> : <span></span>}
                    <Button variant='secondary' className='material-button' onClick={() => props.addItem(props.item, props.unitIndex)}><span className="material-symbols-outlined">add</span></Button>
                    <img className='hover-item-card' hidden={!hover} src={'images/' + props.item.name.toLowerCase().replace(/[^a-zA-z\d()]]|\s|-/g, '') + '.png'} alt='item'></img>
                </div>
            );
        }
     
    }

    let timeoutHandle;

    function showImage(value){
        if(value){
            timeoutHandle = setTimeout(() => setHover(true), 500);
        }
        else{
            clearTimeout(timeoutHandle);
            setHover(false);
        }
    }
   
    return (
      <div className='unit-container'>
        <Entry/>
      </div>
    );
  }
  
  export default Unit;