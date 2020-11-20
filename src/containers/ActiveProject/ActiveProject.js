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
import BeaconModel from "./BeaconModels/BeconModel";
import Items from "./Items/Items";
import TrackedUsers from "./TrackedUsers/TrackedUsers";
import BimplusRenderer from "./Viewers/BimplusRenderer/BimplusRenderer";
import useEntitiesUpdatesSocket from '../../hooks/useEntitiesUpdatesSocket'

const ActiveProject = (props) => {
	const { activeProject, loadingActiveProject, setActiveProject, setActiveProjectMode, match } = props;
	const classes = useStyles();
	const fixedTitleHeightPaper = clsx(classes.fixedHeightPaperTitle, classes.paper);
	const fixedHeightPaper = clsx(classes.fixedHeightPaper, classes.paper);

	useEffect(() => {
		//no active Projcet or previous active project was different
		if (!activeProject || (activeProject && activeProject._id !== match.params.projectId)) {
			console.log("SETTING ACTIVE PROJECT");
			setActiveProject(match.params.projectId);
			
		}
		console.log("SETING ACTIVE PROJECT MODE");
		setActiveProjectMode(match.params.mode);
	}, [setActiveProject, setActiveProjectMode, match.params.projectId, match.params.mode, activeProject]);

	useEntitiesUpdatesSocket();
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
							{activeProject ? (
								<Switch>
									{match.params.mode === "ProjectSetup" ? (
										<Route path={`${match.path}/BeaconModel`} component={BeaconModel} />
									) : null}
									{match.params.mode === "ProjectSetup" ? (
										<Route path={`${match.path}/Beacons`} component={Beacons} />
									) : null}
									{match.params.mode === "Tracking" ? (
										<Route path={`${match.path}/Users`} component={TrackedUsers} />
									) : null}
									{match.params.mode === "Tracking" ? <Route path={`${match.path}/Items`} component={Items} /> : null}
								</Switch>
							) : null}
						</Paper>
					</Grid>
					<Grid item xs={12} sm={8}>
						<Paper className={fixedHeightPaper}>
							{activeProject ? (
								<Route
									path={`${match.path}`}
									render={() => (
										<BimplusRenderer
											teamId={activeProject.team_id}
											projectId={activeProject._id}
											domElementId={"bimRenderer"}
										/>
									)}
								/>
							) : null}
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
