import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
	Hud: {
		position: "absolute",
		marginTop: "10px",
		marginLeft: "10px",
		zIndex: 2,
		margin: theme.spacing(1),
		display: "flex",
		flexFlow: "row wrap",
	},
	margin: {
		margin: theme.spacing(1),
	},
}));

export default useStyles;
