import React, { useState } from "react";

import AppBar from "../Navigation/AppBar/AppBar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout = (props) => {
	const { isAuth, activeProject } = props;
	const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

	const toggleDrawerHandler = (sideDrawerIsOpen) => (event) => {
		if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
			return;
		}
		setSideDrawerIsVisible(sideDrawerIsOpen);
	};

	return (
		<React.Fragment>
			<AppBar isAuth={isAuth} drawerToggleHandler={() => toggleDrawerHandler(!sideDrawerIsVisible)} />
			{isAuth && (
				<SideDrawer
					isDrawerOpen={sideDrawerIsVisible}
					isAuth={isAuth}
					toggleDrawer={toggleDrawerHandler}
					activeProject={activeProject}
				/>
			)}
			<main>{props.children}</main>
		</React.Fragment>
	);
};

export default Layout;
