//list of pokemon
let pokemonList = [
  {
    name: "Weedle",
    number: 13,
    height: 1.0,
    types: ["Bug", "Poison"],
    weaknesses: ["Fire", "Psychic", "Flying", "Rock"],
  },
  {
    name: "Jigglypuff",
    number: 39,
    height: 1 + 2 / 3,
    types: ["Normal", "Fairy"],
    weaknesses: ["Steel", "Poison"],
  },
  {
    name: "Poliwag",
    number: 60,
    height: 2.0,
    types: ["Water"],
    weaknesses: ["Grass", "Electric"],
  },
];

//loops through the pokemon list
for (let i = 0; i < pokemonList.length; i++) {
  let statement = "";
  //checks if height is at least 2. If so, states it's big!
  if (`${pokemonList[i].height}` >= 2) {
    statement = "- Wow, that's big!";
  } else {
    statement = "";
  }
  //shows pokemon name and height each on their own row
  document.write(
    `<div>${pokemonList[i].name} (height: ${pokemonList[i].height}) ${statement}</div>`
  );
}
