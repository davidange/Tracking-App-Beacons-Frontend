import React, { Component } from 'react';
import classes from './Projects.module.css';
import axios from 'axios';
import Projectbox from '../../components/Projectpage/Projectbox';


class Projects extends Component {


    state = {
        AccessToken:
          { token: 'abc' },
        data: 
          [],
        chosenModel:  
          {title: 'def'}
      }


      componentDidMount () {

/*
        const post = {
          email: this.state.Email.email,
          password: this.state.Password.password,
    
        }
    
        axios.post('/user/login', post).then(res => {this.setState({ AccessToken: { token: res.data.token } }); this.setState({Status: {status: res.status}}) });
        //then(res => {console.log(res.data)})
        //then(res => {this.setState({AccessToken:{token: res.data.token}})});

*/




        console.log("Login successful!");

        const query = new URLSearchParams(this.props.location.search);
        const AccessToken ={};
        for (let param of query.entries()){
            
            AccessToken[param[0]]=param[1];

        }
        this.setState({AccessToken: AccessToken});
      
        //get list of projects
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

ProjectClick = (index) =>{

 //updating chosenModel in state with the clicked model
 this.state.chosenModel.title = this.state.data[index].title;
 console.log(this.state.chosenModel.title);



  const queryParams = [];

  queryParams.push(encodeURIComponent('token')+'='+encodeURIComponent(this.state.AccessToken.token));
  queryParams.push(encodeURIComponent('title')+'='+encodeURIComponent(this.state.chosenModel.title));

  
  
  const queryString = queryParams.join('&');

  this.props.history.push({
    pathname: '/Model',
    search: '?'+queryString
  });
  //Title weitergeben
  
}


render (){ 

  let pbox = (

    <div>
      {this.state.data.map((props,index) => {

        return <Projectbox title={props.title} click={() => this.ProjectClick(index)}/>
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