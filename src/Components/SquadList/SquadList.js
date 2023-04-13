import React, { useEffect, useState } from 'react';
import Squad from '../Squad/Squad';

const SquadList = (props) => {

    const [squads, setSquads] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/squads?userId=3") //CHANGE THIS TO TAKE USERID
            .then((response) => response.json())
            .then((data) => setSquads(data));
    }, []);

    let squadList = squads.map((squad, index) => <Squad squad={squad}/>);

    return (
        <div>
            {squadList}
        </div>
    );
}

export default SquadList;