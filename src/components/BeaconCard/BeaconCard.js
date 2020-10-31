import React from "react";
import useStyles from "./useStyles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";

const BeaconCard = (props) => {
	const classes = useStyles();
	const { isBeaconActive, name, uid, setBeaconUIDHandler, viewBeaconHandler } = props;

	const inactiveCard = clsx(classes.root, classes.inactiveCard);
	return (
		<Card className={isBeaconActive ? classes.root : inactiveCard}>
			<CardContent>
				<Typography className={classes.title} variant="h4" gutterBottom>
					{name}
				</Typography>
				<Typography className={classes.pos} color="textSecondary">
					{isBeaconActive ? "Active" : "Not Active"}
				</Typography>
				<Typography variant="body2" component="p">
					UID:{uid ? uid : "None"}
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small" onClick={setBeaconUIDHandler} color="primary">
					Set Beacon UID
				</Button>
				<Button size="small" onClick={viewBeaconHandler} color="primary">
					View
				</Button>
			</CardActions>
		</Card>
	);
};

export default BeaconCard;
