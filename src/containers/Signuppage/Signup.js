import React, { Component } from 'react';
import classes from './Signup.module.css';
import axios from 'axios';


class Signup extends Component {


    state = {
        Firstname:
          { Firstname: 'First Name'},
        Lastname:  
          { Lastname: 'Last Name'},
        Email:  
           {email: 'E-Mail'},
        Password:   
           {password: 'password'},
        repeatedPassword:   
           {repeatedPassword: 'passwort' }
      }



      EmailChangedHandler = (event) => {
        this.setState({
          Email:
            { email: event.target.value }
        })
      }

      FirstNameChangedHandler = (event) => {
        this.setState({
          Firstname:
            { Firstname: event.target.value }
        })
      }

      LastNameChangedHandler = (event) => {
        this.setState({
          Lastname:
            { Lastname: event.target.value }
        })
      }

      PasswordChangedHandler = (event) => {
        this.setState({
          Password:
            { password: event.target.value }
        })
      }
      RPasswordChangedHandler = (event) => {
        this.setState({
          repeatedPassword:
            { repeatedPassword: event.target.value }
        })
      }

      SignupClick = () => {

        if (this.state.Password.password==this.state.repeatedPassword.repeatedPassword) {

      const post = {
        name: this.state.Firstname.Firstname + ' ' + this.state.Lastname.Lastname,
        email: this.state.Email.email,
        password: this.state.Password.password,
  
      }
      //console.log(post);
  
      axios.post('/user/register', post).then(res => {console.log(res) });
      //then(res => {console.log(res.data)})
      //then(res => {this.setState({AccessToken:{token: res.data.token}})});
    }
    else
    {
      //console.log(this.state.data.password);

      alert("Passwords have to be the same!")
    }

      }




render (){ 
    return(
        <div className={classes.Signup}>
            <h1 className={classes.Header}>Create an Account</h1>
            <input type="text" value={this.state.Firstname.Firstname} onChange={this.FirstNameChangedHandler}></input>
            <input type="text" value={this.state.Lastname.Lastname} onChange={this.LastNameChangedHandler}></input>
            <input type="text" value={this.state.Email.email} onChange={this.EmailChangedHandler}></input>
            <input type="password" value={this.state.Password.password} onChange={this.PasswordChangedHandler}></input>
            <input type="password" value={this.state.repeatedPassword.repeatedPassword} onChange={this.RPasswordChangedHandler}></input>
            <button className={classes.SignupButton} onClick={this.SignupClick}>Signup</button>
        </div>
    )
}

}

//<p >{this.state.AccessToken.token}</p>



export default Signup;