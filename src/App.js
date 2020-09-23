import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import LoginScreen from './containers/Login/Login';

class App extends Component {

 

  render() {
  return (
    <div>
      <Layout>
        <LoginScreen></LoginScreen>
  
      </Layout>
      
    </div>
  );
  }
}

export default App;
