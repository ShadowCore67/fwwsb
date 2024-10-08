import './PlayerList.css';
import PlayerUnit from '../PlayerUnit/PlayerUnit.js';
import Button from 'react-bootstrap/Button';
import DeletePopUp from '../DeletePopUp/DeletePopUp';

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
          {!props.isMobile ? <span className='dummy'>dummy</span> : <></>}
          <span className='bar-item'>{listCost} caps</span>
          {props.isMobile ? <Button className='add-unit-button material-button' onClick={() => props.mobileShowObjects()}><span className="material-symbols-outlined">add</span></Button> : <></>}
          {props.isMobile ? <Button className='material-button' onClick={() => props.downloadTextList()}><span className="material-symbols-outlined">download</span></Button> : <></>}
          <Button variant='danger' className='mobile-button delete' disabled={props.list.length === 0} onClick={() => props.setOpenListDelete(true)}><span className="material-symbols-outlined">delete</span></Button>
        </div>
        {props.list.length > 0 ? unitList : 
        <div>
          {props.isMobile ? <p className='empty-message'>Press the + to begin adding units to your squad!</p> : <p className='empty-message'>Add units to your squad!</p>}
        </div>}
        <DeletePopUp openDelete={props.openListDelete} setOpenListDelete={props.setOpenListDelete} deleteList={props.deleteList} unitName={''}/>
      </div>
    );
}
  
export default PlayerList;