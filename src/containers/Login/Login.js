import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../store/actions/index";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import useStyles from "./useStyles";
import Container from "@material-ui/core/Container";

const Login = (props) => {
	const classes = useStyles();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rememberUser, setRememberUser] = useState(false);

	const emailChangedHandler = (event) => {
		setEmail(event.target.value);
	};

	const passwordChangedHandler = (event) => {
		setPassword(event.target.value);
	};

	const switchRememberUserHandler = () => {
		setRememberUser(!rememberUser);
	};

	const submitHandler = (event) => {
		event.preventDefault();
		console.log("Trying to login!");
		props.onLogin(email, password, rememberUser);
	};

	let authRedirect = null;
	if (props.isAuthenticated) {
		authRedirect = <Redirect to={"/Projects"} />;
	}

	return (
		<React.Fragment>
			{authRedirect}
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<form className={classes.form} noValidate onSubmit={submitHandler}>
						<TextField
							color="secondary"
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							onChange={emailChangedHandler}
						/>
						<TextField
							color="secondary"
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							onChange={passwordChangedHandler}
						/>
						<FormControlLabel
							control={<Checkbox value="remember" color="secondary" />}
							label="Remember me"
							onChange={switchRememberUserHandler}
						/>
						<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
							Sign In
						</Button>
						<Grid container>
							<Grid item>
								<Link href="/SignUp" variant="body2" color="secondary">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		error: state.auth.error,
		isAuthenticated: state.auth.token !== null,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onLogin: (email, password, rememberUser) => dispatch(actions.signIn(email, password, rememberUser)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
