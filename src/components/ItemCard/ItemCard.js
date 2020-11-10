import React from "react";
import useStyles from "./useStyles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";

const ItemCard = (props) => {
	const classes = useStyles();
	const { name, id, viewItemHandler, dialogOpenHandler } = props;

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
				<Button size="small" onClick={viewItemHandler} color="primary">
					View
				</Button>
				<Button size="small" onClick={dialogOpenHandler} color="primary">
					Details
				</Button>
			</CardActions>
		</Card>
	);
};

export default ItemCard;
