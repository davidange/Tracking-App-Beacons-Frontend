import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions/index";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AlertSnackbar = (props) => {

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		props.closeSnackbar();
	};

	return (
		<Snackbar open={props.snackbarOpen} autoHideDuration={6000} onClose={handleClose}>
			<Alert onClose={handleClose} severity={props.snackbarType}>
				{props.snackbarMessage}
			</Alert>
		</Snackbar>
	);
};


const mapStateToProps = (state) => {
	return {
		snackbarOpen: state.snackbar.snackbarOpen,
		snackbarType: state.snackbar.snackbarType,
		snackbarMessage: state.snackbar.snackbarMessage,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		closeSnackbar: () => dispatch(actions.closeSnackbar()),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(AlertSnackbar);
