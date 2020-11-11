import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const ItemDetailDialog = (props) => {
	const { closeHandler, open, name, id, x, y, z, description } = props;

	return (
		<div>
			<Dialog open={open} onClose={closeHandler} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Details</DialogTitle>
				<DialogContent>
					<TextField margin="dense" id="name" label="Name:" type="text" fullWidth disabled value={name} />
                    <TextField margin="dense" id="id" label="ID:" type="text" fullWidth disabled value={id} />
					<TextField margin="dense" id="description" label="Description:" type="text" fullWidth disabled value={description} />
					<TextField margin="dense" id="x" label="X:" type="text" fullWidth disabled value={x} />
					<TextField margin="dense" id="y" label="Y:" type="text" fullWidth disabled value={y} />
					<TextField margin="dense" id="z" label="Z:" type="text" fullWidth disabled value={z} />					
				</DialogContent>
				<DialogActions>
					<Button onClick={closeHandler} color="primary">
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default ItemDetailDialog;
