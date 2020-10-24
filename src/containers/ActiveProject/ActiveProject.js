import React, { useEffect } from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "./useStyles";
import ProjectInfoCard from "../../components/ProjectTitleInfo/ProjectTitleInfo";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

const ActiveProject = (props) => {
	const { activeProject, loadingActiveProject, setActiveProject, match } = props;
	const classes = useStyles();
	const fixedTitleHeightPaper = clsx(classes.fixedHeightPaperTitle, classes.paper);
	const fixedHeightPaper = clsx(classes.fixedHeightPaper, classes.paper);

	useEffect(() => {
		setActiveProject(match.params.projectId);
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
		projectInfo = <ProjectInfoCard projectName={activeProject.name} projectTeam={activeProject.team_name} />;
	}

	return (
		<div className={classes.root}>
			<Container className={classes.container}>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<Paper className={fixedTitleHeightPaper}>{projectInfo}</Paper>
					</Grid>
					<Grid item xs={12} sm={4}>
						<Paper className={fixedHeightPaper}>Sidebar</Paper>
					</Grid>
					<Grid item xs={12} sm={8}>
						<Paper className={fixedHeightPaper}>Main Content</Paper>
					</Grid>
					<Grid item xs={12}>
						<Paper className={classes.paper}>Footer</Paper>
					</Grid>
				</Grid>
			</Container>
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
