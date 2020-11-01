import React from "react";
import useBimplusRenderer from "../../../../hooks/useBimplusRenderer";

const BimplusRenderer = (props) => {
	const {  projectId,domElementId,teamSlug} = props;
	// eslint-disable-next-line no-unused-vars
	const [rendererObject] = useBimplusRenderer( projectId,domElementId,teamSlug);

	const renderer = (
		<div
			id={domElementId}
			style={{ border: 0, height: "100%", width: "100%", backgroundColor: "#adadad", margin: 0, padding: 0 }}
		></div>
	);

	return <React.Fragment>{renderer}</React.Fragment>;
};

export default BimplusRenderer;
