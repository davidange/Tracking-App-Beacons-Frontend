import React from "react";
import useStyles from "./useStyles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";

const TrackedUserCard = (props) => {
	const classes = useStyles();
	const { name, id, x, y, z, viewTrackedUserHandler, dialogOpenHandler } = props;

	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography className={classes.title} variant="h4" gutterBottom>
					{name}
				</Typography>
				<Typography className={classes.pos} color="textSecondary">
					X:{x}
				</Typography>
				<Typography className={classes.pos} color="textSecondary">
					Y:{y}
				</Typography>
				<Typography className={classes.pos} color="textSecondary">
					Z:{z}
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
			</CardActions>
		</Card>
	);
};

export default TrackedUserCard;
