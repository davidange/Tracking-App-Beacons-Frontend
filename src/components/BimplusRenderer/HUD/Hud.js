import React from "react";
import useStyles from "./useStyles";
import ExpandibleButton from "./ExpandibleButton/ExpandibleButton";
import Fab from "@material-ui/core/Fab";
import VideocamIcon from "@material-ui/icons/Videocam";
import FlipIcon from "@material-ui/icons/Flip";

const viewMenu = [
	{
		name: "Reset View",
		function: null,
	},
	{
		name: "Front View",
		function: null,
	},
	{
		name: "Top View",
		function: null,
	},
	{
		name: "Side View",
		function: null,
	},
	{
		name: "Perspective View",
		function: null,
	},
];

const sectionViewMenu = [
	{
		name: "Reset Section",
		function: null,
	},
	{
		name: "X axis",
		function: null,
	},
	{
		name: "Y axis",
		function: null,
	},
	{
		name: "Z axis",
		function: null,
	},
	{
		name: "Free",
		function: null,
	},
];

const Hud = (props) => {
	const classes = useStyles();
	const { viewportService } = props;

	return (
		<div className={classes.Hud}>
			<ExpandibleButton listOptions={viewMenu}>
				<Fab size="small" color="primary" aria-label="add" className={classes.margin}>
					<VideocamIcon />
				</Fab>
			</ExpandibleButton>
			<ExpandibleButton listOptions={sectionViewMenu}>
				<Fab size="small" color="primary" aria-label="add" className={classes.margin}>
					<FlipIcon />
				</Fab>
			</ExpandibleButton>
		</div>
	);
};

export default Hud;
