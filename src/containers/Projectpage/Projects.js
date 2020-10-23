import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as actions from "../../store/actions/index";

import classes from "./Projects.module.css";
import Projectbox from "../../components/Projectpage/Projectbox";

const Projects = (props) => {
	const { loading, projects, onInitProjects } = props;
	const [redirect, setRedirect] = useState(null);
	let listOfProjectCards = null;
	//initialize the list of projects
	useEffect(() => {
		onInitProjects();
	}, [onInitProjects]);

	if (loading) {
		listOfProjectCards = <CircularProgress color="secondary" size={120} />;
	}

	const projectClickedHandler = (id) => {
		console.log(id);
		setRedirect(<Redirect to={"Project/" + id} />);
		//return ;
	};

	if (!loading && projects) {
		listOfProjectCards = (
			<div>
				{projects.map((project, index) => {
					return (
						<Projectbox
							title={project.name}
							click={() => projectClickedHandler(project._id)}
							team={project.team_name}
							key={project._id}
						/>
					);
				})}
			</div>
		);
	}

	return (
		<React.Fragment>
			{redirect}
			<div className={classes.Projects}>{listOfProjectCards}</div>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		loading: state.projects.loading,
		projects: state.projects.projects,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onInitProjects: () => dispatch(actions.fetchProjects()),
		updateProjects: () => dispatch(actions.updateProjects()),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Projects);

// class Projects extends Component {
//   state = {
//     AccessToken: { token: "abc" },
//     data: [],
//   };

//   UNSAFE_componentWillMount() {
//     //console.clear();
//     console.log("Login successful!");

//     const query = new URLSearchParams(this.props.location.search);
//     const AccessToken = {};
//     for (let param of query.entries()) {
//       AccessToken[param[0]] = param[1];
//     }
//     this.setState({ AccessToken: AccessToken });
//   }

//   componentDidMount() {
//     /*
//             const post = {
//               email: this.state.Email.email,
//               password: this.state.Password.password,

//             }

//             axios.post('/user/login', post).then(res => {this.setState({ AccessToken: { token: res.data.token } }); this.setState({Status: {status: res.status}}) });
//             //then(res => {console.log(res.data)})
//             //then(res => {this.setState({AccessToken:{token: res.data.token}})});

//     */
//     /*
//     console.log(this.state.AccessToken.token);
//     //get list of projects
//     axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
//       //console.log(res);
//       this.setState({ data: res.data });
//       //console.log(this.state.data)
//     });
// */
//     console.log("Get Request!");

//     const header = { Authorization: "Bearer " + this.state.AccessToken.token };
//     //console.log({ headers: header });
//     axios
//       .get("projects", { headers: header })
//       .then((res) => {
//         console.log(res);
//         this.setState({ data: res.data.projects });
//       })
//       .catch((error) => {
//         console.log("A shitty error happened");
//         console.log(error);
//       });

//     /*
//         console.log(this.state.AccessToken.token);
//         this.setState({ data: res.data });
//         console.log(this.state.data)
//     */
//   }

//   ProjectClick = (index) => {
//     //updating chosenModel in state with the clicked model
//     //this.state.chosenModel.title = this.state.data[index].title;
//     //this.setState({ chosenModel: { title: this.state.data[index].name } });
//     //console.log(this.state.chosenModel.title);

//     const queryParams = [];

//     queryParams.push(
//       encodeURIComponent("token") +
//         "=" +
//         encodeURIComponent(this.state.AccessToken.token)
//     );
//     queryParams.push(
//       encodeURIComponent("projectID") +
//         "=" +
//         encodeURIComponent(this.state.data[index]._id)
//     );

//     const queryString = queryParams.join("&");

//     this.props.history.push({
//       pathname: "/Model",
//       search: "?" + queryString,
//     });
//     //Title weitergeben
//   };

//   render() {
//     let pbox = (
//       <div>
//         {this.state.data.map((props, index) => {
//           return (
//             <Projectbox
//               title={props.name}
//               click={() => this.ProjectClick(index)}
//               team={props.team_name}
//             />
//           );
//         })}
//       </div>
//     );

//     return <div className={classes.Projects}>{pbox}</div>;
//   }
// }

// //<p >{this.state.AccessToken.token}</p>                <p>{this.state.data[0].name}</p>

// export default Projects;
