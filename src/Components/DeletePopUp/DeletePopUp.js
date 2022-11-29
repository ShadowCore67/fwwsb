import './DeletePopUp.css';
import React from 'react';
import { Button } from 'react-bootstrap';

const DeletePopUp = (props) => {
    return (
        <div hidden={props.openDelete} className='outer-delete-div'>
            {props.unitName !== '' ? 
                <div className='inner-delete-div'>
                    <p className='delete-text'>Are you sure you want to delete {props.unitName}?</p>
                    <div className='delete-button-div'>
                        <Button className="pop-up-button" onClick={() => props.removeUnit(props.index)}>Yes</Button>
                        <Button className="pop-up-button" onClick={() => props.openDeleteDialog(false)}>No</Button>
                    </div>
                </div> :
                <div className='inner-delete-div'>
                    <p className='delete-text'>Are you sure you want to delete your list?</p>
                    <div className='delete-button-div'>
                        <Button className="pop-up-button" onClick={() => props.deleteList()}>Yes</Button>
                        <Button className="pop-up-button" onClick={() => props.openDeleteDialog(false)}>No</Button>
                    </div>
                </div>
            }
        </div>
    )
}

export default DeletePopUp
