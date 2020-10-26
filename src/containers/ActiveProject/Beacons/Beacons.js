import React, { useEffect } from "react";
import useStyles from "./useStyles";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import CircularProgress from "@material-ui/core/CircularProgress";
import BeaconCard from "../../../components/BeaconCard/BeaconCard";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const Beacons = (props) => {
	const { beacons, fetchBeacons, loadingBeacons } = props;
	const classes = useStyles();


	useEffect(() => {
		fetchBeacons();
	}, [fetchBeacons]);

	let loadingCircle = null;
	if (loadingBeacons) {
		loadingCircle = <CircularProgress color="secondary" size={100} />;
	}
	let listBeacons = null;
	if (!loadingBeacons && beacons) {
		listBeacons = (
			<Grid container >
				{beacons.map((beacon) => {
					return (
						<Grid item xs={12} key={beacon._id} className={classes.GridBeacons}>
							<BeaconCard
								isBeaconActive={beacon.is_active}
								name={beacon.name}
								uid={beacon.uid_beacon ? beacon.uid_beacon : null}
								setBeaconUIDHandler={() => null}
								selectBeaconHandler={()=>null}
							/>
						</Grid>
					);
				})}
			</Grid>
		);
	}

	return (
		<Grid container className={classes.root}>
			<div className={classes.buttonsDiv}>
				<Button variant="contained" color="secondary" onClick={() => fetchBeacons()}>
					Update List of Beacons
				</Button>
			</div>
			{loadingCircle}
			{listBeacons}
		</Grid>
	);
};

const mapStateToProps = (state) => {
	return {
		beacons: state.activeProjectBeacons.beacons,
		loadingBeacons: state.activeProjectBeacons.loading,
		error: state.activeProjectBeacons.error,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchBeacons: () => dispatch(actions.fetchBeacons()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Beacons);
