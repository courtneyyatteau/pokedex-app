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

//shows pokemon name and height each on their own row
for (let i = 0; i < pokemonList.length; i++) {
  let statement = "";
    if(`${pokemonList[i].height}`>=2) {
      statement = "- Wow, that's big!";
  } else {
      statement = "";
  }
  document.write(
    `<div>${pokemonList[i].name} (height: ${pokemonList[i].height}) ${statement}</div>`
  );

}
