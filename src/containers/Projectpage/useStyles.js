import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	buttonsDiv: {
		textAlign: "center",
		paddingTop: "20px",
		"& button": {
			margin: theme.spacing(1),
		},
	},
}));

export default useStyles;
