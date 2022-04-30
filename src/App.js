import logo from './logo.svg';
import './App.css';
import Wallet from './Wallet';
import Landing from './Landing';
import {Route, Link, Routes, BrowserRouter, Switch, Router} from 'react-router-dom';
import { createBrowserHistory } from 'history';



function App() {
  return (
    
    <div className="App font-mono">
      <script src="../node_modules/flowbite/dist/flowbite.js"></script>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Wallet/>}>
          
        </Route>
        <Route path='/landing' element={<Landing/>}>
          
        </Route>
        </Routes>
      </BrowserRouter>
      

      
      
    </div>
    
  );
}

export default App;
