import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "./useStyles";
import ProjectInfoCard from "../../components/Cards/ProjectInfoCard/ProjectInfoCard";
import Container from '@material-ui/core/Container'

const ActiveProject = (props) => {
	const { activeProject, loadingActiveProject, setActiveProject, match } = props;
	const classes = useStyles();
	console.log("---------");
	console.log(match);

	useEffect(() => {
		setActiveProject(match.params.projectId);
		console.log("SET ACTIVE PROJECT!!");
	}, [setActiveProject, match.params.projectId]);

	if (loadingActiveProject) {
		return (
			<div className={classes.center}>
				<CircularProgress color="secondary" size={200} />
			</div>
		);
	}

	let projectInfo = null;
	if (activeProject) {
		console.log(activeProject);
		projectInfo = <ProjectInfoCard projectName={activeProject.name} projectTeam={activeProject.team_name} />;
	}

	return (
		<div className={classes.gridContainer}>
			<div className={classes.titleBar}><Container>{projectInfo}</Container></div>
			<div className={classes.sideBar}>a</div>
			<div className={classes.Main}>e</div>
			<div className={classes.footer}>i</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		activeProject: state.activeProject.activeProject,
		loadingActiveProject: state.activeProject.loading,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setActiveProject: (projectId) => dispatch(actions.setActiveProject(projectId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveProject);
