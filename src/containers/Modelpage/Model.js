import React, { Component } from 'react';
import { useRef, useState } from 'react';
import classes from './Model.module.css';
import axios from 'axios';
import ModelViewer from 'react-3d-model-viewer';
import {Canvas, useFrame} from 'react-three-fiber';
import Box from '../../components/Modelpage/Box';
import {softShadows, MeshWobbleMaterial, OrbitControls} from "drei";
import {useSpring, a} from 'react-spring/three';

/*
const Box = () => {

    
    const mesh = useRef(null);
    useFrame(()=>(mesh.current.rotation.x = mesh.current.rotation.y +=0.01));

    return(

        <mesh ref={mesh}>
        <boxBufferGeometry attach='geometry' args={[1,1,1]}/>
        <meshStandardMaterial attach='material' />
    </mesh> 


    );
}
*/
softShadows();

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
            <Canvas shadowMap colorManagement camera={{position: [-5,2,10], fov: 60}}>
                <ambientLight intensity={0.3} />
                <pointLight position={[-10,0,-20]} intensity={0.5}/>
                <pointLight position={[0,-10,0]} intensity={1.5}/>
                <directionalLight 
                    castShadow
                    position={[0,10,0]} 
                    intensity={1.5} 
                    shadow-mapSize-width={1024}
                    shadow-mapSize-heigth={1024}
                    shadow-camera-far={50}
                    shadow-camera-left={-10}
                    shadow-camera-rigth={10}
                    shadow-camera-top={10}
                    shadow-camera-bottom={-10}
                     />

                     <group>
                         <mesh receiveShadow rotation={[-Math.PI/2,0,0]} position={[0,-3,0]} >
                             <planeBufferGeometry attach='geometry' args={[100,100]} />
                             <shadowMaterial attach='material' opacity={0.3} />
                         </mesh>
                     </group>





                <Box position={[0,1,0]} args={[3,2,1]} color='lightblue' speed={2}/>
                <Box position={[-2,1,-5]} args={[1,1,1]} color='pink'speed={6}/>
                <Box position={[5,1,-2]} args={[1,1,1]} color='pink'speed={6}/>
                <OrbitControls />
            </Canvas>
        </div>
    )
}

}

//<p >{this.state.AccessToken.token}</p>                <p>{this.state.data[0].name}</p>




export default Model;