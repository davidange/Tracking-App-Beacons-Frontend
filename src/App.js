import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import LoginScreen from './containers/Login/Login';
import Projects from './containers/Projectpage/Projects';
import {Route, Switch} from 'react-router-dom';

class App extends Component {

 

  render() {
  return (
    <div>
      <Layout>
        <Switch>
       <Route path="/Projects" component={Projects}></Route>
       <Route path="/" exact component={LoginScreen}></Route>
       </Switch>
      </Layout>
      
    </div>
  );
  }
}

export default App;
