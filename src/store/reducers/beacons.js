import * as actionTypes from "../actions/actionTypes";

const initialState = {
	beacons: null,
	error: null,
	loading: false,
	loadingAction: false,
	errorAction: null,
};

const fetchBeaconsStart = (state, action) => {
	return {
		...state,
		beacons: null,
		loading: true,
		error: null,
	};
};

const fetchBeaconsSuccess = (state, action) => {
	return {
		...state,
		beacons: action.beacons,
		loading: false,
		error: null,
	};
};

const fetchBeaconsFail = (state, action) => {
	return {
		...state,
		loading: false,
		error: action.error,
	};
};

const setBeaconUIDStart = (state, action) => {
	return {
		...state,
		loadingAction: true,
		errorAction: null,
	};
};

const setBeaconUIDSuccess = (state, action) => {
	return {
		...state,
		loadingAction: false,
		errorAction: null,
	};
};

const setBeaconUIDFail = (state, action) => {
	return {
		...state,
		loadingAction: false,
		errorAction: action.error,
	};
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_BEACONS_START:
			return fetchBeaconsStart(state, action);
		case actionTypes.FETCH_BEACONS_SUCCESS:
			return fetchBeaconsSuccess(state, action);
		case actionTypes.FETCH_BEACONS_FAIL:
			return fetchBeaconsFail(state, action);
		case actionTypes.SET_BEACON_UID_START:
			return setBeaconUIDStart(state, action);
		case actionTypes.SET_BEACON_UID_SUCCESS:
			return setBeaconUIDSuccess(state, action);
		case actionTypes.SET_BEACON_UID_FAIL:
			return setBeaconUIDFail(state, action);
		default:
			return state;
	}
};

export default reducer;
