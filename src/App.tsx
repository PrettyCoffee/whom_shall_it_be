import React, {useState, useEffect} from 'react';
import './App.css';

import { persons, person } from "./data/data"
import Person from "./Person/Person"

function App() {
	const [chosen, setChosen]:person|any = useState(undefined)
	const [pokemons, setPokemons]:any = useState([])

	let date = new Date().getDate()

	var currTemp:number|undefined = undefined
	useEffect(() => {
		fetch("https://fcc-weather-api.glitch.me/api/current?lat=48.796043&lon=9.009571")
		.then(res => res.json())
		.then(result => {
			currTemp=result.main.temp
		})
		let tmpPokemons:any[] = []
		persons.forEach((person)=>{
			let request = new XMLHttpRequest()
			let pokeurl = 'https://pokeapi.co/api/v2/pokemon/' + ((person.not_id * date) % 806)
			request.open('GET', pokeurl, false)  // `false` makes the request synchronous
			request.send(null);
			tmpPokemons.push(JSON.parse(request.responseText))
			setPokemons(tmpPokemons)
		})
	}, [])
	let getSomebody = async () => {
		let tmpFactor:number = 1
		let details:{
			"name":string,
			"pokemon":any,
			"currTemp":number|undefined,
			"factor":number,
		}[] = []
		//Get factors of persons which are not random
		for (let i = 0; i < persons.length; i++) {
			tmpFactor = 1

			//change factor based on weather
			//Dont question this, it does not make any sense
			if (currTemp) {
				tmpFactor *= (currTemp + 0.1 - persons[i].temp)%4.321
				tmpFactor += 10
			} else {
				tmpFactor *= persons[i].temp % 4.321
				tmpFactor += 10
			}

			//change factor based on not_id and pokemon and unix date
			tmpFactor *= new Date().getTime() * (
				(pokemons[i].weight / pokemons[i].base_experience) 
				* pokemons[i].stats[Math.floor(Math.random() * pokemons[i].stats.length)].base_stat
			) % 100

			//Use likes and gender
			let tmpNum = 1
			if (persons[i].gender) {
				for (var j = 0; j < persons[i].likes.length; j++) {
					if (j%3 === 0) {
						tmpNum += persons[i].likes.charCodeAt(j)
					} else if (j%3 === 1) {
						tmpNum *= persons[i].likes.charCodeAt(j)
					} else {
						tmpNum /= persons[i].likes.charCodeAt(j)
					}
				}
			} else {
				for (var j = persons[i].likes.length-1; j >= 0; j--) {
					if (j%3 === 0) {
						tmpNum += persons[i].likes.charCodeAt(j)
					} else if (j%3 === 1) {
						tmpNum %= persons[i].likes.charCodeAt(j)
					} else {
						tmpNum *= persons[i].likes.charCodeAt(j)
					}
				}
			}
			tmpFactor *= tmpNum

			//Only numbers between 0 and 99
			tmpFactor %= 100//(100 / persons.length)
			tmpFactor = Math.floor(tmpFactor)

			details.push({
				"name":persons[i].name,
				"pokemon":pokemons[i],
				"currTemp":currTemp,
				"factor":tmpFactor,
			}) 
		}

		
		//Search for a person
		for ( ;true; ) {
			let randPers = Math.floor(Math.random() * persons.length)
			let randNum = Math.floor(Math.random() * 100)
			setChosen(details[randPers])
			if (details[randPers].factor < randNum + 1 && details[randPers].factor > randNum - 1) {
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
					<div className="button resetButton" onClick={getSomebody}>Meh, not what I wanted!</div>
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