import React, { useEffect, useState } from "react";
import useStyles from "./useStyles";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import CircularProgress from "@material-ui/core/CircularProgress";
import ItemCard from "../../../components/ItemCard/ItemCard";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import RefreshIcon from "@material-ui/icons/Refresh";

const Items = (props) => {
  const { items, fetchItems, loadingItems } = props;
  const classes = useStyles();

  useEffect(() => {
    console.log("Should call fetching Function for items");
    fetchItems();
  }, [fetchItems]);

  //Close Dialog box when  Update of UID has been done

  let loadingCircle = null;
  if (loadingItems) {
    loadingCircle = <CircularProgress color="secondary" size={100} />;
  }

  let listItems = null;
  if (!loadingItems && items) {
    listItems = (
      <Grid container>
        {items.map((item) => {
          return (
            <Grid item xs={12} key={item.item_id} className={classes.GridBeacons}>
              <ItemCard
                name={item.name}
                x={item.location.x}
                y={item.location.y}
                z={item.location.z}
                id={item.item_id}
                viewItemHandler={() => ViewHandler()}
              />
            </Grid>
          );
        })}
      </Grid>
    );
  }


  const ViewHandler = () => {
    console.log("View Item")

  };



  return (
    <React.Fragment>
      <Grid container className={classes.root}>
        <div className={classes.buttonsDiv}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => fetchItems()}
            startIcon={<RefreshIcon />}
          >
            Update List
          </Button>
        </div>
        {loadingCircle}
        {listItems}
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.activeProjectItem.items,
    loadingItems: state.activeProjectItem.loading,
    error: state.activeProjectItem.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchItems: () => dispatch(actions.fetchItems()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Items);
