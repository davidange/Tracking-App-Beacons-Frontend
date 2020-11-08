import * as actionTypes from "../actions/actionTypes";

const initialState = {
	models: null,
	error: null,
	loading: false,
	loadingAction: false,
	errorAction: null,
};

const fetchModelsStart = (state, action) => {
	return {
		...state,
		models: null,
		loading: true,
		error: null,
	};
};

const fetchModelsSuccess = (state, action) => {
	return {
		...state,
		models: action.models,
		loading: false,
		error: null,
	};
};

const fetchModelsFail = (state, action) => {
	return {
		...state,
		loading: false,
		error: action.error,
	};
};

const setBeaconModelStart = (state, action) => {
	return {
		...state,
		loadingAction: true,
		errorAction: null,
	};
};

const setBeaconModelSuccess = (state, action) => {
	return {
		...state,
		loadingAction: false,
		errorAction: null,
	};
};

const setBeaconModelFail = (state, action) => {
	return {
		...state,
		loadingAction: false,
		errorAction: action.error,
	};
};

const removeBeaconModelStart = (state, action) => {
	return {
		...state,
		loadingAction: true,
		errorAction: null,
	};
};

const removeBeaconModelSuccess = (state, action) => {
	return {
		...state,
		loadingAction: false,
		errorAction: null,
	};
};

const removeBeaconModelFail = (state, action) => {
	return {
		...state,
		loadingAction: false,
		errorAction: action.error,
	};
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_MODELS_START:
			return fetchModelsStart(state, action);
		case actionTypes.FETCH_MODELS_SUCCESS:
			return fetchModelsSuccess(state, action);
		case actionTypes.FETCH_MODELS_FAIL:
			return fetchModelsFail(state, action);
		case actionTypes.SET_BEACON_MODEL_START:
			return setBeaconModelStart(state, action);
		case actionTypes.SET_BEACON_MODEL_SUCCESS:
			return setBeaconModelSuccess(state, action);
		case actionTypes.SET_BEACON_MODEL_FAIL:
			return setBeaconModelFail(state, action);
		case actionTypes.REMOVE_BEACON_MODEL_START:
			return removeBeaconModelStart(state, action);
		case actionTypes.REMOVE_BEACON_MODEL_SUCCESS:
			return removeBeaconModelSuccess(state, action);
		case actionTypes.REMOVE_BEACON_MODEL_FAIL:
			return removeBeaconModelFail(state, action);
		default:
			return state;
	}
};

export default reducer;
