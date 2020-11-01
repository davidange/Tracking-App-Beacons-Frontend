import React, { useEffect } from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as actions from "../../store/actions/index";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "./useStyles";
import ProjectInfoCard from "../../components/ProjectTitleInfo/ProjectTitleInfo";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import Beacons from "./Beacons/Beacons";
import BimplusViewer from "./Viewers/BimplusViewer/BimplusViewer";
import BimplusRenderer from "./Viewers/BimplusRenderer/BimplusRenderer";

const ActiveProject = (props) => {
	const { activeProject, loadingActiveProject, setActiveProject, setActiveProjectMode, match } = props;
	const classes = useStyles();
	const fixedTitleHeightPaper = clsx(classes.fixedHeightPaperTitle, classes.paper);
	const fixedHeightPaper = clsx(classes.fixedHeightPaper, classes.paper);

	useEffect(() => {
		setActiveProject(match.params.projectId);
		setActiveProjectMode(match.params.mode);
	}, [setActiveProject, setActiveProjectMode, match.params.projectId, match.params.mode]);

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
			<Container className={classes.container} maxWidth="xl">
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<Paper className={fixedTitleHeightPaper}>{projectInfo}</Paper>
					</Grid>
					<Grid item xs={12} sm={4}>
						<Paper className={fixedHeightPaper}>
							<Switch>
								{match.params.mode === "ProjectSetup" ? (
									<Route path={`${match.path}/Beacons`} component={Beacons} />
								) : null}
							</Switch>
						</Paper>
					</Grid>
					<Grid item xs={12} sm={8}>
						<Paper className={fixedHeightPaper}>
							<Switch>
								{match.params.mode === "ProjectSetup" && activeProject ? (
									<Route
										path={`${match.path}`}
										render={() => (
											<BimplusViewer
												teamId={activeProject.team_id}
												projectId={activeProject._id}
												domElementId={"bimViewer"}
											/>
										)}
									/>
								) : null}
								{match.params.mode === "Tracking" && activeProject ? (
									<Route
										path={`${match.path}`}
										render={() => (
											<BimplusRenderer
												teamSlug={activeProject.slug}
												projectId={activeProject._id}
												domElementId={"bimRenderer"}
											/>
										)}
									/>
								) : null}
							</Switch>
						</Paper>
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
		setActiveProjectMode: (mode) => dispatch(actions.setActiveProjetMode(mode)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveProject);
