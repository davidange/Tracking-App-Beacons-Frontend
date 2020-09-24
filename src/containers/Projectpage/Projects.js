import React, { Component } from 'react';
import classes from './Projects.module.css';

class Projects extends Component {


    state = {
        AccessToken:
          { token: 'abc' }
      }


      componentDidMount () {

        const query = new URLSearchParams(this.props.location.search);
        const AccessToken ={};
        for (let param of query.entries()){
            
            AccessToken[param[0]]=param[1];

        }
        this.setState({AccessToken: AccessToken});
      }



render (){ 
    return(
        <div className={classes.Projects}> New Page!
        </div>
    )
}

}

//<p >{this.state.AccessToken.token}</p>



export default Projects;