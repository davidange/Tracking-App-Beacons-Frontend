import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
	root: {
		direction: "column",
		alignItems: "center",
		"& > *": {
			margin: theme.spacing(1),
		},
	},
	GridBeacons: {
		direction: "column",
		alignItems: "center",
		padding: theme.spacing(1)
	},
	buttonsDiv: {
		textAlign: "center",
		paddingTop: "20px",
		"& button": {
			margin: theme.spacing(1),
		},
	},
}));

export default useStyles;
