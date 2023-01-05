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
        fetch("https://fwwsb-api-v4ip2.ondigitalocean.app/units")
            .then((response) => response.json())
            .then((data) => setUnits(data));

        fetch("https://fwwsb-api-v4ip2.ondigitalocean.app/items")
            .then((response) => response.json())
            .then((data) => setItems(data));
    }, []);

    // useEffect(() => {
    //     fetch("http://localhost:8080/units")
    //         .then((response) => response.json())
    //         .then((data) => setUnits(data));

    //     fetch("http://localhost:8080/items")
    //         .then((response) => response.json())
    //         .then((data) => setItems(data));
    // }, []);

    const weapons = ['rifle', 'pistol', 'heavy', 'melee', 'thrown'];
    const armors = ['armor', 'clothing', 'power armor'];
    const mods = ['rifle mod', 'pistol mod', 'rifle mod,pistol mod', 'melee mod', 'armor mod', 'power armor mod', 'robot mod', 'creature mod'];
    const usables = ['food', 'alcohol', 'chem', 'gear'];
    const perks = ['perk', 'leader'];

    function filterItems(items, item) {
        return (items.includes(item.type) && 
                props.list[props.menu.unitIndex].itemCategories.includes(item.category)) && 
                (item.type.includes(type) || type === '') && 
                (searchString === '' || item.name.toLowerCase().includes(searchString.toLowerCase()));
    }

    let list;
    switch(props.menu.menuType){
        case 'units':
            list = units.filter((unit) => (unit.factions.includes(faction) || faction === '') && (searchString === '' || unit.name.toLowerCase().includes(searchString.toLowerCase()))).map((unit, index) => <Unit type='unit' unit={unit} key={index} list={props.list} addUnit={props.addUnit} setFileName={props.setFileName} isMobile={props.isMobile} uniques={props.uniques}/>);
            break;
        case 'weapons':
            list = items.filter((weapon) => filterItems(weapons, weapon)).map((item, index) => <Unit type='item' item={item} key={index} unitIndex={props.menu.unitIndex} list={props.list} addItem={props.addItem} setFileName={props.setFileName} isMobile={props.isMobile} uniques={props.uniques}/>);
            break;
        case 'armor':
            list = items.filter((armor) => filterItems(armors, armor)).map((item, index) => <Unit type='item' item={item} key={index} unitIndex={props.menu.unitIndex} list={props.list} addItem={props.addItem} setFileName={props.setFileName} isMobile={props.isMobile} uniques={props.uniques}/>);
            break;
        case 'mods':
            list = items.filter((mod) => filterItems(mods, mod)).map((item, index) => <Unit type='item' item={item} key={index} unitIndex={props.menu.unitIndex} list={props.list} addItem={props.addItem} setFileName={props.setFileName} isMobile={props.isMobile} uniques={props.uniques}/>);
            break;
        case 'consumables':
            list = items.filter((usable) => filterItems(usables, usable)).map((item, index) => <Unit type='item' item={item} key={index} unitIndex={props.menu.unitIndex} list={props.list} addItem={props.addItem} setFileName={props.setFileName} isMobile={props.isMobile} uniques={props.uniques}/>);
            break;
        case 'perks':
            list = items.filter((perk) => filterItems(perks, perk)).map((item, index) => <Unit type='item' item={item} key={index} unitIndex={props.menu.unitIndex} list={props.list} addItem={props.addItem} setFileName={props.setFileName} isMobile={props.isMobile} uniques={props.uniques}/>);
            break;
        case 'all':
            list = items.filter((item) => (props.list[props.menu.unitIndex].itemCategories.includes(item.category)) && (item.type.includes(type) || type === '') && (searchString === '' || item.name.toLowerCase().includes(searchString.toLowerCase()))).map((item, index) => <Unit type='item' item={item} key={index} unitIndex={props.menu.unitIndex} list={props.list} addItem={props.addItem} setFileName={props.setFileName} isMobile={props.isMobile} uniques={props.uniques}/>);
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
    if(props.menu.menuType !== 'units'){
        unitFilter = false;
    }

    return (
        <div className='grid-item'>
            <Button hidden={!props.isMobile} variant='secondary' className='return-button sticky-top w-100' onClick={() => props.mobileHideObjects()}>Return to List</Button>
            <SearchBar unitFilter={unitFilter} filterType={setType} filterFaction={setFaction} search={setSearchString} menuType={props.menu.menuType}/>
            {itemBar}
            {list}  
        </div>
    );
  }
  
  export default ObjectList;