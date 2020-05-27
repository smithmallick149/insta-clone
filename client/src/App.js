import React from 'react';
import './App.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// components
import Navbar from './components/Navbar'

// component screens
import Home from "./components/screens/Home";
import Profile from "./components/screens/Profile";
import Signin from "./components/screens/Login";
import Signup from "./components/screens/Signup";
import CreatePost from "./components/screens/CreatePost";





function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/create" exact component={CreatePost} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
