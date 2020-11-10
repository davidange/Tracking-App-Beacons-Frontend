import * as actionTypes from "../actions/actionTypes";

const initialState = {
	items: null,
	error: null,
	loading: false,
	loadingAction: false,
	errorAction: null,
};

const fetchItemsStart = (state, action) => {
	return {
		...state,
		items: null,
		loading: true,
		error: null,
	};
};

const fetchItemsSuccess = (state, action) => {
	return {
		...state,
		items: action.items,
		loading: false,
		error: null,
	};
};

const fetchItemsFail = (state, action) => {
	return {
		...state,
		loading: false,
		error: action.error,
	};
};



const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_ITEMS_START:
			return fetchItemsStart(state, action);
		case actionTypes.FETCH_ITEMS_SUCCESS:
			return fetchItemsSuccess(state, action);
		case actionTypes.FETCH_ITEMS_FAIL:
			return fetchItemsFail(state, action);
		default:
			return state;
	}
};

export default reducer;
