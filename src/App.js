import './App.css';
import Header from './Components/Header/Header.js';
import GameModeSelect from './Components/GameModeSelect/GameModeSelect.js';
import BuilderContainer from './Components/BuilderContainer/BuilderContainer';
import { Toaster } from 'react-hot-toast';
import { createBrowserRouter, RouterProvider } from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <GameModeSelect/>
  },
  {
    path: "/narrative",
    element: <BuilderContainer mode='narrative'/>
  },
  {
    path: "/battle",
    element: <BuilderContainer mode='battle'/>
  },
]);

const App = () => {
  return (
    <div className="App">
      <Header/>
      <RouterProvider router={router}/>
      <Toaster position='bottom-center'/>
    </div>
  );
}

export default App;
