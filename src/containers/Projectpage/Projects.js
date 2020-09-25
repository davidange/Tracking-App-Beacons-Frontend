import React, { Component } from 'react';
import classes from './Projects.module.css';
import axios from 'axios';


class Projects extends Component {


    state = {
        AccessToken:
          { token: 'abc' }
      }


      componentDidMount () {

        console.log("Login successful!");

        const query = new URLSearchParams(this.props.location.search);
        const AccessToken ={};
        for (let param of query.entries()){
            
            AccessToken[param[0]]=param[1];

        }
        this.setState({AccessToken: AccessToken});
      



      }

      componentDidUpdate () {

        const get = {
            Authorization: 'TrackingAPI '+this.state.AccessToken.token
          }

        //console.log(this.state.AccessToken.token);    
        axios.get('https://jsonplaceholder.typicode.com/posts').then(res => {console.log(res)});

      }






render (){ 
    return(
        <div className={classes.Projects}>
            <h1>New Page!</h1>
            <h2>More to come soon!</h2>
        </div>
    )
}

}

//<p >{this.state.AccessToken.token}</p>



export default Projects;