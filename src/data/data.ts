export type person = {
	not_id: number,
	name: string,
	temp: number,
	likes: string,
	gender: boolean
}

export const persons:person[] = [
	{
		not_id: 1337,
		name: "Ponas",
		temp: 20,
		likes: "Unicorns",
		gender: true
	},
	{
		not_id: 42,
		name: "Jemps",
		temp: 15,
		likes: "Cats",
		gender: true
	},
	{
		not_id: 42,
		name: "Amam",
		temp: 18,
		likes: "Doggos",
		gender: false
	},
	{
		not_id: 420,
		name: "Jemmer",
		temp: 20,
		likes: "Beer",
		gender: false
	},
	{
		not_id: 666,
		name: "Philler",
		temp: 15,
		likes: "Linux",
		gender: false
	},
	{
		not_id: 34,
		name: "Holzer",
		temp: 25,
		likes: "golang",
		gender: true
	},
]

/* Umfrage:
Was ist deine Temperatur?
Welche Zahl?
Wähle ein Geschlecht: True | False (Wenn alle das Gleiche nehmen, nehme ich Männer = true)
Was magst du? (Ein Wort)
*/