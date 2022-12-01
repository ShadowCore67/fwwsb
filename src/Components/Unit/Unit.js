import './Unit.css';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

const Unit = (props) => {
    let count = 0;

    const [viewImage, setViewImage] = useState(false);

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
            if(props.isMobile) {
                return (
                    <div className='object'>
                        <div>
                            <p className='unit-title' onClick={() => setViewImage(true)}>{props.unit.name} ({props.unit.caps})</p>
                            <p className='unit-title subtext'>{props.unit.factions.toString().replace(/,/g, ', ')}</p>
                        </div>
                        {count > 0 ? <span>x{count}</span> : <span></span>}
                        <Button variant='secondary' className='material-button' onClick={() => props.addUnit(props.unit)}><span className="material-symbols-outlined">add</span></Button>
                        <img onClick={() => setViewImage(false)} className='hover-card' hidden={!viewImage} src={'images/' + props.unit.name.toLowerCase().replace(/[^a-zA-z\d()]|\s|-/g, '') + '.png'} alt='unit'></img>
                    </div>
                );
            }
            else {
                return (
                    <div className='object'>
                        <div>
                            <p className='unit-title' onMouseEnter={() => showImageHover(true)} onMouseLeave={() => showImageHover(false)}>{props.unit.name} ({props.unit.caps})</p>
                            <p className='unit-title subtext'>{props.unit.factions.toString().replace(/,/g, ', ')}</p>
                        </div>
                        {count > 0 ? <span>x{count}</span> : <span></span>}
                        <Button variant='secondary' className='material-button' onClick={() => props.addUnit(props.unit)}><span className="material-symbols-outlined">add</span></Button>
                        <img className='hover-card' hidden={!viewImage} src={'images/' + props.unit.name.toLowerCase().replace(/[^a-zA-z\d()]|\s|-/g, '') + '.png'} alt='unit'></img>
                    </div>
                );
            }
        }
        else{
            if(props.isMobile) {
                return (
                    <div className='object'>
                        <div>
                            <p className='unit-title' onClick={() => setViewImage(true)}>{props.item.name} ({props.item.caps})</p>
                            <p className='unit-title subtext capitalize'>{props.item.type}, {props.item.category}</p>
                        </div>
                        {count > 0 ? <span>x{count}</span> : <span></span>}
                        <Button variant='secondary' className='material-button' onClick={() => props.addItem(props.item, props.unitIndex)}><span className="material-symbols-outlined">add</span></Button>
                        <img onClick={() => setViewImage(false)} className='hover-item-card' hidden={!viewImage} src={'images/' + props.item.name.toLowerCase().replace(/[^a-zA-z\d()]|\s|-/g, '') + '.png'} alt='item'></img>
                    </div>
                );
            }
            else {
                return (
                    <div className='object'>
                        <div>
                            <p className='unit-title' onMouseEnter={() => showImageHover(true)} onMouseLeave={() => showImageHover(false)}>{props.item.name} ({props.item.caps})</p>
                            <p className='unit-title subtext capitalize'>{props.item.type}, {props.item.category}</p>
                        </div>
                        {count > 0 ? <span>x{count}</span> : <span></span>}
                        <Button variant='secondary' className='material-button' onClick={() => props.addItem(props.item, props.unitIndex)}><span className="material-symbols-outlined">add</span></Button>
                        <img className='hover-item-card' hidden={!viewImage} src={'images/' + props.item.name.toLowerCase().replace(/[^a-zA-z\d()]|\s|-/g, '') + '.png'} alt='item'></img>
                    </div>
                );
            }
        }
     
    }

    let timeoutHandle;

    function showImageHover(value){
        if(value){
            timeoutHandle = setTimeout(() => setViewImage(true), 500);
        }
        else{
            clearTimeout(timeoutHandle);
            setViewImage(false);
        }
    }
   
    return (
      <div className='unit-container'>
        <Entry/>
      </div>
    );
  }
  
  export default Unit;