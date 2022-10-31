import './Unit.css';
import Button from 'react-bootstrap/Button';

const Unit = (props) => {
    let count = 0;

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
            return (
                <div className='object'>
                    <span>{props.unit.name} ({props.unit.caps})</span>
                    {count > 0 ? <span>x{count}</span> : <span></span>}
                    <Button variant='secondary' className='material-button' onClick={() => props.addUnit(props.unit)}><span className="material-symbols-outlined">add</span></Button>
                </div>
            );
        }
        else{
            return (
                <div className='object'>
                    <span>{props.item.name} ({props.item.caps})</span>
                    {count > 0 ? <span>x{count}</span> : <span></span>}
                    <Button variant='secondary' className='material-button' onClick={() => props.addItem(props.item, props.unitIndex)}><span className="material-symbols-outlined">add</span></Button>
                </div>
            );
        }
     
    }
   
    return (
      <div className='unit-container'>
        <Entry/>
      </div>
    );
  }
  
  export default Unit;