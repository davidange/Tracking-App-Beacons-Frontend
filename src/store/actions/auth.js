import axios from "../../axios-instance";
import * as actionTypes from "./actionTypes";
import * as actionSnackbar from "./snackbar";

const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

const authSuccess = (token) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		token: token,
	};
};

const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
	};
};
const authSignUpSuccess = () => {
	return {
		type: actionTypes.AUTH_SIGNUP_SUCCESS,
	};
};

const checkAuthTimeout = (expirationTime) => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

const authFailAndSendSnackbar = (data) => {
	return (dispatch) => {
		dispatch(authFail(data));
		let message = data?.message; //Error  given by server
		console.log(message);
		if (!message) {
			//validation Error
			const temp = data?.errors;
			if (temp) {
				message = data?.errors[0].msg;
			}
		}
		if (!message) {
			//Unknown Error
			message = "Unknown Error Has occured";
		}

		dispatch(actionSnackbar.setSnackbar("error", message));
		dispatch(actionSnackbar.openSnackbar());
	};
};

export const signUp = (email, password, confirmPassword, name) => {
	return (dispatch) => {
		dispatch(authStart());
		const data = {
			email: email,
			password: password,
			name: name,
		};
		if (password === confirmPassword) {
			axios
				.post("user/register", data)
				.then((res) => {
					dispatch(authSignUpSuccess());
					dispatch(actionSnackbar.setSnackbar("success",  "New Account has been created" ));
					dispatch(actionSnackbar.openSnackbar());
				})
				.catch((err) => {
					dispatch(authFailAndSendSnackbar(err.response.data));
				});
		} else {
			dispatch(authFailAndSendSnackbar({ message: "Passwords are different" }));
		}
	};
};

export const signIn = (email, password, rememberUser = false) => {
	return (dispatch) => {
		dispatch(authStart());
		const data = {
			email: email,
			password: password,
		};
		axios
			.post("user/login", data)
			.then((res) => {
				const expirationDate = new Date(new Date().getTime() + res.data.expires_in * 1000);

				if (rememberUser) {
					//save in browser login Data
					localStorage.setItem("token", res.data.token);
					localStorage.setItem("expirationDate", expirationDate);
				}
				dispatch(authSuccess(res.data.token));
				dispatch(checkAuthTimeout(res.data.expires_in));
			})
			.catch((err) => {
				dispatch(authFailAndSendSnackbar(err.response.data));
			});
	};
};

export const logout = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("expirationDate");
	console.log('REMOVED TOKEN!!!')
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const authCheckState = () => {
	return (dispatch) => {
		const token = localStorage.getItem("token");
		if (!token) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(localStorage.getItem("expirationDate"));
			if (expirationDate <= new Date()) {
				dispatch(logout());
			} else {
				dispatch(authSuccess(token));
				dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
			}
		}
	};
};

export const setAuthRedirectPath = (path) => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path,
	};
};
