import React from 'react';

import { person } from "../data/data"

function Person(props:person) {
return (
		<p className="result-text glitch" data-text={props.name}>
            {props.name}
		</p>
	);
}

export default Person;
