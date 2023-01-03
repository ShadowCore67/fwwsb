import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

const HomeContainer = () => {

    const clientId = '210523392335-i9hsmtm8uvcvukr9vifi1kvduo219e7i.apps.googleusercontent.com';

    const [profile, setProfile] = useState();

    useEffect(() => {
        const initClient = () => {
              gapi.client.init({
              clientId: clientId,
              scope: ''
            });
         };
         gapi.load('client:auth2', initClient);
    });

    function saveTest() {
        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({squadId: null, name: 'test squad', type: 'battle', caps: 69, userId: 3, units: [
        //         {
        //             unitId: 12,
        //             name: 'wqefwf',
        //             caps: 0,
        //             card: 'fwfwfe',
        //             heroic: true,
        //             factions: [],
        //             itemCategories: [],
        //             items: [
        //                 {
        //                     itemId: 99,
        //                     quantity: 3
        //                 },
        //                 {
        //                     itemId: 104,
        //                     quantity: 1
        //                 },
        //             ]
        //         },
        //         {
        //             unitId: 17,
        //             name: 'llllll',
        //             caps: 0,
        //             card: 'fwfwfe',
        //             heroic: false,
        //             factions: [],
        //             itemCategories: [],
        //             items: [
        //                 {
        //                     itemId: 117,
        //                     quantity: 1
        //                 }
        //             ]
        //         },
        //     ]})
        // };

        fetch('http://localhost:8080/squad?userId=3&squadId=13', {method: 'GET', headers: { 'Content-Type': 'application/json' }});

    }

    const onSuccess = (res) => {
        // console.log('success:', res.getAuthResponse().id_token);
        setProfile(res.profileObj);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: res.tokenId
        };
        fetch('http://localhost:8080/user', requestOptions)
            .then(response => response.json());

    };
    const onFailure = (err) => {
        console.log('failed:', err);
    };

    return (
        <div>
            <p>HomeContainer</p>
            {profile ? 
            <div>
                <p>{profile.givenName}</p>
                <Button onClick={() => saveTest()}>Do something!</Button>
            </div> : 
            <GoogleLogin 
                clientId={clientId} 
                buttonText='Sign In' 
                onSuccess={onSuccess} 
                onFailure={onFailure} 
                cookiePolicy={'single_host_origin'} 
                isSignedIn={true}
            />}
        </div>
    );
}

export default HomeContainer;
