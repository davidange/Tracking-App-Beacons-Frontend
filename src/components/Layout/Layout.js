import React from "react";

import Toolbar from "../Navigation/Toolbar/Toolbar";

const layout = (props) => {
    console.log('RENDERED LAYOUT')
	return (
		<React.Fragment>
			<Toolbar></Toolbar>
			<main>{props.children}</main>
		</React.Fragment>
	);
};

export default layout;
