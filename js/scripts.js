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

for (i = 0; i < pokemonList.length; i++) {
  document.write(`<div>${pokemonList[i].name}</div>`);
}
