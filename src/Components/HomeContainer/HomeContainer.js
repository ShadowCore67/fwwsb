import React from 'react';
import './HomeContainer.css';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import SquadList from '../SquadList/SquadList';

const HomeContainer = (props) => {

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
        <div className='home-container'>
            <div className='build-select'>
                <Button>Create Squad</Button>
            </div>
            <div className="home-item">
                <SquadList userId={props.userId}/>
            </div>
            {/* {profile ? 
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
            />} */}
        </div>
    );
}

export default HomeContainer;