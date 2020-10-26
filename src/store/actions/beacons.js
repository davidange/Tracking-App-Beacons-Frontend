import * as actionTypes from "./actionTypes";
import axios from "../../axios-instance";

const fetchBeaconsStart = () => {
	return {
		type: actionTypes.FETCH_BEACONS_START,
	};
};

const fetchBeaconsSuccess = (beacons) => {
	return {
		type: actionTypes.FETCH_BEACONS_SUCCESS,
		beacons: beacons,
	};
};

const fetchBeaconsFail = (error) => {
	return {
		type: actionTypes.FETCH_BEACONS_FAIL,
		error: error,
	};
};

export const fetchBeacons = () => {
	return (dispatch, getState) => {
		dispatch(fetchBeaconsStart());
		const header = { Authorization: "Bearer " + getState().auth.token };
		const projectId = getState().activeProject.activeProject._id;
		if (!projectId) {
			dispatch(fetchBeaconsFail({ message: "The project ID was not Found" }));
		} else {
			axios
				.get("projects/" + projectId+"/beacons", { headers: header })
				.then((res) => {
					dispatch(fetchBeaconsSuccess(res.data.beacons));
				})
				.catch((err) => {
					dispatch(fetchBeaconsFail(err.response.data));
				});
		}
	};
};

const setBeaconUIDStart = () => {
	return {
		type: actionTypes.SET_BEACON_UID_START,
	};
};

const setBeaconUIDSuccess = () => {
	return {
		type: actionTypes.SET_BEACON_UID_SUCCESS,
	};
};

const setBeaconUIDFail = (error) => {
	return {
		type: actionTypes.SET_BEACON_UID_FAIL,
		error: error,
	};
};

export const setBeaconUID = (beaconID, beaconUID) => {
	return (dispatch, getState) => {
		dispatch(setBeaconUIDStart());
		const header = { Authorization: "Bearer " + getState().auth.token };
		const projectId = getState().activeProject.activeProject._id;
		if (!projectId) {
			dispatch(setBeaconUIDFail({ message: "The project ID was not Found" }));
		} else {
			axios
				.get("projects/" + projectId, { headers: header })
				.then((res) => {
					dispatch(setBeaconUIDSuccess());
					dispatch(fetchBeacons()); //update the list of beacons after setting the UID of the beacon
				})
				.catch((err) => {
					dispatch(setBeaconUIDFail(err.response.data));
				});
		}
	};
};
