import React, { Component } from 'react';
import { findAllInRenderedTree } from 'react-dom/test-utils';
import classes from './Login.module.css';
import axios from 'axios';




class login extends Component {

  /*
    componentDidMount () {
  
      axios.get('https://jsonplaceholder.typicode.com/posts').then(res => {console.log(res)});
    }
  */
  state = {
    Email:
      { email: 'E-Mail' },
    Password:
      { password: 'Password' },
    AccessToken:
      { token: 'abc' }
  }





  LoginClick = () => {

    this.props.history.push('/Projects');

    // alert("LB was clicked")
    /*
   const post = {
     user_id: this.state.Email.email,
     password: this.state.Password.password,
     application_id: '6CBF3DB2F6FE4E54963C7C6D9E306FE8'

   }

    axios.post('https://api-stage.bimplus.net/v2/authorize',post).then(res => {this.setState({AccessToken:{token: res.data.access_token}})});
/*
    const post = {
      email: this.state.Email.email,
      password: this.state.Password.password,

    }

    axios.post('https://tracking-bimplus-beacon.herokuapp.comuser/login', post).then(res => { console.log(res) });
*/

  };




  SignupClick = () => {
    alert("SH was clicked")
  };

  EmailChangedHandler = (event) => {
    this.setState({
      Email:
        { email: event.target.value }
    })
  }

  PasswordChangedHandler = (event) => {
    this.setState({
      Password:
        { password: event.target.value }
    })
  }

  render() {
    return (
      <div className={classes.LoginScreen}>
        Login
        <input type="text" value={this.state.Email.email} onChange={this.EmailChangedHandler}></input>
        <input type="password" value={this.state.Password.password} onChange={this.PasswordChangedHandler}></input>
        <button onClick={this.LoginClick}>Login</button>
        <p className={classes.Signup} onClick={this.SignupClick}>Signup</p>
      </div>
    );

  }


}

export default login;