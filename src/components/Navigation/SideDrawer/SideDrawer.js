import React from "react";
import { withRouter } from "react-router-dom";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import useStyles from "./useStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const mapItemsToList = (items, history) => {
	return items.map((item) => {
		const { text, icon, route } = item;
		return (
			<ListItem button key={text} onClick={() => history.push(route)}>
				{icon && <ListItemIcon>{icon}</ListItemIcon>}
				<ListItemText primary={text} />
			</ListItem>
		);
	});
};

const SideDrawer = (props) => {
	const classes = useStyles();
	let { isDrawerOpen, toggleDrawer, activeProject, activeProjectMode, history } = props;
	const projectId = activeProject && activeProject._id;

	const defaultItems = [
		{
			text: "Select Project",
			route: "/Projects",
		},
	];
	const defaultListItems = mapItemsToList(defaultItems, history);

	let activeProjectDefaultItems = [
		{
			text: "Project Setup",
			route: "/ActiveProject/".concat(projectId).concat("/ProjectSetup"),
		},
		{
			text: "Tracking Items/Users",
			route: "/ActiveProject/".concat(projectId).concat("/Tracking"),
		},
	];
	let activeProjectListDefaultItems = null;

	let projectSetupItems = [
		{
			text: "Beacon Model",
			route: "/ActiveProject/".concat(projectId).concat("/ProjectSetup/BeaconModel"),
		},
		{
			text: "Beacons Setup",
			route: "/ActiveProject/".concat(projectId).concat("/ProjectSetup/Beacons"),
		},
	];

	let trackedItems = [
		{
			text: "Tracked Items",
			route: "/ActiveProject/".concat(projectId).concat("/Tracking/Items"),
		},
		{
			text: "Tracked Users",
			route: "/ActiveProject/".concat(projectId).concat("/Tracking/Users"),
		},
	];

	let modeItems = null;

	if (activeProject) {
		activeProjectListDefaultItems = mapItemsToList(activeProjectDefaultItems, history);
		if (activeProjectMode) {
			switch (activeProjectMode) {
				case "ProjectSetup":
					modeItems = mapItemsToList(projectSetupItems, history);
					break;
				case "Tracking":
					modeItems = mapItemsToList(trackedItems, history);
					break;
				default:
			}
		}
	}

	return (
		<SwipeableDrawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
			<div className={classes.list} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
				<List>{defaultListItems}</List>
				<Divider />
				{activeProject && <List>{activeProjectListDefaultItems}</List>}
				{activeProjectMode ? (
					<React.Fragment>
						<Divider />
						<List>{modeItems}</List>
					</React.Fragment>
				) : null}
			</div>
		</SwipeableDrawer>
	);
};

export default withRouter(SideDrawer);
