import React, { useEffect } from "react";
import useStyles from "./useStyles";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import CircularProgress from "@material-ui/core/CircularProgress";

import ModelCard from "../../../components/ModelCard/ModelCard";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import RefreshIcon from "@material-ui/icons/Refresh";

const BeaconModel = (props) => {
  const { models, fetchModels, loadingModels, setBeaconModel, removeBeaconModel } = props;
  const classes = useStyles();

  useEffect(() => {
    console.log("Should call fetching Function for models");
    fetchModels();
  }, [fetchModels]);

  //Close Dialog box when  Update of UID has been done

  let loadingCircle = null;
  if (loadingModels) {
    loadingCircle = <CircularProgress color="secondary" size={100} />;
  }

  let listModels = null;
  if (!loadingModels && models) {
    listModels = (
      <Grid container>
        {models.map((model) => {
          return (
            <Grid item xs={12} key={model._id} className={classes.GridBeacons}>
              <ModelCard
                setAsBeaconModel={model.is_beacon_model}
                name={model.name}
                setBeaconModelHandler={() => SetHandler(model._id)}
                removeBeaconModelHandler={() => RemoveHandler()}
              />
            </Grid>
          );
        })}
      </Grid>
    );
  }

  const SetHandler = (modelID) => {
    setBeaconModel(modelID);
  };

  const RemoveHandler = () => {
    console.log("Hello??")

    removeBeaconModel();
  };



  return (
    <React.Fragment>
      <Grid container className={classes.root}>
        <div className={classes.buttonsDiv}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => fetchModels()}
            startIcon={<RefreshIcon />}
          >
            Update List
          </Button>
        </div>
        {loadingCircle}
        {listModels}
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    models: state.activeProjectModel.models,
    loadingModels: state.activeProjectModel.loading,
    error: state.activeProjectModel.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchModels: () => dispatch(actions.fetchModels()),
    setBeaconModel: (modelID) => dispatch(actions.setBeaconModel(modelID)),
    removeBeaconModel: () => dispatch(actions.removeBeaconModel()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BeaconModel);
