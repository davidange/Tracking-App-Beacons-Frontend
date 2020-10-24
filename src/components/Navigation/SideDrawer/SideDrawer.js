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
	let { isDrawerOpen, toggleDrawer, activeProject, history } = props;
	
	console.log("!!!!!!!")
	console.log(activeProject)
	const defaultItems = [
		{
			text: "Select Project",
			route: "/Projects",
		},
	];
	const defaultListItems = mapItemsToList(defaultItems, history);

	let activeProjectDefaultItems=null;
	let activeProjectListDefaultItems =null;


	if(activeProject){

		activeProjectDefaultItems = [
			{
				text: "Project Setup",
				route: "/ActiveProject/".concat(activeProject._id),
			},
			{
				text: "Tracking Items/Users",
				route:"/ActiveProject/".concat(activeProject._id)
			},
		];
		activeProjectListDefaultItems = mapItemsToList(activeProjectDefaultItems, history);
		
	}
	


	return (
		<SwipeableDrawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
			<div className={classes.list} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
				<List>{defaultListItems}</List>
				<Divider />
				{activeProject && <List>{activeProjectListDefaultItems}</List>}
			</div>
		</SwipeableDrawer>
	);
};

export default withRouter(SideDrawer);
