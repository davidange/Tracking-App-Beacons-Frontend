import React, { useState, useRef, useEffect, useMemo } from "react";
import useStyles from "./useStyles";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const ExpandibleButtonToggle = (props) => {
	const { listOptions } = props;
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const anchorRef = useRef(null);

	const [toggleState, setToggleState] = useState(
		listOptions.reduce((prev, curr) => ({ ...prev, [curr.name]: true }), {})
	);

	const handleChange = (event) => {
		setToggleState({ ...toggleState, [event.target.name]: event.target.checked });
	};

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}
		setOpen(false);
	};
	// return focus to the button when we transitioned from !open -> open
	const prevOpen = useRef(open);

	useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		}

		prevOpen.current = open;
	}, [open]);

	const menuItems = useMemo(
		() =>
			listOptions.map((option) => {
				return (
					<MenuItem key={option.name}>
						<FormControlLabel
							control={
								<Switch
									checked={toggleState[option.name]}
									onChange={(event) => {
										handleChange(event);
										//option.function();
									}}
									name={option.name}
								/>
							}
							label={option.name}
						/>
					</MenuItem>
				);
			}),
		[listOptions, toggleState, handleChange]
	);

	return (
		<div className={classes.root}>
			{React.cloneElement(props.children, { onClick: handleToggle, ref: anchorRef })}
			<Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{ transformOrigin: placement === "bottom" ? "center top" : "center bottom" }}
					>
						<Paper>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList autoFocusItem={open} id="menu-list-grow">
									{menuItems}
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</div>
	);
};

export default ExpandibleButtonToggle;
