import './Unit.css';
import Button from 'react-bootstrap/Button';

const Unit = (props) => {
    function Entry(){
        if(props.type === 'unit'){
            return (
                <div className='object'>
                    <span>{props.unit.name} ({props.unit.caps})</span>
                    <Button variant='secondary' className='material-button' onClick={() => props.addUnit(props.unit)}><span className="material-symbols-outlined">add</span></Button>
                </div>
            );
        }
        else{
            return (
                <div className='object'>
                    <span>{props.item.name} ({props.item.caps})</span>
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