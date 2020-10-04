import React, { Component } from "react";
import classes from "./Model.module.css";
import { Canvas } from "react-three-fiber";
import Box from "../../components/Modelpage/Box";
import { softShadows, OrbitControls } from "drei";

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
    AccessToken: { token: "abc" },
    ID: { projectID: "def" },
    showMenu: false,
    showBeaconF: false,
    showModelF: false,
    showGPSF: false,
    showTrackingF: false,
  };

  UNSAFE_componentWillMount() {
    //console.clear();
    console.log("Model chosen successfully!");

    const query = new URLSearchParams(this.props.location.search);
    const AccessToken = {};
    const id = {};
    for (let param of query.entries()) {
      AccessToken[param[0]] = param[1];
    }
    this.setState({ AccessToken: AccessToken });

    for (let param of query.entries()) {
      id[param[0]] = param[1];
    }
    this.setState({ ID: id });

    /*

        axios.get('https://jsonplaceholder.typicode.com/posts').then(res => {console.log(res); console.log(this.state.AccessToken.token); this.setState({data: res.data}); console.log(this.state.data)});
*/
  }

  componentDidMount() {
    console.log(this.state.AccessToken.token);
    console.log(this.state.ID.projectID);
  }

  MenuHandler = () => {
    const doesShow = this.state.showMenu;
    this.setState({ showMenu: !doesShow });
  };

  BeaconFHandler = () => {
    const doesShow = this.state.showBeaconF;
    this.setState({ showBeaconF: !doesShow });
  };

  GPSFHandler = () => {
    const doesShow = this.state.showGPSF;
    this.setState({ showGPSF: !doesShow });
  };

  TrackingFHandler = () => {
    const doesShow = this.state.showTrackingF;
    this.setState({ showTrackingF: !doesShow });
  };

  ModelFHandler = () => {
    const doesShow = this.state.showModelF;
    this.setState({ showModelF: !doesShow });
  };

  Function1Handler = () => {
    alert("F1 was clicked");
  };

  Function2Handler = () => {
    alert("F2 was clicked");
  };

  Function3Handler = () => {
    alert("F3 was clicked");
  };

  render() {
    return (
      <div>
        <div className={classes.Model}>
          <Canvas
            shadowMap
            colorManagement
            camera={{ position: [-5, 2, 10], fov: 60 }}
          >
            <ambientLight intensity={0.3} />
            <pointLight position={[-10, 0, -20]} intensity={0.5} />
            <pointLight position={[0, -10, 0]} intensity={1.5} />
            <directionalLight
              castShadow
              position={[0, 10, 0]}
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
              <mesh
                receiveShadow
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -3, 0]}
              >
                <planeBufferGeometry attach="geometry" args={[100, 100]} />
                <shadowMaterial attach="material" opacity={0.3} />
              </mesh>
            </group>

            <Box
              position={[0, 1, 0]}
              args={[3, 2, 1]}
              color="lightblue"
              speed={2}
            />
            <Box
              position={[-2, 1, -5]}
              args={[1, 1, 1]}
              color="pink"
              speed={6}
            />
            <Box
              position={[5, 1, -2]}
              args={[1, 1, 1]}
              color="pink"
              speed={6}
            />
            <OrbitControls />
          </Canvas>
        </div>

        <div className={classes.Sidebar}>
          <button className={classes.MenuButton} onClick={this.MenuHandler}>
            Menu
          </button>
          {this.state.showMenu ? (
            <div>
              <p className={classes.Commands} onClick={this.BeaconFHandler}>
                Beacons{" "}
              </p>

              {this.state.showBeaconF ? (
                <p
                  className={classes.Functions}
                  onClick={this.Function1Handler}
                >
                  Function 1
                </p>
              ) : null}
              {this.state.showBeaconF ? (
                <p
                  className={classes.Functions}
                  onClick={this.Function2Handler}
                >
                  Function 2
                </p>
              ) : null}
              {this.state.showBeaconF ? (
                <p
                  className={classes.Functions}
                  onClick={this.Function3Handler}
                >
                  Function 3
                </p>
              ) : null}
              <p className={classes.Commands} onClick={this.ModelFHandler}>
                Models{" "}
              </p>

              {this.state.showModelF ? (
                <p className={classes.Functions}>Function 1</p>
              ) : null}
              {this.state.showModelF ? (
                <p className={classes.Functions}>Function 2</p>
              ) : null}
              {this.state.showModelF ? (
                <p className={classes.Functions}>Function 3</p>
              ) : null}
              <p className={classes.Commands} onClick={this.GPSFHandler}>
                GPS{" "}
              </p>

              {this.state.showGPSF ? (
                <p className={classes.Functions}>Function 1</p>
              ) : null}
              {this.state.showGPSF ? (
                <p className={classes.Functions}>Function 2</p>
              ) : null}
              {this.state.showGPSF ? (
                <p className={classes.Functions}>Function 3</p>
              ) : null}
              <p className={classes.Commands} onClick={this.TrackingFHandler}>
                Tracking{" "}
              </p>

              {this.state.showTrackingF ? (
                <p className={classes.Functions}>Function 1</p>
              ) : null}
              {this.state.showTrackingF ? (
                <p className={classes.Functions}>Function 2</p>
              ) : null}
              {this.state.showTrackingF ? (
                <p className={classes.Functions}>Function 3</p>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

//<p >{this.state.AccessToken.token}</p>                <p>{this.state.data[0].name}</p>

export default Model;
