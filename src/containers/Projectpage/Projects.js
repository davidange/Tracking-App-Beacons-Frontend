import React, { Component } from 'react';
import classes from './Projects.module.css';
import axios from 'axios';
import Projectbox from '../../components/Projectpage/Projectbox';


class Projects extends Component {


    state = {
        AccessToken:
          { token: 'abc' },
        data: 
          []
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

ProjectClick = () =>{

  alert("was clicked!");

}


render (){ 

  let pbox = (

    <div>
      {this.state.data.map(props => {

        return <Projectbox title={props.title} click={this.ProjectClick}/>
      })}
    </div>

  );


    return(
        <div className={classes.Projects}>
          {pbox}
        </div>
    )
}

}

//<p >{this.state.AccessToken.token}</p>                <p>{this.state.data[0].name}</p>




export default Projects;