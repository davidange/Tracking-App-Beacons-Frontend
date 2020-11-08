import React from "react";
import useStyles from "./useStyles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";

const ModelCard = (props) => {
	const classes = useStyles();
	const { name, setAsBeaconModel, setBeaconModelHandler, removeBeaconModelHandler } = props;

	const inactiveCard = clsx(classes.root, classes.inactiveCard);
	return (
		<Card className={setAsBeaconModel ? classes.root : inactiveCard}>
			<CardContent>
				<Typography className={classes.title} variant="h4" gutterBottom>
					{name}
				</Typography>
				<Typography className={classes.pos} color="textSecondary">
					{setAsBeaconModel ? "current Beacon Model" : ""}
				</Typography>
			</CardContent>
			<CardActions>
				{setAsBeaconModel ? <Button size="small" onClick={removeBeaconModelHandler} color="primary">
					Remove as Beacon Model
				</Button> : <Button size="small" onClick={setBeaconModelHandler} color="primary">
					Set as Beacon Model
				</Button>}
			</CardActions>
		</Card>
	);
};

export default ModelCard;
