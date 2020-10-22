import React from "react";
import useStyles from "./useStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "@material-ui/core";

const MyAppBar = (props) => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
						disabled={!props.isAuth}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						BimPlus Tracking App
					</Typography>
					<Link href={!props.isAuth ? "/Login" : "/Logout"} color="inherit">
						<Button color="inherit">{!props.isAuth ? "Login" : "Logout"}</Button>
					</Link>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default MyAppBar;
