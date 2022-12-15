import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Chat from '../chat/Chat';
import Dashboard from '../dashboard/Dashboard';
import Navbar from '../dashboard/Navbar';
import Editprofile from '../dashboard/profile/Editprofile';
import Profile from '../dashboard/profile/Profile';
// import Sidebar from '../dashboard/Sidebar';
import Instructions from '../instructions/Instructions';
import News from '../dashboard/news/News';
import NewsComponent from '../dashboard/news/NewsComponent';
import AddNews from '../dashboard/news/AddNews';
import Nfts from '../dashboard/nfts/Nfts';

// import io from 'socket.io-client'

// const socket = io.connect("http://localhost:5000")

class DashboardRoutes extends Component {
  
  render() {
    // window.location.assign('/dashboard')
      return (
          <div>
            <BrowserRouter>
            <Navbar/>
            
                <Switch>
                  <Route exact path="/" component = {Dashboard}/>
                  <Route path="/chat" component = {Chat}/>
                  {/* <Route path="/chat" component={() => (<Chat socket={socket} />)}/> */}
                  <Route path="/signup" component = {Instructions}/>
                  <Route path="/profile/:id" component = {Profile}/>
                  <Route path="/editprofile" component = {Editprofile}/>
                  <Route path="/new" component = {News}/>
                  <Route path="/news/:newsid" component = {NewsComponent}/>
                  <Route path="/addnews" component = {AddNews}/>
                  <Route path="/nfts" component = {Nfts}/>
                  <Route path="/*" component = {() => {return (<div><center><br/><br/><br/><h1 style={{color:"white"}}>404 Error. Page Not Found.</h1></center></div>)}}/>
                </Switch>
            </BrowserRouter>
          </div>         
      )
    }
}

export default DashboardRoutes;
