import './PlayerUnit.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import MobilePopUp from '../MobilePopUp/MobilePopUp';
import { useState } from 'react';

const PlayerUnit = (props) => {

    function copyUnit(unit){
        let newUnit = {
            name: unit.name,
            caps: unit.caps,
            card: unit.card,
            isHeroic: unit.isHeroic,
            factions: [...unit.factions],
            upgradeCategories: [...unit.upgradeCategories],
            weapons: [...unit.weapons],
            armor: [...unit.armor],
            mods: [...unit.mods],
            consumables: [...unit.consumables],
            perks: [...unit.perks]
        }

        props.addUnit(newUnit);
    }

    const weapons = props.unit.weapons.map((item, itemIndex) => {
        if(item.caps !== 0){
            return (
                <div className='item' key={itemIndex}>
                    <span>{item.name} ({item.caps})</span>
                    <div className='remove-item-container'>
                        <span className='remove-item' onClick={() => props.removeItem(item, props.unitIndex, itemIndex)}>X</span>
                    </div>
                </div>
            );
        }
        else{
            return (
                <div className='item' key={itemIndex}>
                    <span>{item.name}</span>
                </div>
            );
        }
    });

    const armor = props.unit.armor.map((item, itemIndex) => {
        if(item.caps !== 0){
            return (
                <div className='item' key={itemIndex}>
                    <span>{item.name} ({item.caps})</span>
                    <div className='remove-item-container'>
                        <span className='remove-item' onClick={() => props.removeItem(item, props.unitIndex, itemIndex)}>X</span>
                    </div>
                </div>
            );
        }
        else{
            return (
                <div className='item' key={itemIndex}>
                    <span>{item.name}</span>
                </div>
            );
        }
    });

    const mods = props.unit.mods.map((item, itemIndex) => {
        if(item.caps !== 0){
            return (
                <div className='item' key={itemIndex}>
                    <span>{item.name} ({item.caps})</span>
                    <div className='remove-item-container'>
                        <span className='remove-item' onClick={() => props.removeItem(item, props.unitIndex, itemIndex)}>X</span>
                    </div>
                </div>
            );
        }
        else{
            return (
                <div className='item' key={itemIndex}>
                    <span>{item.name}</span>
                </div>
            );
        }
    });

    const consumables = props.unit.consumables.map((item, itemIndex) => {
        if(item.caps !== 0){
            return (
                <div className='item' key={itemIndex}>
                    <span>{item.name} ({item.caps})</span>
                    <div className='remove-item-container'>
                        <span className='remove-item' onClick={() => props.removeItem(item, props.unitIndex, itemIndex)}>X</span>
                    </div>
                </div>
            );
        }
        else{
            return (
                <div className='item' key={itemIndex}>
                    <span>{item.name}</span>
                </div>
            );
        }
    });

    const perks = props.unit.perks.map((item, itemIndex) => {
        if(item.caps !== 0){
            return (
                <div className='item' key={itemIndex}>
                    <span>{item.name} ({item.caps})</span>
                    <div className='remove-item-container'>
                        <span className='remove-item' onClick={() => props.removeItem(item, props.unitIndex, itemIndex)}>X</span>
                    </div>
                </div>
            );
        }
        else{
            return (
                <div className='item' key={itemIndex}>
                    <span>{item.name}</span>
                </div>
            );
        }
    });

    const [trigger, setTrigger] = useState(false);

    return (
      <div className='unit-container'>
        <div className='player-unit'>
            <div className='unit-title d-flex align-items-center'>
                <span className='unit-name' onClick={() => props.buildImageList(props.unit)}>{props.unit.name} ({props.unit.caps})</span>
                <Form.Check className='checkbox' type='checkbox' label='Heroic' value={props.unit.isHeroic} onChange={() => props.addHeroic(props.unitIndex)}/>
            </div>
            <Button hidden={!props.isMobile} className='material-button' onClick={() => setTrigger(!trigger)}><span className="material-symbols-outlined">more_horiz</span></Button>
            <MobilePopUp trigger={trigger} setTrigger={setTrigger}>
                <div className='pop-up-item' onClick={() => {props.buildImageList(props.unit); props.mobileShowImages();}}>View</div>
                <div className='pop-up-item' onClick={() => copyUnit(props.unit)}>Copy</div>
                <div className='pop-up-item' onClick={() => props.removeUnit(props.unitIndex)}>Delete</div>
            </MobilePopUp>
            <Button hidden={props.isMobile} variant='danger' className='side-button' onClick={() => props.removeUnit(props.unitIndex)}><span className="material-symbols-outlined">delete</span></Button>
            <Button hidden={props.isMobile} className='upgrade-button' onClick={() => props.openMenu('weapons', props.unitIndex)}>Weapons</Button>
            <Button hidden={props.isMobile} className='upgrade-button' onClick={() => props.openMenu('armor', props.unitIndex)}>Armor</Button>
            <Button hidden={props.isMobile} className='upgrade-button' onClick={() => props.openMenu('mods', props.unitIndex)}>Mods</Button>
            <Button hidden={props.isMobile} className='upgrade-button' onClick={() => props.openMenu('consumables', props.unitIndex)}>Gear & Usables</Button>
            <Button hidden={props.isMobile} className='upgrade-button' onClick={() => props.openMenu('perks', props.unitIndex)}>Perks</Button>
            <Button hidden={props.isMobile} className='side-button material-button' onClick={() => copyUnit(props.unit)}><span className="material-symbols-outlined">content_copy</span></Button>
            <Button hidden={!props.isMobile} className='upgrade-button' onClick={() => props.openMenu('all', props.unitIndex)}>Add Items</Button>
            <div className='item-container'>
                {weapons}
            </div>
            <div className='item-container'>
                {armor}
            </div>
            <div className='item-container'>
                {mods}
            </div>
            <div className='item-container'>
                {consumables}
            </div>
            <div className='item-container'>
                {perks}
            </div>
        </div>
      </div>
    );
  }
  
  export default PlayerUnit;