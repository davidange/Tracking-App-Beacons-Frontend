import React from "react";
import classes from "./Projectbox.module.css";

const Projectbox = (props) => {
  return (
    <div className={classes.Projectbox} onClick={props.click}>
      <h3 className={classes.Title}>{props.title}</h3>
      <p className={classes.Teamname}>{props.team}</p>
    </div>
  );
};

export default Projectbox;
