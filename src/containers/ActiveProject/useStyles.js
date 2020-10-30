import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
		
	},
	fixedHeightPaperTitle: {
		height: 100,
	},

	fixedHeightPaper: {
		height: 600,
	},

	paper: {
		padding: theme.spacing(2),
		display: "flex",
		overflow: "auto",
		flexDirection: "column",
	},
	center:{
		display: "block",
		marginLeft: "auto",
		marginRight: "auto"
	}
	
}));

export default useStyles;
