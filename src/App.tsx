import React, {useState} from 'react';
import './App.css';

import { persons, person } from "./data/data"
import Person from "./Person/Person"
import { wait } from '@testing-library/react';

function App() {
	const [chosen, setChosen]:person|any = useState(undefined)

	let currTemp:number|undefined = undefined
	fetch("https://fcc-weather-api.glitch.me/api/current?lat=48.796043&lon=9.009571")
	.then(res => res.json())
	.then(result => {
		currTemp=result.main.temp
	})
	let getSomebody = async () => {
		let factors:number[] = []
		//Get factors of persons which are not random
		for (let i = 0; i < persons.length; i++) {
			factors.push(1)

			//change factor based on weather
			//Dont question this, it does not make any sense
			if (currTemp) {
				factors[i] *= (currTemp + 0.1 - persons[i].temp)%4.321
				factors[i] += 10
			} else {
				factors[i] *= persons[i].temp % 4.321
				factors[i] += 10
			}

			//change factor based on not_id and pokemon and unix date
			let request = new XMLHttpRequest()
			let pokeurl = 'https://pokeapi.co/api/v2/pokemon/'+(persons[i].not_id % 806)
			request.open('GET', pokeurl, false)  // `false` makes the request synchronous
			request.send(null);
			let pokemon = JSON.parse(request.responseText)
			factors[i] *= (
				(pokemon.weight / pokemon.base_experience) 
				* (new Date().getTime()%persons[i].not_id)
				% pokemon.stats[Math.floor(Math.random() * pokemon.stats.length)].base_stat
			)

			factors[i] %= 100//(100 / persons.length)
			factors[i] = Math.floor(factors[i])
		}

		for ( ;true; ) {
			let randPers = Math.floor(Math.random() * persons.length)
			let randNum = Math.floor(Math.random() * 100)
			setChosen(persons[randPers])
			console.log({
				randNum: randNum,
				factor: factors[randPers],
				randPers: randPers,
				pers: persons[randPers],
			})
			if (factors[randPers] < randNum + 1 && factors[randPers] > randNum - 1) {
				break;
			}
			await sleep(10)
		}


	}
return (
		<div className="main-wrapper">
			{ (chosen)
				? <>
					<h2>And the victim is:</h2>
					< Person {...chosen} />
					<div className="button resetButton" onClick={()=>{setChosen(undefined)}}>Reset</div>
				</>
				: <>
					<h2>Whom shall it be?</h2>
					<div className="button" onClick={getSomebody}>Get a totaly not random victi... eeeh victor!</div>
				</>
			}
		</div>
	);
}

var sleep = (milliseconds:number) => {
	return new Promise(resolve => setTimeout(resolve, milliseconds))
}
export default App;