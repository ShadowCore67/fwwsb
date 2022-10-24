import './ObjectList.css';
import Unit from '../Unit/Unit.js';
import SearchBar from '../SearchBar/SearchBar';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';

const ObjectList = (props) => {
    const [units, setUnits] = useState([]);
    const [items, setItems] = useState([]);
    const [faction, setFaction] = useState('');
    const [searchString, setSearchString] = useState('');
    const [type, setType] = useState('');

    useEffect(() => {
        fetch("http://localhost:8080/units")
            .then((response) => response.json())
            .then((data) => setUnits(data));

        fetch("http://localhost:8080/items")
            .then((response) => response.json())
            .then((data) => setItems(data));
    }, []);

    const weapons = ['rifle', 'pistol', 'heavy', 'melee', 'thrown'];
    const armors = ['armor', 'clothing', 'power armor'];
    const mods = ['rifle mod', 'pistol mod', 'melee mod', 'armor mod', 'power armor mod'];
    const consumables = ['food', 'alcohol', 'chem', 'gear'];
    const perks = ['perk', 'leader perk'];

    let list;
    switch(props.menu.menuType){
        case 'units':
            list = units.filter((unit) => (unit.factions.includes(faction) || faction === '') && (searchString === '' || unit.name.toLowerCase().includes(searchString.toLowerCase()))).map((unit, index) => <Unit type='unit' unit={unit} key={index} addUnit={props.addUnit} setFileName={props.setFileName}/>);
            break;
        case 'weapons':
            list = items.filter((weapon) => weapons.includes(weapon.type) && props.list[props.menu.unitIndex].itemCategories.includes(weapon.category)).map((item, index) => <Unit type='item' item={item} key={index} unitIndex={props.menu.unitIndex} addItem={props.addItem} setFileName={props.setFileName}/>);
            break;
        case 'armor':
            list = items.filter((armor) => armors.includes(armor.type) && props.list[props.menu.unitIndex].itemCategories.includes(armor.category)).map((item, index) => <Unit type='item' item={item} key={index} unitIndex={props.menu.unitIndex} addItem={props.addItem} setFileName={props.setFileName}/>);
            break;
        case 'mods':
            list = items.filter((mod) => mods.includes(mod.type) && props.list[props.menu.unitIndex].itemCategories.includes(mod.category)).map((item, index) => <Unit type='item' item={item} key={index} unitIndex={props.menu.unitIndex} addItem={props.addItem} setFileName={props.setFileName}/>);
            break;
        case 'consumables':
            list = items.filter((consumable) => consumables.includes(consumable.type) && props.list[props.menu.unitIndex].itemCategories.includes(consumable.category)).map((item, index) => <Unit type='item' item={item} key={index} unitIndex={props.menu.unitIndex} addItem={props.addItem} setFileName={props.setFileName}/>);
            break;
        case 'perks':
            list = items.filter((perk) => perks.includes(perk.type) && props.list[props.menu.unitIndex].itemCategories.includes(perk.category)).map((item, index) => <Unit type='item' item={item} key={index} unitIndex={props.menu.unitIndex} addItem={props.addItem} setFileName={props.setFileName}/>);
            break;
        case 'all':
            list = items.filter((item) => (props.list[props.menu.unitIndex].itemCategories.includes(item.category)) && (item.type === type || type === '') && (searchString === '' || item.name.toLowerCase().includes(searchString.toLowerCase()))).map((item, index) => <Unit type='item' item={item} key={index} unitIndex={props.menu.unitIndex} addItem={props.addItem} setFileName={props.setFileName}/>);
            break;
        default:
            break;
    }

    let itemBar;

    if(props.menu.menuType !== 'units' && !props.isMobile){
        itemBar = <div className='return-div'><Button variant='secondary' className='return-button' onClick={() => props.openMenu('units', -1)}>Return To Unit Selection</Button></div>;
    }
    else{
        itemBar = <div></div>
    }

    let unitFilter = true;
    if(props.menu.menuType === 'all'){
        unitFilter = false;
    }

    return (
        <div className='grid-item'>
            <Button hidden={!props.isMobile} variant='secondary' className='return-button w-100' onClick={() => props.mobileHideObjects()}>Return to List</Button>
            <SearchBar unitFilter={unitFilter} filterType={setType} filterFaction={setFaction} search={setSearchString}/>
            {itemBar}
            {list}  
        </div>
    );
  }
  
  export default ObjectList;