import React, { Component } from 'react';
import classes from './Projects.module.css';
import axios from 'axios';


class Projects extends Component {


    state = {
        AccessToken:
          { token: 'abc' },
        data: 
          [{name: 'hello'},
           {name: 'world'}]
      }


      componentDidMount () {


        console.log("Login successful!");

        const query = new URLSearchParams(this.props.location.search);
        const AccessToken ={};
        for (let param of query.entries()){
            
            AccessToken[param[0]]=param[1];

        }
        this.setState({AccessToken: AccessToken});
      

        axios.get('https://jsonplaceholder.typicode.com/posts').then(res => {console.log(res); console.log(this.state.AccessToken.token); this.setState({data: res.data}); console.log(this.state.data)});


      }
/*
      componentDidUpdate () {

        const get = {
            Authorization: 'TrackingAPI '+this.state.AccessToken.token
          }

        //console.log(this.state.AccessToken.token);    
        axios.get('https://jsonplaceholder.typicode.com/posts').then(res => {console.log(res)});

      }
*/






render (){ 
    return(
        <div className={classes.Projects}>
            <h1>New Page!</h1>
            <h2>More to come soon!</h2>
            <p>{this.state.data[0].title}</p>
        </div>
    )
}

}

//<p >{this.state.AccessToken.token}</p>                <p>{this.state.data[0].name}</p>




export default Projects;