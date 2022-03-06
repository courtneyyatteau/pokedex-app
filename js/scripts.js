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
      if (properCasing(pokemon.name).indexOf(properCasing(searchName)) > -1) {
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

    modalBody.empty();
    modalTitle.empty();

    let pokemonValue = pValue(pokemon);

    //creates pokemon name
    let pName = properCasing(pokemon.name);
    let pokemonName = $("<h2>" + "#" + pokemonValue + "  " + pName + "</h2>");

    //get pokemon number
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

    //creates pokemon height
    let pHeightCm = pokemon.height * 10; //converts to cm
    let pHeightInch = pHeightCm * 0.3937; //converts to inches
    pHeightInch = Math.round(pHeightInch * 10) / 10;

    let pokemonHeight = document.createElement("span");
    pokemonHeight.innerText = `Height: ${pHeightCm} cm`;
    pokemonHeight.classList.add("pokemon-height");

    let inchBtn = document.createElement("span");
    let inchLink = document.createTextNode("inch");
    inchBtn.appendChild(inchLink);
    inchBtn.title = "inch";
    inchBtn.classList.add("inch-btn");
    inchBtn.classList.add("active");

    let cmBtn = document.createElement("span");
    let cmLink = document.createTextNode("cm");
    cmBtn.appendChild(cmLink);
    cmBtn.title = "cm";
    cmBtn.classList.add("cm-btn");
    cmBtn.classList.add("non-active");

    inchBtn.addEventListener("click", function () {
      cmBtn.classList.add("active");
      inchBtn.classList.remove("active");
      inchBtn.classList.add("non-active");
      cmBtn.classList.remove("non-active");

      pokemonHeight.innerText = "Height: " + pHeightInch + " in";
    });

    cmBtn.addEventListener("click", function () {
      inchBtn.classList.add("active");
      cmBtn.classList.remove("active");
      cmBtn.classList.add("non-active");
      inchBtn.classList.remove("non-active");

      pokemonHeight.innerText = "Height: " + pHeightCm + " cm";
    });

    let pWeightKg = pokemon.weight / 10;
    let pWeightLbs = pWeightKg * 2.20462262185;
    pWeightLbs = Math.round(pWeightLbs * 10) / 10;

    let pokemonWeight = document.createElement("span");
    pokemonWeight.innerText = `Weight: ${pWeightKg} kg`;
    pokemonWeight.classList.add("pokemon-weight");

    let lbsBtn = document.createElement("span");
    let lbsLink = document.createTextNode("lbs");
    lbsBtn.appendChild(lbsLink);
    lbsBtn.title = "lbs";
    lbsBtn.classList.add("lbs-btn");
    lbsBtn.classList.add("active");

    let kgBtn = document.createElement("span");
    let kgLink = document.createTextNode("kg");
    kgBtn.appendChild(kgLink);
    kgBtn.title = "kg";
    kgBtn.classList.add("kg-btn");
    kgBtn.classList.add("non-active");

    lbsBtn.addEventListener("click", function () {
      kgBtn.classList.add("active");
      lbsBtn.classList.remove("active");
      lbsBtn.classList.add("non-active");
      kgBtn.classList.remove("non-active");

      pokemonWeight.innerText = "Weight: " + pWeightLbs + " lbs";
    });

    kgBtn.addEventListener("click", function () {
      lbsBtn.classList.add("active");
      kgBtn.classList.remove("active");
      kgBtn.classList.add("non-active");
      lbsBtn.classList.remove("non-active");

      pokemonWeight.innerText = "Weight: " + pWeightKg + " kg";
    });

    //creates type(s) of pokemon list
    let pokemonTypesLocation = document.createElement("div");
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

    let formatType = pokemonTypes.length < 2 ? "Type: " : "Types: ";
    pokemonTypesLocation.innerText = `${formatType}${pokemonTypesList}`;
    pokemonTypesLocation.classList.add("pokemon-types");

    let pokemonAbilitiesLocation = document.createElement("div");
    let pokemonAbilities = pokemon.abilities;
    let pokemonAbilitiesList = "";
    if (!pokemonAbilities) {
      pokemonAbilitiesList = "None";
    } else {
      let firstAbility = properCasing(pokemonAbilities[0].ability.name);
      pokemonAbilitiesList += `${firstAbility}`;
      for (i = 1; i < pokemonAbilities.length; i++) {
        let ability = properCasing(pokemonAbilities[i].ability.name);
        pokemonAbilitiesList += `, ${ability}`;
      }
    }

    let formatAbilities =
      pokemonAbilities.length < 2 ? "Ability: " : "Abilities: ";
    pokemonAbilitiesLocation.innerText = `${formatAbilities}${pokemonAbilitiesList}`;
    pokemonAbilitiesLocation.classList.add("pokemon-abilities");

    //creates pokemon image
    let pokemonImage = document.createElement("img");
    pokemonImage.src = pokemon.front;
    pokemonImage.classList.add("pokemon-image");

    let newLine = document.createElement("br");

    let toBack = document.createElement("button");
    let backLink = document.createTextNode(">");
    toBack.appendChild(backLink);
    toBack.title = "Change Image";
    toBack.classList.add("change-image");
    toBack.classList.add("btn-secondary");

    toBack.addEventListener("click", function () {
      if (pokemonImage.src.match(pokemon.front)) {
        pokemonImage.src = pokemon.front1;
      } else if (pokemonImage.src.match(pokemon.front1)) {
        pokemonImage.src = pokemon.front2;
      } else {
        pokemonImage.src = pokemon.front;
      }
    });

    let toFront = document.createElement("button");
    let frontLink = document.createTextNode("<");
    toFront.appendChild(frontLink);
    toFront.title = "Change Image";
    toFront.classList.add("change-image-left");
    toFront.classList.add("btn-secondary");

    toFront.addEventListener("click", function () {
      if (pokemonImage.src.match(pokemon.front)) {
        pokemonImage.src = pokemon.front2;
      } else if (pokemonImage.src.match(pokemon.front2)) {
        pokemonImage.src = pokemon.front1;
      } else {
        pokemonImage.src = pokemon.front;
      }
    });

    let statsButton = document.createElement("button");
    let buttonText = document.createTextNode("View Stats");
    statsButton.appendChild(buttonText);
    statsButton.title = "View Stats";
    statsButton.classList.add("view-stats");
    statsButton.classList.add("btn-secondary");

    let infoButton = document.createElement("button");
    let infoText = document.createTextNode("Back to Info");
    infoButton.appendChild(infoText);
    infoButton.title = "Back to Info";
    infoButton.classList.add("view-info");
    infoButton.classList.add("btn-secondary");

    let statsList = pokemon.stats;
    let hp = statsList[0].base_stat;
    let attack = statsList[1].base_stat;
    let defense = statsList[2].base_stat;
    let specialAttack = statsList[3].base_stat;
    let specialDefense = statsList[4].base_stat;
    let speed = statsList[5].base_stat;

    //Stats Chart container
    let container = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );

    container.setAttribute("viewbox", "0 0 24 24");
    container.setAttribute("width", "450px");
    container.setAttribute("height", "200px");

    //group element
    let g1 = document.createElementNS("http://www.w3.org/2000/svg", "g");
    let g2 = document.createElementNS("http://www.w3.org/2000/svg", "g");
    let g3 = document.createElementNS("http://www.w3.org/2000/svg", "g");
    let g4 = document.createElementNS("http://www.w3.org/2000/svg", "g");
    let g5 = document.createElementNS("http://www.w3.org/2000/svg", "g");
    let g6 = document.createElementNS("http://www.w3.org/2000/svg", "g");

    let rectangle1 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    let rectangle2 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    let rectangle3 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    let rectangle4 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    let rectangle5 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    let rectangle6 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );

    let text1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
    let text2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
    let text3 = document.createElementNS("http://www.w3.org/2000/svg", "text");
    let text4 = document.createElementNS("http://www.w3.org/2000/svg", "text");
    let text5 = document.createElementNS("http://www.w3.org/2000/svg", "text");
    let text6 = document.createElementNS("http://www.w3.org/2000/svg", "text");

    function calculateTextX(value) {
      return (value + 10).toString();
    }

    let hp2String = hp.toString();
    let hpText = calculateTextX(hp);
    let attack2String = attack.toString();
    let attackText = calculateTextX(attack);
    let defense2String = defense.toString();
    let defenseText = calculateTextX(defense);
    let sa2String = specialAttack.toString();
    let saText = calculateTextX(specialAttack);
    let sd2String = specialDefense.toString();
    let sdText = calculateTextX(specialDefense);
    let speed2String = speed.toString();
    let speedText = calculateTextX(speed);

    rectangle1.setAttribute("width", hp2String);
    rectangle1.setAttribute("height", "19");
    rectangle1.setAttribute("y", "10");
    text1.setAttribute("x", hpText);
    text1.setAttribute("y", "29");
    textNode1 = document.createTextNode("HP: " + hp2String);
    text1.appendChild(textNode1);
    g1.appendChild(text1);
    g1.appendChild(rectangle1);
    container.appendChild(g1);

    let theColor = modalBackground(modalBody, pokemon);
    rectangle1.setAttribute("fill", theColor);
    rectangle2.setAttribute("fill", theColor);
    rectangle3.setAttribute("fill", theColor);
    rectangle4.setAttribute("fill", theColor);
    rectangle5.setAttribute("fill", theColor);
    rectangle6.setAttribute("fill", theColor);

    rectangle2.setAttribute("width", attack2String);
    rectangle2.setAttribute("height", "19");
    rectangle2.setAttribute("y", "40");
    text2.setAttribute("x", attackText);
    text2.setAttribute("y", "58");
    textNode2 = document.createTextNode("Attack: " + attack2String);
    text2.appendChild(textNode2);
    g2.appendChild(text2);
    g2.appendChild(rectangle2);
    container.appendChild(g2);

    rectangle3.setAttribute("width", defense2String);
    rectangle3.setAttribute("height", "19");
    rectangle3.setAttribute("y", "70");
    text3.setAttribute("x", defenseText);
    text3.setAttribute("y", "87");
    textNode3 = document.createTextNode("Defense: " + defense2String);
    text3.appendChild(textNode3);
    g3.appendChild(text3);
    g3.appendChild(rectangle3);
    container.appendChild(g3);

    rectangle4.setAttribute("width", sa2String);
    rectangle4.setAttribute("height", "19");
    rectangle4.setAttribute("y", "100");
    text4.setAttribute("x", saText);
    text4.setAttribute("y", "116");
    textNode4 = document.createTextNode("Special Attack: " + sa2String);
    text4.appendChild(textNode4);
    g4.appendChild(text4);
    g4.appendChild(rectangle4);
    container.appendChild(g4);

    rectangle5.setAttribute("width", sd2String);
    rectangle5.setAttribute("height", "19");
    rectangle5.setAttribute("y", "130");
    text5.setAttribute("x", sdText);
    text5.setAttribute("y", "145");
    textNode5 = document.createTextNode("Special Defense: " + sd2String);
    text5.appendChild(textNode5);
    g5.appendChild(text5);
    g5.appendChild(rectangle5);
    container.appendChild(g5);

    rectangle6.setAttribute("width", speed2String);
    rectangle6.setAttribute("height", "19");
    rectangle6.setAttribute("y", "160");
    text6.setAttribute("x", speedText);
    text6.setAttribute("y", "174");
    textNode6 = document.createTextNode("Speed: " + speed2String);
    text6.appendChild(textNode6);
    g6.appendChild(text6);
    g6.appendChild(rectangle6);
    container.appendChild(g6);
    statsButton.addEventListener("click", function () {
      //put stats here
      container1.remove();
      container2.remove();
      pokemonTypesLocation.remove();
      pokemonAbilitiesLocation.remove();
      statsButton.remove();
      toFront.remove();
      pokemonImage.remove();
      toBack.remove();
      modalBody.append(container);

      modalBody.append(infoButton);
      modalBody.append(newLine);
      modalBody.append(toFront);
      modalBody.append(pokemonImage);
      modalBody.append(toBack);
    });

    infoButton.addEventListener("click", function () {
      showStuff();
      infoButton.remove();
      container.remove();
    });

    let container1 = document.createElement("div");
    container1.append(pokemonHeight);
    container1.append(inchBtn);
    container1.append(cmBtn);
    container1.classList.add("container1");

    let container2 = document.createElement("div");
    container2.append(pokemonWeight);
    container2.append(lbsBtn);
    container2.append(kgBtn);
    container2.classList.add("container2");

    function showStuff() {
      modalTitle.append(pokemonName);
      modalBody.append(container1);
      modalBody.append(container2);
      modalBody.append(pokemonTypesLocation);
      modalBody.append(pokemonAbilitiesLocation);
      modalBody.append(statsButton);
      modalBody.append(newLine);
      modalBody.append(toFront);
      modalBody.append(pokemonImage);
      modalBody.append(toBack);
    }
    //appends all creations from above
    showStuff();
  }

  function modalBackground(modalBody, pokemon) {
    let color, image, type, border, borderColor;

    let pokemonTypes = pokemon.types;

    let opacity = 0.25;
    for (i = 0; i < pokemonTypes.length; i++) {
      type = pokemonTypes[i].type.name;
      if (type === "normal") {
        color = `rgb(168, 168, 120, ${opacity}`;
        image = 'url("/img/icons/normal.svg")';
        border = "2px solid #6D6D4E";
        borderColor = "#6D6D4E";
        break;
      } else if (type === "grass") {
        color = `rgb(120, 200, 80, ${opacity}`;
        image = 'url("/img/icons/grass.svg")';
        border = "2px solid #4E8234";
        borderColor = "#4E8234";
        break;
      } else if (type === "bug") {
        color = `rgb(168, 184, 32, ${opacity}`;
        image = 'url("/img/icons/bug.svg")';
        border = "2px solid #6D7815";
        borderColor = "#6D7815";
        break;
      } else if (type === "fire") {
        color = `rgb(240, 128, 48, ${opacity}`;
        image = 'url("/img/icons/fire.svg")';
        border = "2px solid #9C531F";
        borderColor = "#9C531F";
        break;
      } else if (type === "water") {
        color = `rgb(104, 144, 240, ${opacity}`;
        image = 'url("/img/icons/water.svg")';
        border = "2px solid #445E9C";
        borderColor = "#445E9C";
        break;
      } else if (type === "electric") {
        color = `rgb(248, 208, 48, ${opacity}`;
        image = 'url("/img/icons/electric.svg")';
        border = "2px solid #A1871F";
        borderColor = "#A1871F";
        break;
      } else if (type === "ice") {
        color = `rgb(152, 216, 216, ${opacity}`;
        image = 'url("/img/icons/ice.svg")';
        border = "2px solid #638D8D";
        borderColor = "#638D8D";
        break;
      } else if (type === "ground") {
        color = `rgb(224, 192, 104, ${opacity}`;
        image = 'url("/img/icons/ground.svg")';
        border = "2px solid #927D44";
        borderColor = "#927D44";
        break;
      } else if (type === "flying") {
        color = `rgb(168, 144, 240, ${opacity}`;
        image = 'url("/img/icons/flying.svg")';
        border = "2px solid #6D5E9C";
        borderColor = "#6D5E9C";
        break;
      } else if (type === "ghost") {
        color = `rgb(112, 88, 152, ${opacity}`;
        image = 'url("/img/icons/ghost.svg")';
        border = "2px solid #493963";
        borderColor = "#493963";
        break;
      } else if (type === "rock") {
        color = `rgb(184, 160, 56, ${opacity}`;
        image = 'url("/img/icons/rock.svg")';
        border = "2px solid #786824";
        borderColor = "#786824";
        break;
      } else if (type === "fighting") {
        color = `rgb(192, 48, 40, ${opacity}`;
        image = 'url("/img/icons/fighting.svg")';
        border = "2px solid #7D1F1A";
        borderColor = "#7D1F1A";
        break;
      } else if (type === "poison") {
        color = `rgb(160, 64, 160, ${opacity}`;
        image = 'url("/img/icons/poison.svg")';
        border = "2px solid #682A68";
        borderColor = "#682A68";
        break;
      } else if (type === "psychic") {
        color = `rgb(248, 88, 136, ${opacity}`;
        image = 'url("/img/icons/psychic.svg")';
        border = "2px solid #A13959";
        borderColor = "#A13959";
        break;
      } else if (type === "dark") {
        color = `rgb(112, 88, 72, ${opacity}`;
        image = 'url("/img/icons/dark.svg")';
        border = "2px solid #49392F";
        borderColor = "#49392F";
        break;
      } else if (type === "steel") {
        color = `rgb(184, 184, 208, ${opacity}`;
        image = 'url("/img/icons/steel.svg")';
        border = "2px solid #787887";
        borderColor = "#787887";
        break;
      } else if (type === "dragon") {
        color = `rgb(112, 56, 248, ${opacity}`;
        image = 'url("/img/icons/dragon.svg")';
        border = "2px solid #4924A1";
        borderColor = "#638D8D";
        break;
      }
    }

    modalBody.css("background-image", image);
    modalBody.css("background-color", color);
    modalBody.css("border", border);
    return borderColor;
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
    let listpokemon = document.createElement("div");
    listpokemon.classList.add("group-list-item");
    let button = document.createElement("button");
    button.classList.add("btn");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#pokemonModal");
    pokemonName = properCasing(pokemon.name);
    let pImage = document.createElement("img");
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
        item.imageUrlBack = details.sprites.front_default;
        item.front = details.sprites.other.dream_world.front_default;
        item.front1 = details.sprites.other.home.front_default;
        item.front2 = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
        item.weight = details.weight;
        item.abilities = details.abilities;
        item.stats = details.stats;
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
