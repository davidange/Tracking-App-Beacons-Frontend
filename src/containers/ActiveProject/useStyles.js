import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	gridContainer: {
		display: "grid",
		gridTemplateColumns: "1fr 1fr 1fr 1fr",
		gridTemplateRows: ".4fr 2.2fr 0.4fr",
		gap: "10px 10px",
		gridTemplateAreas: `"TitleBar TitleBar TitleBar TitleBar"
        "SideBar Main Main Main"
        "Footer Footer Footer Footer"`,
		height: "90vh",
		paddingTop:"15px"
	},

	titleBar: { gridArea: "TitleBar" },
	sideBar: { gridArea: "SideBar" },
	Main: { gridArea: "Main" },
	footer: { gridArea: "Footer" },

	title: {
		alignItems: "center",
	},
}));

export default useStyles;
