import React, { useEffect, useState } from "react";
import useStyles from "./useStyles";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import CircularProgress from "@material-ui/core/CircularProgress";
import TrackedUserCard from "../../../components/TrackedUserCard/TrackedUserCard";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import RefreshIcon from "@material-ui/icons/Refresh";
import UserDetailDialog from "./UserDetailDialog/UserDetailDialog"

const TrackedUsers = (props) => {
  const { trackedUsers, fetchTrackedUsers, loadingTrackedUsers } = props;
  const classes = useStyles();
  const [openDialogDetail, setOpenDialogDetail] = useState(false);
  const [detailInfo, setDetailInfo] = useState(null);


  useEffect(() => {
    console.log("Should call fetching Function for tracked users");
    fetchTrackedUsers();
  }, [fetchTrackedUsers]);

//  Close Dialog box when  Update of UID has been done
  useEffect(() => {
		if (!loadingTrackedUsers) {
			setOpenDialogDetail(false);
		}
	}, [loadingTrackedUsers]);

  let loadingCircle = null;
  if (loadingTrackedUsers) {
    loadingCircle = <CircularProgress color="secondary" size={100} />;
  }

  let listTrackedUsers = null;
  if (!loadingTrackedUsers && trackedUsers) {
    listTrackedUsers = (
      <Grid container>
        {trackedUsers.map((trackedUser) => {
          return (
            <Grid item xs={12} key={trackedUser.user._id} className={classes.GridBeacons}>
              <TrackedUserCard
                name={trackedUser.user.name}
                id={trackedUser.user._id}
                viewTrackedUserHandler={() => ViewHandler()}
                dialogOpenHandler={()=>dialogOpenHandler(trackedUser.user.name,trackedUser.user._id,trackedUser.location.x,trackedUser.location.y,trackedUser.location.z)}
              />
            </Grid>
          );
        })}
      </Grid>
    );
  }


  const ViewHandler = () => {
    console.log("View tracked User")

  };

  const dialogOpenHandler = (name, id, x, y, z) => {
		setDetailInfo({ name: name, id: id, x: x, y: y, z: z });
		setOpenDialogDetail(true);
	};

	const dialogCloseHandler = () => {
		setOpenDialogDetail(false);
	};


  


  return (
    <React.Fragment>
      <Grid container className={classes.root}>
        <div className={classes.buttonsDiv}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => fetchTrackedUsers()}
            startIcon={<RefreshIcon />}
          >
            Update List
          </Button>
        </div>
        {loadingCircle}
        {listTrackedUsers}
      </Grid>
      {detailInfo ? (
			 	<UserDetailDialog
          open={openDialogDetail}
					closeHandler={dialogCloseHandler}
					name={detailInfo.name}
          id={detailInfo.id}
          x={detailInfo.x}
          y={detailInfo.y}
          z={detailInfo.z}
				/>
			) : null}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    trackedUsers: state.activeProjectTrackedUser.trackedUsers,
    loadingTrackedUsers: state.activeProjectTrackedUser.loading,
    error: state.activeProjectTrackedUser.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTrackedUsers: () => dispatch(actions.fetchTrackedUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackedUsers);
