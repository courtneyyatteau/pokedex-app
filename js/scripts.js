//list of pokemon
let pokemonRepository = (function () {
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

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll,
  };
})();

//loops through the pokemon list
let pokemonList = pokemonRepository.getAll();
pokemonList.forEach(function (pokemon) {
  //checks if height is at least 2. If so, states it's big!
  let statement = "";
  pokemon.height >= 2 ? (statement = "- Wow, that's big!") : (statement = "");
  //shows pokemon name and height each on their own row
  document.write(
    `<div>${pokemon.name} (height: ${pokemon.height}) ${statement}</div>`
  );
});
