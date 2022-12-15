import React, { Component } from 'react';
// import SignUp from './components/SignUp';
import Routes from './components/routes/Routes'
import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from './actions/authActions'
import ScriptTag from 'react-script-tag';
import './styles/global.css';

class App extends Component {
  componentDidMount(){
    store.dispatch(loadUser())
  }
  render() {
    return (
      <Provider store={store}>
        <ScriptTag type="text/javascript" src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.1/dist/umd/popper.min.js" />
        <ScriptTag type="text/javascript" src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.min.js"/>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
        <Routes/>
      </Provider>
    );
  }
}

export default App;
