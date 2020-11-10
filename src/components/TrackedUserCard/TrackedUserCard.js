import React from "react";
import useStyles from "./useStyles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";

const TrackedUserCard = (props) => {
	const classes = useStyles();
	const { name, id, viewTrackedUserHandler, dialogOpenHandler, toggleStatus, toggleHandleChange } = props;

	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography className={classes.title} variant="h4" gutterBottom>
					{name}
				</Typography>
				<Typography variant="body2" component="p">
					ID:{id}
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small" onClick={viewTrackedUserHandler} color="primary">
					View
				</Button>
				<Button size="small" onClick={dialogOpenHandler} color="primary">
					Details
				</Button>
				<FormControlLabel
					control={
						<Switch checked={toggleStatus} onChange={toggleHandleChange} name="tracking" color="primary" size="small" />
					}
					label="SHOW"
				/>
			</CardActions>
		</Card>
	);
};

export default TrackedUserCard;
