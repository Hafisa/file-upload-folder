import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './screens/Home';
import LoginUser from './screens/LoginUser'
import RegisterUser from './screens/RegisterUser'
import Header from './components/Header'
function App() {
  const [logoutUser, setLogoutUser] = useState(false);
  return (
    <div>
      <Router>
        <Route exact path='/'>
          <RegisterUser setLogoutUser={setLogoutUser} />
        </Route>
        <Route path='/register'>
          <RegisterUser setLogoutUser={setLogoutUser} />
        </Route>
        <Route path='/login'>
          <LoginUser setLogoutUser={setLogoutUser} />
        </Route>
        <Route path='/home'>
          <Header logoutUser={logoutUser} setLogoutUser={setLogoutUser} />
          <Home logoutUser={logoutUser} />
        </Route>
      </Router>
    </div>
  );
}

export default App;
