import './ObjectList.css';
import Unit from '../Unit/Unit.js';
import SearchBar from '../SearchBar/SearchBar';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

const ObjectList = (props) => {
    //These arrays are temporary for testing only until API is created
     let testUnits = [
        {
            name: 'Knight',
            caps: 62,
            card: 'knight.png',
            isHeroic: false,
            factions: ['Brotherhood of Steel'],
            upgradeCategories: ['upgrades', 'high tech', 'advanced', 'usable', 'power armor'],
            weapons: [],
            armor: [],
            mods: [],
            consumables: [],
            perks: []
        },
        {
            name: 'Hellfire Trooper',
            caps: 108,
            card: 'hellfire.png',
            isHeroic: false,
            factions: ['Enclave'],
            upgradeCategories: ['upgrades', 'high tech', 'usable', 'power armor'],
            weapons: [],
            armor: [],
            mods: [],
            consumables: [],
            perks: []
        },
        {
            name: 'Sole Survivor',
            caps: 107,
            card: 'solesurvivor.png',
            isHeroic: false,
            factions: ['Survivors', 'Brotherhood of Steel', 'Institute'],
            upgradeCategories: ['upgrades', 'wasteland', 'high tech', 'advanced', 'usable', 'power armor'],
            weapons: [],
            armor: [],
            mods: [],
            consumables: [],
            perks: []
        }
    ];

    let testWeapons = [
        {
            name: 'Laser Rifle',
            type: 'rifle',
            category: 'high tech',
            caps: 30,
            card: 'laserrifle.png'
        },
        {
            name: 'Assault Rifle',
            type: 'rifle',
            category: 'advanced',
            caps: 8,
            card: 'assaultrifle.png'
        },
        {
            name: 'Pipe Pistol',
            type: 'pistol',
            category: 'wasteland',
            caps: 2,
            card: 'pipepistol.png'
        }
    ];

    let testArmor = [
        {
            name: 'Combat Armor',
            type: 'armor',
            category: 'advanced',
            caps: 13,
            card: 'combatarmor.png'
        },
        {
            name: 'T-45 Power Armor',
            type: 'power armor',
            category: 'power armor',
            caps: 38,
            card: 't45powerarmor.png'
        }
    ];

    let testMods = [
        {
            name: 'Sensor Array',
            type: 'power armor mod',
            category: 'upgrades',
            caps: 12,
            card: 'sensorarray.png'
        },
        {
            name: 'Reflex Sights',
            type: 'rifle mod',
            category: 'upgrades',
            caps: 10,
            card: 'reflexsights.png'
        }
    ];

    let testConsumables = [
        {
            name: 'Stimpak',
            type: 'chem',
            category: 'usable',
            caps: 28,
            card: 'stimpak.png'
        },
        {
            name: 'Nuka Cola',
            type: 'food',
            category: 'usable',
            caps: 15,
            card: 'nukacola.png'
        }
    ];

    let testPerks = [
        {
            name: 'Huntsman',
            type: 'perk',
            category: 'upgrades',
            caps: 7,
            card: 'huntsman.png'
        },
        {
            name: 'Rifleman',
            type: 'perk',
            category: 'upgrades',
            caps: 5,
            card: 'rifleman.png'
        }
    ];

    const [faction, setFaction] = useState('');
    const [searchString, setSearchString] = useState('');
    const [category, setCategory] = useState('');

    let list;
    switch(props.menu.menuType){
        case 'units':
            list = testUnits.filter((unit) => (unit.factions.includes(faction) || faction === '') && (searchString === '' || unit.name.toLowerCase().includes(searchString.toLowerCase()))).map((unit, index) => <Unit type='unit' unit={unit} key={index} addUnit={props.addUnit} setFileName={props.setFileName}/>);
            break;
        case 'weapons':
            list = testWeapons.filter((weapon) => props.list[props.menu.unitIndex].upgradeCategories.includes(weapon.category)).map((item, index) => <Unit type='item' item={item} key={index} unitIndex={props.menu.unitIndex} addItem={props.addItem} setFileName={props.setFileName}/>);
            break;
        case 'armor':
            list = testArmor.filter((armor) => props.list[props.menu.unitIndex].upgradeCategories.includes(armor.category)).map((item, index) => <Unit type='item' item={item} key={index} unitIndex={props.menu.unitIndex} addItem={props.addItem} setFileName={props.setFileName}/>);
            break;
        case 'mods':
            list = testMods.filter((mod) => props.list[props.menu.unitIndex].upgradeCategories.includes(mod.category)).map((item, index) => <Unit type='item' item={item} key={index} unitIndex={props.menu.unitIndex} addItem={props.addItem} setFileName={props.setFileName}/>);
            break;
        case 'consumables':
            list = testConsumables.filter((consumable) => props.list[props.menu.unitIndex].upgradeCategories.includes(consumable.category)).map((item, index) => <Unit type='item' item={item} key={index} unitIndex={props.menu.unitIndex} addItem={props.addItem} setFileName={props.setFileName}/>);
            break;
        case 'perks':
            list = testPerks.filter((perk) => props.list[props.menu.unitIndex].upgradeCategories.includes(perk.category)).map((item, index) => <Unit type='item' item={item} key={index} unitIndex={props.menu.unitIndex} addItem={props.addItem} setFileName={props.setFileName}/>);
            break;
        case 'all':
            let items = [...testWeapons.filter((weapon) => props.list[props.menu.unitIndex].upgradeCategories.includes(weapon.category)),
                        ...testArmor.filter((armor) => props.list[props.menu.unitIndex].upgradeCategories.includes(armor.category)),
                        ...testMods.filter((mod) => props.list[props.menu.unitIndex].upgradeCategories.includes(mod.category)),
                        ...testConsumables.filter((consumable) => props.list[props.menu.unitIndex].upgradeCategories.includes(consumable.category)),
                        ...testPerks.filter((perk) => props.list[props.menu.unitIndex].upgradeCategories.includes(perk.category))];
            list = items.filter((item) => (item.type === category || category === '') && (searchString === '' || item.name.toLowerCase().includes(searchString.toLowerCase()))).map((item, index) => <Unit type='item' item={item} key={index} unitIndex={props.menu.unitIndex} addItem={props.addItem} setFileName={props.setFileName}/>);
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
            <Button hidden={!props.isMobile} variant='secondary' className='return-button' onClick={() => props.mobileHideObjects()}>Return to List</Button>
            <SearchBar unitFilter={unitFilter} filterCategory={setCategory} filterFaction={setFaction} search={setSearchString}/>
            {itemBar}
            {list}  
        </div>
    );
  }
  
  export default ObjectList;