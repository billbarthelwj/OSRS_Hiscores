import React from 'react';
import ReactDOM from 'react-dom';
import COLLECT_USER_INPUTS from './collectUserInputs';//importing the component from .jsx
import FUNCTIONAL_COMPONENTS from './functionalComponents';

ReactDOM.render
(
    <React.StrictMode>
        <FUNCTIONAL_COMPONENTS/>
        <COLLECT_USER_INPUTS/>
    </React.StrictMode>,
     document.getElementById('root')//Root is a div element in index.html
)