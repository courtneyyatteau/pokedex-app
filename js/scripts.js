let pokemonRepository = (function () {
  let repository = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=151";
  let modalContainer = document.querySelector(".modal-container");

  //adds a pokemon to the list
  function add(pokemon) {
    repository.push(pokemon);
  }

  //gets the pokemon list
  function getAll() {
    return repository;
  }

  //logs pokemon name when clicked
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  //sorts pokemon in numerical descending/ascending or alphabtical A-Z/Z-A order
  function sort() {
    let value = document.getElementById("options").value;
    let listBeforeSort = [];

    if (value === "Descending") {
      $(".pokemon-list").empty();
      repository.forEach((pokemon) => {
        addListItem(pokemon, value);
      });
    } else if (value === "Ascending") {
      $(".pokemon-list").empty();
      repository.forEach((pokemon) => {
        addListItem(pokemon, value);
      });
    } else if (value === "A-Z") {
      $(".pokemon-list").empty();
      for (i = 0; i < repository.length; i++) {
        listBeforeSort.push(repository[i]);
      }
      listBeforeSort.sort(dynamicSort("name"));
      listBeforeSort.forEach((pokemon) => {
        addListItem(pokemon, value);
      });
    } else if (value === "Z-A") {
      $(".pokemon-list").empty();
      for (i = 0; i < repository.length; i++) {
        listBeforeSort.push(repository[i]);
      }
      listBeforeSort.sort(dynamicSort("name"));
      let finalList = listBeforeSort.reverse();
      finalList.forEach((pokemon) => {
        addListItem(pokemon);
      });
    }
  }

  //alphabeical sorter
  function dynamicSort(property) {
    var sortOrder = 1;

    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }

    return function (a, b) {
      if (sortOrder == -1) {
        return b[property].localeCompare(a[property]);
      } else {
        return a[property].localeCompare(b[property]);
      }
    };
  }

  function findPokemon(searchName) {
    // Clear all the buttons on the page when user types in search box
    $(".pokemon-list").empty();

    // Add pokemon buttons for which the name includes the search string
    repository.forEach((pokemon) => {
      if (properCasing(pokemon.name).includes(properCasing(searchName))) {
        addListItem(pokemon);
      }
    });
  }

  //makes each String start with uppercase letter
  function properCasing(item) {
    return item.charAt(0).toUpperCase() + item.slice(1);
  }

  function showModal(pokemon) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalWeight = $(".weight");

    modalBody.empty();
    modalTitle.empty();

    let pokemonValue = pValue(pokemon);

    //creates pokemon name
    let pName = properCasing(pokemon.name);
    let pokemonName = $("<h2>" + "#" + pokemonValue + "  " + pName + "</h2>");

    //creates pokemon height
    let pHeightCm = pokemon.height * 10; //converts to cm
    let pokemonHeight = $("<p>" + "Height: " + pHeightCm + "cm" + "</p>");

    //creates type(s) of pokemon list
    let pokemonTypesLocation = document.createElement("p");
    let pokemonTypes = pokemon.types;
    let pokemonTypesList = "";
    if (!pokemonTypes) {
      pokemonTypesList = "None";
    } else {
      let firstType = properCasing(pokemonTypes[0].type.name);
      pokemonTypesList += `${firstType}`;
      for (i = 1; i < pokemonTypes.length; i++) {
        let type = properCasing(pokemonTypes[i].type.name);
        pokemonTypesList += `, ${type}`;
      }
    }

    function pValue(pokemon) {
      let startNumber;
      let url = pokemon.detailsUrl;
      startNumber = url.indexOf("pokemon");
      let value = url.substr(startNumber + 8);
      let newVal = value.slice(0, value.length - 1);
      let pokemonValue;
      if (newVal.length === 1) {
        pokemonValue = "00" + newVal;
      } else if (newVal.length === 2) {
        pokemonValue = "0" + newVal;
      } else {
        pokemonValue = newVal;
      }
      return pokemonValue;
    }

    let formatType = pokemonTypes.length < 2 ? "Type: " : "Types: ";
    pokemonTypesLocation.innerText = `${formatType}${pokemonTypesList}`;
    pokemonTypesLocation.classList.add("pokemon-types");

    let pWeightKg = pokemon.weight / 10;
    let pokemonWeight = $("<p>" + "Weight: " + pWeightKg + "kg" + "</p>");

    //creates pokemon image
    let pokemonImage = document.createElement("img");
    pokemonImage.src = pokemon.imageUrl;
    pokemonImage.classList.add("pokemon-image");

    //appends all creations from above
    modalTitle.append(pokemonName);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonWeight);
    modalBody.append(pokemonTypesLocation);
    modalBody.append(pokemonImage);
    modalBackground(modalBody, pokemon);
  }

  function modalBackground(modalBody, pokemon) {
    let pokemonTypes = pokemon.types;
    let color, image, type, border;
    let opacity = 0.25;
    for (i = 0; i < pokemonTypes.length; i++) {
      type = pokemonTypes[i].type.name;
      if (type === "normal") {
        color = `rgb(168, 168, 120, ${opacity})`;
        image = 'url("/img/icons/normal.svg")';
        border = "2px solid #6D6D4E";
        break;
      } else if (type === "grass") {
        color = `rgb(120, 200, 80, ${opacity})`;
        image = 'url("/img/icons/grass.svg")';
        border = "2px solid #4E8234";
        break;
      } else if (type === "bug") {
        color = `rgb(168, 184, 32, ${opacity})`;
        image = 'url("/img/icons/bug.svg")';
        border = "2px solid #6D7815";
        break;
      } else if (type === "fire") {
        color = `rgb(240, 128, 48, ${opacity})`;
        image = 'url("/img/icons/fire.svg")';
        border = "2px solid #9C531F";
        break;
      } else if (type === "water") {
        color = `rgb(104, 144, 240, ${opacity})`;
        image = 'url("/img/icons/water.svg")';
        border = "2px solid #445E9C";
        break;
      } else if (type === "electric") {
        color = `rgb(248, 208, 48, ${opacity})`;
        image = 'url("/img/icons/electric.svg")';
        border = "2px solid #A1871F";
        break;
      } else if (type === "ice") {
        color = `rgb(152, 216, 216, ${opacity})`;
        image = 'url("/img/icons/ice.svg")';
        border = "2px solid #638D8D";
        break;
      } else if (type === "ground") {
        color = `rgb(224, 192, 104, ${opacity})`;
        image = 'url("/img/icons/ground.svg")';
        border = "2px solid #927D44";
        break;
      } else if (type === "flying") {
        color = `rgb(168, 144, 240, ${opacity})`;
        image = 'url("/img/icons/flying.svg")';
        border = "2px solid #6D5E9C";
        break;
      } else if (type === "ghost") {
        color = `rgb(112, 88, 152, ${opacity})`;
        image = 'url("/img/icons/ghost.svg")';
        border = "2px solid #493963";
        break;
      } else if (type === "rock") {
        color = `rgb(184, 160, 56, ${opacity})`;
        image = 'url("/img/icons/rock.svg")';
        border = "2px solid #786824";
        break;
      } else if (type === "fighting") {
        color = `rgb(192, 48, 40, ${opacity})`;
        image = 'url("/img/icons/fighting.svg")';
        border = "2px solid #7D1F1A";
        break;
      } else if (type === "poison") {
        color = `rgb(160, 64, 160, ${opacity})`;
        image = 'url("/img/icons/poison.svg")';
        border = "2px solid #682A68";
        break;
      } else if (type === "psychic") {
        color = `rgb(248, 88, 136, ${opacity})`;
        image = 'url("/img/icons/psychic.svg")';
        border = "2px solid #A13959";
        break;
      } else if (type === "dark") {
        color = `rgb(112, 88, 72, ${opacity})`;
        image = 'url("/img/icons/dark.svg")';
        border = "2px solid #49392F";
        break;
      } else if (type === "steel") {
        color = `rgb(184, 184, 208, ${opacity})`;
        image = 'url("/img/icons/steel.svg")';
        border = "2px solid #787887";
        break;
      } else if (type === "dragon") {
        color = `rgb(112, 56, 248, ${opacity})`;
        image = 'url("/img/icons/dragon.svg")';
        border = "2px solid #4924A1";
        break;
      }
    }

    modalBody.css("background-image", image);
    modalBody.css("background-color", color);
    modalBody.css("border", border);
  }

  //adds a click listener and when a pokemon button is pressed it shows pokemon name
  function addListener(button, pokemon) {
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  //creates a button list of pokemon
  function addListItem(pokemon, order) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    listpokemon.classList.add("group-list-item");
    let button = document.createElement("button");
    button.classList.add("btn");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#pokemonModal");
    pokemonName = properCasing(pokemon.name);
    button.innerHTML = pokemonName;
    listpokemon.appendChild(button);
    if (order === "Descending") {
      pokemonList.insertBefore(listpokemon, pokemonList.firstChild);
    } else {
      pokemonList.appendChild(listpokemon);
    }
    addListener(button, pokemon);
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })

      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
        item.weight = details.weight;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    findPokemon: findPokemon,
    sort: sort,
  };
})();

//actually makes the respository full of pokemon
pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
