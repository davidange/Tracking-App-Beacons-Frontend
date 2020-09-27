import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import LoginScreen from './containers/Login/Login';
import Projects from './containers/Projectpage/Projects';
import Signup from './containers/Signuppage/Signup';
import Model from './containers/Modelpage/Model';
import {Route, Switch} from 'react-router-dom';

class App extends Component {

 

  render() {
  return (
    <div>
      <Layout>
        <Switch>
       <Route path="/Projects" component={Projects}></Route>
       <Route path="/Model" component={Model}></Route>
       <Route path="/Signup" exact component={Signup}></Route>
       <Route path="/" exact component={LoginScreen}></Route>
       </Switch>
      </Layout>
      
    </div>
  );
  }
}

export default App;
