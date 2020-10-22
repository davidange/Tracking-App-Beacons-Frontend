import * as actionTypes from "../actions/actionTypes";

const initialState = {
	token: null,
	error: null,
	loading: false,
	signupSucces:false,
	authRedirectPath: "/",
};

const authStart = (state, action) => {
	return {
		...state,
		signupSucces:false,
		error: null,
		loading: true,
	};
};

const authSuccess = (state, action) => {
	return {
		...state,
		token: action.token,
		error: null,
		loading: false,
	};
};

const authFail = (state, action) => {
	return {
		...state,
		signupSucces:false,
		error: action.error,
		loading: false,
	};
};

const authSignUpSuccess = (state, action) => {
	return {
		...state,
		signupSucces:true,
		error: null,
		loading: false,
	};
};

const authLogout = (state, action) => {
	return {
		...state,
		token: null,
	};
};

const setAuthRedirectPath = (state, action) => {
	return {
		...state,
		authRedirectPath: action.path,
	};
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return authStart(state, action);
		case actionTypes.AUTH_SUCCESS:
			return authSuccess(state, action);
		case actionTypes.AUTH_SIGNUP_SUCCESS:
			return authSignUpSuccess(state, action);
		case actionTypes.AUTH_FAIL:
			return authFail(state, action);
		case actionTypes.AUTH_LOGOUT:
			return authLogout(state, action);
		case actionTypes.SET_AUTH_REDIRECT_PATH:
			return setAuthRedirectPath(state, action);
		default:
			return state;
	}
};

export default reducer;
