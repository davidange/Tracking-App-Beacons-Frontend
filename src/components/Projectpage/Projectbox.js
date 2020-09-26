import React from 'react';
import classes from './Projectbox.module.css';




const Projectbox = (props) => {
    return (
    <div className={classes.Projectbox}>
        <p>{props.title}</p>
    </div>
    )


}


export default Projectbox;