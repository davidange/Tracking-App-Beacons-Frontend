import React from "react";
import useBimplusRenderer from "../../../../hooks/useBimplusRenderer";
import Hud from "../../../../components/BimplusRenderer/HUD/Hud";

const BimplusRenderer = (props) => {
	const { projectId, domElementId, teamId } = props;
	// eslint-disable-next-line no-unused-vars
	const [viewportService, isLoadingRenderer] = useBimplusRenderer(projectId, domElementId, teamId);

	const renderer = (
		<div
			id={domElementId}
			style={{ border: 0, height: "100%", width: "100%", backgroundColor: "#adadad", margin: 0, padding: 0 }}
		></div>
	);
	let hud = isLoadingRenderer ? null : <Hud viewportService={viewportService} />;

	return (
		<React.Fragment>
			{hud}
			{renderer}
		</React.Fragment>
	);
};

export default BimplusRenderer;
