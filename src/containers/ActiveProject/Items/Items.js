import React, { useEffect, useState } from "react";
import useStyles from "./useStyles";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import CircularProgress from "@material-ui/core/CircularProgress";
import ItemCard from "../../../components/ItemCard/ItemCard";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import RefreshIcon from "@material-ui/icons/Refresh";
import ItemDetailDialog from "./ItemDetailDialog/ItemDetailDialog";

const Items = (props) => {
	const { items, fetchItems, loadingItems, trackedEntities, startTrackingItem, stopTrackingItem } = props;
	const classes = useStyles();
	const [openDialogDetail, setOpenDialogDetail] = useState(false);
	const [detailInfo, setDetailInfo] = useState(null);

	useEffect(() => {
		console.log("Should call fetching Function for items");
		fetchItems();
	}, [fetchItems]);

	//Close Dialog box when  Update of UID has been done
	useEffect(() => {
		if (!loadingItems) {
			setOpenDialogDetail(false);
		}
	}, [loadingItems]);

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
								dialogOpenHandler={() =>
									dialogOpenHandler(
										item.name,
										item.item_id,
										item.location.x,
										item.location.y,
										item.location.z,
										item.description
									)
								}
								toggleStatus={trackedEntities[item.item_id] ? true : false}
								toggleHandleChange={() =>
									trackedEntitiesToggle(item.item_id, item.location.x, item.location.y, item.location.z)
								}
							/>
						</Grid>
					);
				})}
			</Grid>
		);
	}

	const ViewHandler = () => {
		console.log("View Item");
	};

	const dialogOpenHandler = (name, id, x, y, z, description) => {
		setDetailInfo({ name: name, id: id, x: x, y: y, z: z, description: description });
		setOpenDialogDetail(true);
	};

	const dialogCloseHandler = () => {
		setOpenDialogDetail(false);
	};

	const trackedEntitiesToggle = (id, x, y, z) => {
		if (!trackedEntities[id]) {
			startTrackingItem(id, x, y, z);
		} else {
			stopTrackingItem(id);
		}
	};

	return (
		<React.Fragment>
			<Grid container className={classes.root}>
				<div className={classes.buttonsDiv}>
					<Button variant="contained" color="secondary" onClick={() => fetchItems()} startIcon={<RefreshIcon />}>
						Update List
					</Button>
				</div>
				{loadingCircle}
				{listItems}
			</Grid>
			{detailInfo ? (
				<ItemDetailDialog
					open={openDialogDetail}
					closeHandler={dialogCloseHandler}
					name={detailInfo.name}
					id={detailInfo.id}
					description={detailInfo.description}
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
		items: state.activeProjectItem.items,
		loadingItems: state.activeProjectItem.loading,
		error: state.activeProjectItem.error,
		trackedEntities: state.activeProject.trackedEntities, //list of tracked entitites that user wants to refresh on Renderer
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchItems: () => dispatch(actions.fetchItems()),
		startTrackingItem: (id, x, y, z) => dispatch(actions.startTrackingEntity(id, "TrackedItem", x, y, z)),
		stopTrackingItem: (id) => dispatch(actions.stopTrackingEntity(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Items);
