import React, { useEffect, useState } from "react";
import useStyles from "./useStyles";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import CircularProgress from "@material-ui/core/CircularProgress";
import BeaconCard from "../../../components/BeaconCard/BeaconCard";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import BeaconUIDDialog from "./BeaconUIDDialog/BeaconUIDDialog";
import RefreshIcon from "@material-ui/icons/Refresh";

const Beacons = (props) => {
	const { beacons, fetchBeacons, loadingBeacons, setBeaconUID, loadingUpdateUID, errorMessageUpdateUID } = props;
	const classes = useStyles();
	const [openDialogBeacon, setOpenDialogBeacon] = useState(false);
	const [beaconInfo, setBeaconInfo] = useState(null);

	useEffect(() => {
		fetchBeacons();
	}, [fetchBeacons]);

	//Close Dialog box when  Update of UID has been done
	useEffect(() => {
		if (!loadingUpdateUID) {
			setOpenDialogBeacon(false);
		}
	}, [loadingUpdateUID]);

	let loadingCircle = null;
	if (loadingBeacons) {
		loadingCircle = <CircularProgress color="secondary" size={100} />;
	}
	let listBeacons = null;
	if (!loadingBeacons && beacons) {
		listBeacons = (
			<Grid container>
				{beacons.map((beacon) => {
					return (
						<Grid item xs={12} key={beacon._id} className={classes.GridBeacons}>
							<BeaconCard
								isBeaconActive={beacon.is_active}
								name={beacon.name}
								uid={beacon.uid_beacon ? beacon.uid_beacon : null}
								setBeaconUIDHandler={() => dialogOpenHandler(beacon.name, beacon.uid_beacon, beacon._id)}
								selectBeaconHandler={() => null}
							/>
						</Grid>
					);
				})}
			</Grid>
		);
	}

	const dialogOpenHandler = (beaconName, beaconUID, beaconID) => {
		setBeaconInfo({ name: beaconName, uid: beaconUID, id: beaconID });
		setOpenDialogBeacon(true);
	};

	const dialogCloseHandler = () => {
		setOpenDialogBeacon(false);
	};

	const setBeaconUIDHandler = (beaconUID) => {
		setBeaconUID(beaconInfo.id, beaconUID);
	};

	return (
		<React.Fragment>
			<Grid container className={classes.root}>
				<div className={classes.buttonsDiv}>
					<Button variant="contained" color="secondary" onClick={() => fetchBeacons()} startIcon={<RefreshIcon />}>
						Update List
					</Button>
				</div>
				{loadingCircle}
				{listBeacons}
			</Grid>
			{beaconInfo ? (
				<BeaconUIDDialog
					open={openDialogBeacon}
					closeHandler={dialogCloseHandler}
					beaconName={beaconInfo.name}
					beaconUID={beaconInfo.uid}
					setBeaconUIDHandler={setBeaconUIDHandler}
					errorMessate={errorMessageUpdateUID}
				/>
			) : null}
		</React.Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		beacons: state.activeProjectBeacons.beacons,
		loadingBeacons: state.activeProjectBeacons.loading,
		error: state.activeProjectBeacons.error,
		loadingUpdateUID: state.activeProjectBeacons.loadingAction,
		errorMessageUpdateUID: state.activeProjectBeacons.errorAction,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchBeacons: () => dispatch(actions.fetchBeacons()),
		setBeaconUID: (beaconID, beaconUID) => dispatch(actions.setBeaconUID(beaconID, beaconUID)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Beacons);
