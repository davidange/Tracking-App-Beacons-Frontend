import React from 'react';
import Aux from '../../hoc/auxi';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = (props) => (
    <Aux>
    <Toolbar></Toolbar>
    <main>
        {props.children}
    </main>
    </Aux>
);

export default layout;