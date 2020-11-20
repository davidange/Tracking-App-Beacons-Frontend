import { io } from "socket.io-client";
import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import usePrevious from "./usePrevious";
import * as actions from "../store/actions/index";

const ENDPOINT = "localhost:3000";

const useEntitiesUpdatesSocket = () => {
	const activeProject = useSelector((state) => state.activeProject.activeProject);
	const trackedEntities = useSelector((state) => state.activeProject.trackedEntities);
	const previousTrackedEntities = usePrevious(trackedEntities);
	const [socket, setSocket] = useState(null);
	const dispatch = useDispatch();
	const updateEntityLocation = useCallback((id, x, y, z) => dispatch(actions.updateTrackingEntityLocation(id,x, y, z)), [
		dispatch,
	]);
	//setup socket and join the Project Room
	useEffect(() => {
		if (activeProject && !socket) {
			let tempSocket = io(ENDPOINT, { transports: ["websocket", "polling", "flashsocket"] });
			tempSocket.emit("join", activeProject._id);
			setSocket(tempSocket);
			console.log("joining room :", activeProject);
		}

		return () => {
			if (socket) {
				socket.disconnect();
				socket.off();
			}
		};
	}, [activeProject, socket]);

	//set the event Listeners
	useEffect(() => {
		if (socket) {
			//initial hash table with tracked entities where added
			let newTrackedEntities = { ...trackedEntities };
			//initia hash table with tracked entities that where deleted
			let erasedTrackedEntities = { ...previousTrackedEntities };
			//compare the difference between both objects after first push
			if (previousTrackedEntities !== undefined) {
				for (let id in trackedEntities) {
					if (previousTrackedEntities[id]) {
						delete newTrackedEntities[id];
						delete erasedTrackedEntities[id];
					}
				}
			}
			//add event listeners to newly added  Tracked Entities
			for (let id in newTrackedEntities) {
				socket.on(`entity-new-location-${id}`, ({location}) => {
					console.log("Has changed location of ", id, "to: ", location);
					const { x, y, z } = location;
					updateEntityLocation(id, x, y, z);
				});
			}
			//erase event listeners to Entities
			for (let id in erasedTrackedEntities) {
				socket.off(`entity-new-location-${id}`);
			}
		}
	}, [trackedEntities, socket, previousTrackedEntities, updateEntityLocation]);

	return null;
};
export default useEntitiesUpdatesSocket;
