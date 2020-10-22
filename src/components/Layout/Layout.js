import React from "react";

import AppBar from "../Navigation/AppBar/AppBar";

const layout = (props) => {
	console.log("RENDERED LAYOUT");
	return (
		<React.Fragment>
			<AppBar
				isAuth={props.isAuth}
			></AppBar>
			<main>{props.children}</main>
		</React.Fragment>
	);
};

export default layout;
