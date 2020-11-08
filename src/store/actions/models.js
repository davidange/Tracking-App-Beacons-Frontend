import * as actionTypes from "./actionTypes";
import axios from "../../axios-instance";

const fetchModelsStart = () => {
	return {
		type: actionTypes.FETCH_MODELS_START,
	};
};

const fetchModelsSuccess = (models) => {
	return {
		type: actionTypes.FETCH_MODELS_SUCCESS,
		models: models,
	};
};

const fetchModelsFail = (error) => {
	return {
		type: actionTypes.FETCH_MODELS_FAIL,
		error: error,
	};
};

export const fetchModels = () => {
	return (dispatch, getState) => {
		dispatch(fetchModelsStart());
		const header = { Authorization: "Bearer " + getState().auth.token };
		const projectId = getState().activeProject.activeProject._id;
		if (!projectId) {
			dispatch(fetchModelsFail({ message: "The project ID was not Found" }));
		} else {
			console.log('FETCHING MODELS')
			axios
				.get("projects/" + projectId + "/models", { headers: header })
				.then((res) => {
					console.log(res)
					dispatch(fetchModelsSuccess(res.data.models));
				})
				.catch((err) => {
					dispatch(fetchModelsFail(err.response.data));
				});
		}
	};
};

const setBeaconModelStart = () => {
	return {
		type: actionTypes.SET_BEACON_MODEL_START,
	};
};

const setBeaconModelSuccess = () => {
	return {
		type: actionTypes.SET_BEACON_MODEL_SUCCESS,
	};
};

const setBeaconModelFail = (error) => {
	return {
		type: actionTypes.SET_BEACON_MODEL_FAIL,
		error: error,
	};
};

export const setBeaconModel = (modelID) => {
	return (dispatch, getState) => {
		dispatch(setBeaconModelStart());
		const header = { Authorization: "Bearer " + getState().auth.token };
		const projectId = getState().activeProject.activeProject._id;
		if (!projectId) {
			dispatch(setBeaconModelFail({ message: "The project ID was not Found" }));
		} else {
			const data = { model_id: modelID };
			axios
				.post("projects/" + projectId + "/beacons-model", data, { headers: header })
				.then((res) => {
					
					dispatch(setBeaconModelSuccess());
					dispatch(fetchModels()); //update the list of models after setting beacon model
				})
				.catch((err) => {
					dispatch(setBeaconModelFail(err.response.data));
				});
		}
	};
};

const removeBeaconModelStart = () => {
	return {
		type: actionTypes.REMOVE_BEACON_MODEL_START,
	};
};

const removeBeaconModelSuccess = () => {
	return {
		type: actionTypes.REMOVE_BEACON_MODEL_SUCCESS,
	};
};

const removeBeaconModelFail = (error) => {
	return {
		type: actionTypes.REMOVE_BEACON_MODEL_FAIL,
		error: error,
	};
};

export const removeBeaconModel = () => {
	return (dispatch, getState) => {
		dispatch(removeBeaconModelStart());
		const header = { Authorization: "Bearer " + getState().auth.token };
		const projectId = getState().activeProject.activeProject._id;
		if (!projectId) {
			dispatch(removeBeaconModelFail({ message: "The project ID was not Found" }));
		} else {
			console.log("DELETING BEACON MODEL")
			axios
				.delete("projects/" + projectId + "/beacons-model", { headers: header })
				.then((res) => {
					
					dispatch(removeBeaconModelSuccess());
					dispatch(fetchModels()); //update the list of models after removing the beacon model
				})
				.catch((err) => {
					dispatch(removeBeaconModelFail(err.response.data));
				});
		}
	};
};