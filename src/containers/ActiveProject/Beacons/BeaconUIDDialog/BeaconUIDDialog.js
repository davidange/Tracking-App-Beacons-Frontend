import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const BeaconUIDDialog = (props) => {
	const { closeHandler, open, beaconUID, beaconName, setBeaconUIDHandler } = props;
	const [beaconUIDInput, setBeaconUIDInput] = useState(beaconUID);

	useEffect(() => {
		setBeaconUIDInput(beaconUID);
	}, [beaconUID]);

	const beaconUIDChangedHandler = (event) => {
		setBeaconUIDInput(event.target.value);
	};


	return (
		<div>
			<Dialog open={open} onClose={closeHandler} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Set Beacon UID</DialogTitle>
				<DialogContent>
					<TextField margin="dense" id="name" label="Name:" type="text" fullWidth disabled value={beaconName} />
					<TextField
						autoFocus
						margin="dense"
						id="beaconUID"
						label="Beacon UID"
						type="text"
						fullWidth
						value={beaconUIDInput}
						onChange={beaconUIDChangedHandler}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={closeHandler} color="primary">
						Cancel
					</Button>
					<Button onClick={() => setBeaconUIDHandler(beaconUIDInput)} color="primary">
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default BeaconUIDDialog;
