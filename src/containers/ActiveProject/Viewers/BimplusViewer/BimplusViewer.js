import React, { useEffect, useState } from "react";
import useBimplusExplorer from "../../../../hooks/useBimplusExplorer";

const BimplusViewer = (props) => {
	const teamId = "00e0e85f-4b1d-43a6-8902-6fb1003b7c3b";
	const projectId = "ecbdb0ee-b430-4ac8-a29b-51a36f1e4c45";
	const [explorer, isExplorerLoaded] = useBimplusExplorer(teamId, projectId);
	const [loadingMessage, setLoadingMessage] = useState(<h1>Loading....</h1>);
	const [showRenderer, setShowRenderer] = useState(true);
	const renderer = (
		<iframe
			title="Renderer"
			id="bimplusExplorer"
			style={{ border: 0, height: "100%", width: "100%", backgroundColor: "white", margin: 0, padding: 0 }}
			hidden={!showRenderer}
		></iframe>
	);

	// useEffect(() => {
	// 	if (explorer) {
	// 		setShowRenderer(true);
	// 	}
	// }, [explorer, showRenderer]);

	return (
		<React.Fragment>
			{renderer}
		</React.Fragment>
	);
};

export default BimplusViewer;
