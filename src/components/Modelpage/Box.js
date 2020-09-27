import React, { Component } from 'react';
import { useRef, useState } from 'react';
import axios from 'axios';
import ModelViewer from 'react-3d-model-viewer';
import {Canvas, useFrame} from 'react-three-fiber';
import {softShadows, MeshWobbleMaterial} from "drei";
import { useSpring, a } from 'react-spring/three';


const Box = ({position, args, color, speed}) => {

    const [expand, setExpand] = useState(false);

    const props = useSpring({
        scale: expand ? [1.4,1.4,1.4] : [1,1,1]
    });
    
    const mesh = useRef(null);
    useFrame(()=>(mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

    return(

    <a.mesh onClick={() => setExpand(!expand)} scale={props.scale} castShadow position={position} ref={mesh}>
        <boxBufferGeometry attach='geometry' args={args}/>
        <MeshWobbleMaterial attach='material' color={color} speed={speed} factor={0.6} />
    </a.mesh> 


    );
}

export default Box;