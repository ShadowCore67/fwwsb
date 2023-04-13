import './App.css';
import Header from './Components/Header/Header.js';
import BuilderContainer from './Components/BuilderContainer/BuilderContainer';
import GameModeSelect from './Components/GameModeSelect/GameModeSelect';
import HomeContainer from './Components/HomeContainer/HomeContainer';
import { Toaster } from 'react-hot-toast';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from 'react';




const App = () => {

  const [userId, setUserId] = useState(0);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeContainer userId={userId}/>
    },
    {
      path: "/narrative",
      element: <BuilderContainer userId={userId} mode='narrative'/>
    },
    {
      path: "/battle",
      element: <BuilderContainer userId={userId} mode='battle'/>
    },
  ]);

  return (
    <div className="App">
      <Header setUserId={setUserId}/>
      <RouterProvider router={router}/>
      <Toaster position='bottom-center'/>
    </div>
  );
}

export default App;
