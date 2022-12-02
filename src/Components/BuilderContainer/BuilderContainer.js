import './BuilderContainer.css';
import ObjectList from '../ObjectList/ObjectList';
import PlayerList from '../PlayerList/PlayerList';
import CardDisplay from '../CardDisplay/CardDisplay';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const BuilderContainer = (props) => {

  const isMobile = window.innerWidth < 800;

  //state and functions for player's list
  const [list, setList] = useState([]);
  const [uniques, setUniques] = useState([]);
  
  function addUnit(unit){
    setList(arr => [...arr, JSON.parse(JSON.stringify(unit))]);
    if(unit.unique) {
      setUniques(arr => [...arr, unit.name]);
    }
    buildImageList(unit);
    toast(unit.name + ' added!');
  }

  function removeUnit(index){
    //remove any unique flags
    if(uniques.includes(list[index].name)) {
      setUniques(arr => arr.filter((name) => name !== list[index].name))
    }

    //loops through all the unit's items to remove any unique
    if(list[index].weapons.length > 0 || list[index].armor > 0 || list[index].mods.length > 0 || list[index].consumables.length > 0 || list[index].perks.length > 0) {
        let items = [...list[index].weapons, ...list[index].armor, ...list[index].mods, ...list[index].consumables, ...list[index].perks]

        for(let item of items) {
          if(uniques.includes(item.name)) {
            setUniques(arr => arr.filter((name) => name !== item.name))
          }
        }
    }

    //remove unit
    setList(arr => arr.filter((unit, unitIndex) => unitIndex !== index));
    
    //reset menu
    if(index === menu.unitIndex && !isMobile){
      openMenu('units', -1);
    }
    else{
      setMenu({
        menuType: 'units',
        unitIndex: -1
      });
    }

    buildImageList(null);
  }

  function deleteList(){
    buildImageList(null);
    setList([]);
    setUniques([]);
    setOpenListDelete(false);
  }
  
  function addHeroic(unitIndex){
    let arr = [...list];
    arr[unitIndex].isHeroic = !arr[unitIndex].isHeroic;

    if(arr[unitIndex].isHeroic){
      arr[unitIndex].caps += 60;
    }
    else{
      arr[unitIndex].caps -= 60;
    }

    setList(arr);
    buildImageList(arr[unitIndex]);
  }

  function addItem(item, unitIndex){
    let arr = [...list];
    
    switch(item.type){
      case 'rifle':
      case 'heavy':
      case 'pistol':
      case 'melee':
      case 'thrown':
        arr[unitIndex].weapons.push(item);
        break;
      case 'armor':
      case 'power armor':
      case 'clothing':
        arr[unitIndex].armor.push(item);
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
        arr[unitIndex].mods.push(item);
        break;
      case 'food':
      case 'alcohol':
      case 'chem':
      case 'gear':
        arr[unitIndex].consumables.push(item);
        break;
      case 'perk':
      case 'leader perk':
        arr[unitIndex].perks.push(item);
        break;
      default:
        break;
    }

    arr[unitIndex].caps += item.caps;
    setList(arr);
    if(item.unique) {
      setUniques(arr => [...arr, item.name]);
    }
    buildImageList(arr[unitIndex]);
    toast(item.name + ' added to ' + arr[unitIndex].name + '!');
  }

  function removeItem(item, unitIndex, itemIndex){
    let arr = [...list];
    
    switch(item.type){
      case 'rifle':
      case 'heavy':
      case 'pistol':
      case 'melee':
      case 'thrown':
        arr[unitIndex].weapons = arr[unitIndex].weapons.filter((weapon, index) => index !== itemIndex);
        break;
      case 'armor':
      case 'power armor':
      case 'clothing':
        arr[unitIndex].armor = arr[unitIndex].armor.filter((armor, index) => index !== itemIndex);
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
        arr[unitIndex].mods = arr[unitIndex].mods.filter((mod, index) => index !== itemIndex);
        break;
      case 'food':
      case 'alcohol':
      case 'chem':
      case 'gear':
        arr[unitIndex].consumables = arr[unitIndex].consumables.filter((consumable, index) => index !== itemIndex);
        break;
      case 'perk':
      case 'leader':
        arr[unitIndex].perks = arr[unitIndex].perks.filter((perk, index) => index !== itemIndex);
        break;
      default:
        break;
    }

    arr[unitIndex].caps -= item.caps;
    setList(arr);
    buildImageList(arr[unitIndex]);
  }

  //state and functions for list type
  const [menu, setMenu] = useState({
    menuType: 'units',
    unitIndex: -1
  });

  function openMenu(type, index){
    setMenu({
      menuType: type,
      unitIndex: index
    });

    if(isMobile){
      mobileToggleObjects();
    }
  }

  //state and functions for displaying card images
  const [imageList, setImageList] = useState(['default.png', 'defaultitem.png', 'defaultitem.png', 'defaultitem.png', 'defaultitem.png', 'defaultitem.png', 'defaultitem.png', 'defaultitem.png', 'defaultitem.png']);

  function buildImageList(unit){
    let arr = [];

    if(unit !== null){
      arr.push(unit.name.toLowerCase().replace(/[^a-zA-z\d()]]|\s|-/g, '') + '.png');

      if(unit.isHeroic){
        arr.push('heroic.png');
      }

      unit.weapons.forEach(item => arr.push(item.name.toLowerCase().replace(/[^a-zA-z\d()]|\s|-/g, '') + '.png'));
      unit.armor.forEach(item => arr.push(item.name.toLowerCase().replace(/[^a-zA-z\d()]|\s|-/g, '') + '.png'));
      unit.mods.forEach(item => arr.push(item.name.toLowerCase().replace(/[^a-zA-z\d()]|\s|-/g, '') + '.png'));
      unit.consumables.forEach(item => arr.push(item.name.toLowerCase().replace(/[^a-zA-z\d()]|\s|-/g, '') + '.png'));
      unit.perks.forEach(item => arr.push(item.name.toLowerCase().replace(/[^a-zA-z\d()]|\s|-/g, '') + '.png'));
    }
    else{
      arr.push('default.png');
    }

    while(arr.length < 9 && !isMobile){
      arr.push('defaultitem.png');
    }

    setImageList(arr);
  }

  function downloadTextList(){
    let listCost = 0;
    list.forEach((unit) => listCost += unit.caps);

    let textList = 'List Total: ' + listCost + ' caps\n\n';

    list.forEach((unit) => {
      textList += unit.name + ' (' + unit.caps + ' caps)\n';
      unit.isHeroic ? textList += '\t-Heroic\n' : textList += '';
      unit.weapons.forEach((item) => textList += '\t-' + item.name + '\n');
      unit.armor.forEach((item) => textList += '\t-' + item.name + '\n');
      unit.mods.forEach((item) => textList += '\t-' + item.name + '\n');
      unit.consumables.forEach((item) => textList += '\t-' + item.name + '\n');
      unit.perks.forEach((item) => textList += '\t-' + item.name + '\n');
    });

    textList += '\n';

    const element = document.createElement('a');
    const file = new Blob([textList], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'fallout-list.txt';
    element.click();
  }

  function mobileToggleImages(){
    let cardDisplay = document.getElementById('cardDisplay');
    let playerDisplay = document.getElementById('playerDisplay');

    cardDisplay.hidden = !cardDisplay.hidden;
    playerDisplay.hidden = !playerDisplay.hidden;
  }

  function mobileToggleObjects(){
    let objectDisplay = document.getElementById('objectDisplay');
    let playerDisplay = document.getElementById('playerDisplay');

    objectDisplay.hidden = !objectDisplay.hidden;
    playerDisplay.hidden = !playerDisplay.hidden;

    if(objectDisplay.hidden){
      setMenu({
        menuType: 'units',
        unitIndex: -1
      });
    }
  }

  const [openListDelete, setOpenListDelete] = useState(false);

  return (
    <div className='container'>
      <div hidden={isMobile} id='objectDisplay'>
        <ObjectList 
        className='mobile-container' 
        list={list} mode={props.mode}
        uniques={uniques}
        menu={menu} isMobile={isMobile} 
        openMenu={openMenu} 
        addUnit={addUnit} 
        addItem={addItem} 
        mobileHideObjects={mobileToggleObjects}/>
      </div>
      <div id='playerDisplay'>
        <PlayerList 
        list={list} 
        isMobile={isMobile} 
        addUnit={addUnit}
        openListDelete={openListDelete} 
        removeUnit={removeUnit}  
        setOpenListDelete={setOpenListDelete}
        openMenu={openMenu} 
        buildImageList={buildImageList} 
        addItem={addItem} 
        removeItem={removeItem} 
        addHeroic={addHeroic} 
        mobileShowObjects={mobileToggleObjects} 
        mobileShowImages={mobileToggleImages} 
        downloadTextList={downloadTextList} 
        deleteList={deleteList}/>
      </div>
      <div hidden={isMobile} id='cardDisplay'>
        <CardDisplay 
        className='mobile-container' 
        list={list} 
        imageList={imageList} 
        isMobile={isMobile} 
        downloadTextList={downloadTextList} 
        mobileHideImages={mobileToggleImages}/>
      </div>
    </div>
  );
}
  
export default BuilderContainer;