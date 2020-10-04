import React from 'react';
import './App.css';
import User from "./components/UserSearchPage"
import Search  from "./components/SearchPage"
import Home  from "./components/HomePage"
import Navbar from "./components/NavBar"
import {
  Switch,
  Route
} from "react-router-dom";
import {NotificationContainer } from "react-notifications"

function App() {
  return (
        <div className="App">
        <Navbar />
        <Switch>
            <Route exact path="/" component={Home} /> 
            <Route exact path="/user/:user" component={User} />
            <Route exact path="/search" component={Search} />
        </Switch>
        <NotificationContainer />
    </div>
  );
}

export default App;
