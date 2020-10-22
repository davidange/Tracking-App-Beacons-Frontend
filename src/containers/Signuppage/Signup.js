import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../store/actions/index";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import useStyles from "./useStyles";
import Container from "@material-ui/core/Container";

const SignUp = (props) => {
	const classes = useStyles();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const nameChangedHandler = (event) => {
		setName(event.target.value);
	};

	const emailChangedHandler = (event) => {
		setEmail(event.target.value);
	};
	const passwordChangedHandler = (event) => {
		setPassword(event.target.value);
	};
	const confirmPasswordChangedHandler = (event) => {
		setConfirmPassword(event.target.value);
	};

	const signUpHandler = (event) => {
    console.log('HEYYY!!!')
		event.preventDefault();
		props.onSignUp(email, password, confirmPassword, name);
	};

	if (props.isAuthenticated) {
		return <Redirect to={"/Projects"} />;
  }

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<form className={classes.form} noValidate onSubmit={signUpHandler}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={12}>
							<TextField
								autoComplete="fname"
								name="firstName"
								variant="outlined"
								required
								fullWidth
								id="firstName"
								label="Name"
								autoFocus
								onChange={nameChangedHandler}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								onChange={emailChangedHandler}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								onChange={passwordChangedHandler}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="confirmPassword"
								label="Confirm Password"
								type="password"
								id="confirmPassword"
								autoComplete="current-password"
								onChange={confirmPasswordChangedHandler}
							/>
						</Grid>
					</Grid>
					<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
						Sign Up
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link href="/SignIn" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
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
		onSignUp: (email, password, confirmPassword, name) =>
			dispatch(actions.signUp(email, password, confirmPassword, name)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
// const Signup =props=> {

//     state = {
//         Firstname:
//           { Firstname: 'First Name'},
//         Lastname:
//           { Lastname: 'Last Name'},
//         Email:
//            {email: 'E-Mail'},
//         Password:
//            {password: 'password'},
//         repeatedPassword:
//            {repeatedPassword: 'passwort' }
//       }

//       EmailChangedHandler = (event) => {
//         this.setState({
//           Email:
//             { email: event.target.value }
//         })
//       }

//       FirstNameChangedHandler = (event) => {
//         this.setState({
//           Firstname:
//             { Firstname: event.target.value }
//         })
//       }

//       LastNameChangedHandler = (event) => {
//         this.setState({
//           Lastname:
//             { Lastname: event.target.value }
//         })
//       }

//       PasswordChangedHandler = (event) => {
//         this.setState({
//           Password:
//             { password: event.target.value }
//         })
//       }
//       RPasswordChangedHandler = (event) => {
//         this.setState({
//           repeatedPassword:
//             { repeatedPassword: event.target.value }
//         })
//       }

//       SignupClick = () => {

//         if (this.state.Password.password==this.state.repeatedPassword.repeatedPassword) {

//       const post = {
//         name: this.state.Firstname.Firstname + ' ' + this.state.Lastname.Lastname,
//         email: this.state.Email.email,
//         password: this.state.Password.password,

//       }
//       //console.log(post);

//       axios.post('user/register', post).then(res => {console.log(res) });
//       //then(res => {console.log(res.data)})
//       //then(res => {this.setState({AccessToken:{token: res.data.token}})});
//     }
//     else
//     {
//       //console.log(this.state.data.password);

//       alert("Passwords have to be the same!")
//     }

//       }

// render (){
//     return(
//         <div className={classes.Signup}>
//             <h1 className={classes.Header}>Create an Account</h1>
//             <input type="text" value={this.state.Firstname.Firstname} onChange={this.FirstNameChangedHandler}></input>
//             <input type="text" value={this.state.Lastname.Lastname} onChange={this.LastNameChangedHandler}></input>
//             <input type="text" value={this.state.Email.email} onChange={this.EmailChangedHandler}></input>
//             <input type="password" value={this.state.Password.password} onChange={this.PasswordChangedHandler}></input>
//             <input type="password" value={this.state.repeatedPassword.repeatedPassword} onChange={this.RPasswordChangedHandler}></input>
//             <button className={classes.SignupButton} onClick={this.SignupClick}>Signup</button>
//         </div>
//     )
// }

// }

// //<p >{this.state.AccessToken.token}</p>

// export default Signup;
