import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		color: theme.palette.primary.light,
		elevation:5
	},
	inactiveCard:{
		backgroundColor: theme.palette.deactivated.main,
	},
	title: {
		fontSize: 16,
	},
	pos: {
		marginBottom: 12,
	},
}));

export default useStyles;
