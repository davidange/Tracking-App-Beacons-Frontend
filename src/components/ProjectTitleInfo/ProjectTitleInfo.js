import React from "react";
import Typography from "@material-ui/core/Typography";

const ProjectTitleInfo = (props) => {
	const { projectName, projectTeam } = props;

	return (
		<React.Fragment>
			 <Typography component="h2" variant="h5" color="primary" gutterBottom>
				Project: {projectName}
			</Typography>
			<Typography  color="textSecondary">
				Team: {projectTeam}
			</Typography>
		</React.Fragment>
	);
};
export default ProjectTitleInfo;
