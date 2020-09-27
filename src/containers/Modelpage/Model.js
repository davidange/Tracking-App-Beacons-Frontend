import React, { Component } from 'react';
import classes from './Model.module.css';
import axios from 'axios';
import ModelViewer from 'react-3d-model-viewer';


class Model extends Component {


    state = {
        AccessToken:
          { token: 'abc' },
        chosenModel: 
          {title: 'def'}
      }


      componentDidMount () {


        console.log("Model chosen successfully!");

        const query = new URLSearchParams(this.props.location.search);
        const AccessToken ={};
        const title={};
        for (let param of query.entries()){
            
            AccessToken[param[0]]=param[1];

        }
        this.setState({AccessToken: AccessToken});

        for (let param of query.entries()){
            
            title[param[0]]=param[1];

        }
        this.setState({chosenModel: title});
      /*

        axios.get('https://jsonplaceholder.typicode.com/posts').then(res => {console.log(res); console.log(this.state.AccessToken.token); this.setState({data: res.data}); console.log(this.state.data)});
*/

      }



render (){ 



  


    return(
        <div className={classes.Model}>
            <h1>{this.state.AccessToken.token}</h1>
            <h1>{this.state.chosenModel.title}</h1>
            <ModelViewer></ModelViewer>
        </div>
    )
}

}

//<p >{this.state.AccessToken.token}</p>                <p>{this.state.data[0].name}</p>




export default Model;