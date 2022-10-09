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

    const weapons = props.unit.weapons.map((weapon, itemIndex) => 
        <div className='item' key={itemIndex}>
            <span>{weapon.name} ({weapon.caps})</span>
            <div className='remove-item-container'>
                <span className='remove-item' onClick={() => props.removeItem(weapon, props.unitIndex, itemIndex)}>X</span>
            </div>
        </div>
        
    );

    const armor = props.unit.armor.map((armor, itemIndex) => 
        <div className='item' key={itemIndex}>
            <span>{armor.name} ({armor.caps})</span>
            <div className='remove-item-container'>
                <span className='remove-item' onClick={() => props.removeItem(armor, props.unitIndex, itemIndex)}>X</span>
            </div>
        </div>
    );

    const mods = props.unit.mods.map((mod, itemIndex) => 
        <div className='item' key={itemIndex}>
            <span>{mod.name} ({mod.caps})</span>
            <div className='remove-item-container'>
                <span className='remove-item' onClick={() => props.removeItem(mod, props.unitIndex, itemIndex)}>X</span>
            </div>
        </div>
    );

    const consumables = props.unit.consumables.map((consumable, itemIndex) => 
        <div className='item' key={itemIndex}>
            <span>{consumable.name} ({consumable.caps})</span>
            <div className='remove-item-container'>
                <span className='remove-item' onClick={() => props.removeItem(consumable, props.unitIndex, itemIndex)}>X</span>
            </div>
        </div>
    );

    const perks = props.unit.perks.map((perk, itemIndex) => 
        <div className='item' key={itemIndex}>
            <span>{perk.name} ({perk.caps})</span>
            <div className='remove-item-container'>
                <span className='remove-item' onClick={() => props.removeItem(perk, props.unitIndex, itemIndex)}>X</span>
            </div>
        </div>
    );

    const [trigger, setTrigger] = useState(false);

    return (
      <div className='unit-container'>
        <div className='player-unit'>
            <div className='unit-title d-flex align-items-center'>
                <span className='unit-name' onClick={() => props.buildImageList(props.unit)}>{props.unit.name} ({props.unit.caps})</span>
                <Form.Check className='checkbox' type='checkbox' label='Heroic' value={props.unit.isHeroic} onChange={() => props.addHeroic(props.unitIndex)}/>
            </div>
            <Button hidden={!props.isMobile} variant='secondary' className='more-button' onClick={() => setTrigger(!trigger)}><span className="material-symbols-outlined">more_horiz</span></Button>
            <MobilePopUp trigger={trigger} setTrigger={setTrigger}>
                <div className='pop-up-item' onClick={() => {props.buildImageList(props.unit); props.mobileShowImages();}}>View</div>
                <div className='pop-up-item' onClick={() => copyUnit(props.unit)}>Copy</div>
                <div className='pop-up-item' onClick={() => props.removeUnit(props.unitIndex)}>Delete</div>
            </MobilePopUp>
            <Button hidden={props.isMobile} variant='danger' className='side-button' onClick={() => props.removeUnit(props.unitIndex)}><span className="material-symbols-outlined">delete</span></Button>
            <Button hidden={props.isMobile} variant='secondary' className='upgrade-button' onClick={() => props.openMenu('weapons', props.unitIndex)}>Weapons</Button>
            <Button hidden={props.isMobile} variant='secondary' className='upgrade-button' onClick={() => props.openMenu('armor', props.unitIndex)}>Armor</Button>
            <Button hidden={props.isMobile} variant='secondary' className='upgrade-button' onClick={() => props.openMenu('mods', props.unitIndex)}>Mods</Button>
            <Button hidden={props.isMobile} variant='secondary' className='upgrade-button' onClick={() => props.openMenu('consumables', props.unitIndex)}>Consumables</Button>
            <Button hidden={props.isMobile} variant='secondary' className='upgrade-button' onClick={() => props.openMenu('perks', props.unitIndex)}>Perks</Button>
            <Button hidden={props.isMobile} variant='secondary' className='side-button' onClick={() => copyUnit(props.unit)}><span className="material-symbols-outlined">content_copy</span></Button>
            <Button hidden={!props.isMobile} variant='secondary' className='upgrade-button' onClick={() => props.openMenu('all', props.unitIndex)}>Add Items</Button>
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