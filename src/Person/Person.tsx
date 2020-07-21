import React, { useState } from 'react';

import "./Person.css"

type props = {
	[key:string]:any
	"name":string,
	"pokemon":any,
	"currTemp":string,
	"factor":number,
}

function Person(props:props) {
	const [showDetails, setShowDetails] = useState(false)
	return (
		<>
			<div className="pokemon-pic left"><img  src={(props.pokemon.sprites.back_default)?props.pokemon.sprites.back_default:props.pokemon.sprites.front_default} alt=""/></div>
			<div className="pokemon-pic right"><img  src={(props.pokemon.sprites.back_default)?props.pokemon.sprites.back_default:props.pokemon.sprites.front_default} alt=""/></div>
			<p className="result-text glitch" data-text={props.name}>
				{props.name}
			</p>
			<div className="person-details">
				{ (!showDetails)
				? <div className="details-closed" onClick={() => setShowDetails(true)}>Show Details</div>
				: <>
					<div className="details-opened" onClick={() => setShowDetails(false)}>Hide Details</div>
					<table>
						<tbody>
							<tr>
								<td>Your not-factor:</td>
								<td>&nbsp;&nbsp;{props.factor}</td>
							</tr>
							<tr>
								<td>Your Pokemon:</td>
								<td>&nbsp;&nbsp;{props.pokemon.name}</td>
							</tr>
						</tbody>
					</table>
				</> }
			</div>
		</>
	);
}

export default Person;
