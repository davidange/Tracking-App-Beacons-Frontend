import React, { useEffect } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

import Layout from "./components/Layout/Layout";
import AlertSnackbar from "./components/UI/Snackbar/Alert-Snackbar/Alert-Snackbar";

import LoginScreen from "./containers/Login/Login";
import Projects from "./containers/Projectpage/Projects";
import Signup from "./containers/Signuppage/Signup";
import Model from "./containers/Modelpage/Model";

const App = (props) => {
	const { onTryAutoSignup } = props;

	useEffect(() => {
		onTryAutoSignup();
	}, [onTryAutoSignup]);

	//defaultRoutes
	let routes = (
		<Switch>
			<Route path="/Signup" exact component={Signup}></Route>
			<Route path="/SignIn" exact component={LoginScreen}></Route>
			<Redirect to="/SignIn" />
		</Switch>
	);
	//if user Authenticated:
	if (props.isAuthenticated) {
		routes = (
			<Switch>
				<Route path="/Projects" component={Projects}></Route>
				<Route path="/Model" component={Model}></Route>
				<Route path="/Signup" exact component={Signup}></Route>
				<Route path="/SignIn" exact component={LoginScreen}></Route>
			</Switch>
		);
	}

	return (
		<div>
			<AlertSnackbar />
			<Layout>{routes}</Layout>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onTryAutoSignup: () => dispatch(actions.authCheckState()),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
