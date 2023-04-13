import './Header.css';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

const Header = () => {

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
    <header className="header">
      <a href='/' className='title'>Fallout: Wasteland Warfare Squad Builder</a>
      <div className='button-div'>
        {profile ? 
            <Button className='header-button'>Logout</Button>: 
            <GoogleLogin
                className='header-button'
                clientId={clientId} 
                buttonText='Sign In' 
                onSuccess={onSuccess} 
                onFailure={onFailure} 
                cookiePolicy={'single_host_origin'} 
                isSignedIn={true}
            />}
      </div>
    </header>
  );
}
  
export default Header;