import './PlayerList.css';
import PlayerUnit from '../PlayerUnit/PlayerUnit.js';
import Button from 'react-bootstrap/Button';

const PlayerList = (props) => {
    const unitList = props.list.map((unit, index) => 
    <PlayerUnit 
    type='remove' 
    unit={unit} 
    key={index} 
    unitIndex={index}
    isMobile={props.isMobile}
    addUnit={props.addUnit}
    removeUnit={props.removeUnit} 
    openMenu={props.openMenu} 
    buildImageList={props.buildImageList}
    removeItem={props.removeItem}
    addHeroic={props.addHeroic}
    mobileShowImages={props.mobileShowImages}
    />);

    let listCost = 0;
    for(let unit of props.list){
      listCost += unit.caps;
    }

    return (
      <div className='grid-item'>
        <div className='caps-bar'>
          <span className='bar-item'>{listCost} caps</span>
          <Button variant='secondary' className='add-unit-button mobile-button' onClick={() => props.mobileShowObjects()}>Add Units</Button>
        </div>
        {unitList}
      </div>
    );
}
  
export default PlayerList;