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
            case 'rifle mod,pistol mod':
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
                        <div onClick={() => setViewImage(true)}>
                            <p className='unit-title'>{props.unit.name} ({props.unit.caps})</p>
                            <p className='unit-title subtext'>{props.unit.factions.toString().replace(/,/g, ', ')}{props.unit.unique ? <span>, Unique</span> : <></>}</p>
                        </div>
                        {count > 0 ? <span>x{count}</span> : <span></span>}
                        <Button variant='secondary' className='material-button' onClick={() => props.addUnit(props.unit)} disabled={props.uniques.includes(props.unit.name)}><span className="material-symbols-outlined">add</span></Button>
                        <img onClick={() => setViewImage(false)} className='hover-card' hidden={!viewImage} src={'images/' + props.unit.name.toLowerCase().replace(/[^a-zA-z\d()]|\s|-/g, '') + '.png'} alt='unit'></img>
                    </div>
                );
            }
            else {
                return (
                    <div className='object'>
                        <div onMouseEnter={() => showImageHover(true)} onMouseLeave={() => showImageHover(false)}>
                            <p className='unit-title'>{props.unit.name} ({props.unit.caps})</p>
                            <p className='unit-title subtext'>{props.unit.factions.toString().replace(/,/g, ', ')}{props.unit.unique ? <span>, Unique</span> : <></>}</p>
                        </div>
                        {count > 0 ? <span>x{count}</span> : <span></span>}
                        <Button variant='secondary' className='material-button' onClick={() => props.addUnit(props.unit)} disabled={props.uniques.includes(props.unit.name)}><span className="material-symbols-outlined">add</span></Button>
                        <img className='hover-card' hidden={!viewImage} src={'images/' + props.unit.name.toLowerCase().replace(/[^a-zA-z\d()]|\s|-/g, '') + '.png'} alt='unit'></img>
                    </div>
                );
            }
        }
        else{
            if(props.isMobile) {
                return (
                    <div className='object'>
                        <div onClick={() => setViewImage(true)}>
                            <p className='unit-title'>{props.item.name} ({props.item.caps})</p>
                            <p className='unit-title subtext capitalize'>{props.item.type.toString().replace(/,/g, ', ')}, {props.item.category}{props.item.unique ? <span>, Unique</span> : <></>}</p>
                        </div>
                        {count > 0 ? <span>x{count}</span> : <span></span>}
                        <Button variant='secondary' className='material-button' onClick={() => props.addItem(props.item, props.unitIndex)} disabled={props.uniques.includes(props.item.name)}><span className="material-symbols-outlined">add</span></Button>
                        <img onClick={() => setViewImage(false)} className='hover-item-card' hidden={!viewImage} src={'images/' + props.item.name.toLowerCase().replace(/[^a-zA-z\d()]|\s|-/g, '') + '.png'} alt='item'></img>
                    </div>
                );
            }
            else {
                return (
                    <div className='object'>
                        <div onMouseEnter={() => showImageHover(true)} onMouseLeave={() => showImageHover(false)}>
                            <p className='unit-title'>{props.item.name} ({props.item.caps})</p>
                            <p className='unit-title subtext capitalize'>{props.item.type.toString().replace(/,/g, ', ')}, {props.item.category}{props.item.unique ? <span>, Unique</span> : <></>}</p>
                        </div>
                        {count > 0 ? <span>x{count}</span> : <span></span>}
                        <Button variant='secondary' className='material-button' onClick={() => props.addItem(props.item, props.unitIndex)} disabled={props.uniques.includes(props.item.name)}><span className="material-symbols-outlined">add</span></Button>
                        <img className='hover-item-card' hidden={!viewImage} src={'images/' + props.item.name.toLowerCase().replace(/[^a-zA-z\d()]|\s|-/g, '') + '.png'} alt='item'></img>
                    </div>
                );
            }
        }
     
    }

    let timeoutHandle;

    function showImageHover(value){
        if(value){
            timeoutHandle = setTimeout(() => setViewImage(true), 300);
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