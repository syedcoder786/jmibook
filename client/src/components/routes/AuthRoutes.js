import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
// import News from '../dashboard/news/News';
// import NewsComponent from '../dashboard/news/NewsComponent';
// import Profile from '../dashboard/profile/Profile';
// import Dashboard from '../dashboard/Dashboard';
// import Navbar from '../dashboard/Navbar';
import Login from '../Login';
import SignUp from '../SignUp';

class AuthRoutes extends Component {

  render() {
      return (
          <div>
            <BrowserRouter>
                <Switch>
                  <Route exact path="/" component = {Login}/>
                  <Route path="/signup" component = {SignUp}/>
                  {/* <Route path="/new" component = {News}/>
                  <Route path="/news/component" component = {NewsComponent}/> */}
                  <Route path="/*" component = {() => {return (<Redirect to="/"/>)}}/>
                  {/* <Route path="/dashboard" component = {Dashboard}/> */}
                </Switch>
            </BrowserRouter>
          </div>         
      )
    }
}

export default AuthRoutes;
