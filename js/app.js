// ide deklaráljátok a függvényeket.
/*
1. A kapott adatokat rendezd ár(cost_in_credits) szerint növekvő sorrendbe. (advanced bubble)
*/
function advencedBubbleToOrderByPrice(inputArray) {
  var i = inputArray.length;
  var csere;
  while (i > 0) {
    csere = 0;
    for (var j = 0; j < i - 1; j++) {
      if (parseInt(inputArray[j].cost_in_credits, 10) > parseInt(inputArray[j + 1].cost_in_credits, 10)) {
        [inputArray[j], inputArray[j + 1]] = [inputArray[j + 1], inputArray[j]];
        csere = j;
      }
    }
    i = csere;
  }
}

/*
2. Töröld az összes olyan adatot (tehát az objektumot a tömbből), ahol a consumables értéke NULL. Fontos, hogy ne csak undefined-ra állítsd a tömbelemet!!!
*/
function deleteConsumablesNullValuedObjects(inputArray) {
  for (var i = 0; i < inputArray.length; i++) {
    if (inputArray[i].consumables === null) {
      inputArray.splice(i, 1);
    }
  }
}

/*
3. Az összes NULL értéket (minden objektum minden tulajdonságánál) módosítsd "unknown"-ra
*/
function setNullToUnknownToAllObjectProperties(inputArray) {
  for (var i = 0; i < inputArray.length; i++) {
    for (var k in inputArray[i]) {
      if (inputArray[i].hasOwnProperty(k)) {
        if (inputArray[i][k] === null) {
          inputArray[i][k] = 'unknown';
        }
      }
    }
  }
}

/*
4. A shapceship-list class-ű divbe jelenítsd meg az így kapott hajók adatait, beleérve a képét is.
5. Ha valamelyik hajó adatait tartalmazó html elemre (pl.: a divre amibe benne van minden adata) rákattintunk,
akkor töltse be az adott hajó adatait a one-spaceship class-ű div-be.
*/
function showShipProperties(inputArray) {
  var result = '<h3>A szűrt hajók adatai</h3>';
  for (var i = 0; i < inputArray.length; i++) {
    result += `<div class="spaceship-item" >${showObjectProperties(inputArray[i])}</div>`;
  }
  return resultToTarget('.spaceship-list', result, 'append');
}

function isOneSpaceShipDivExists() {
  var checkDiv = document.querySelector('.one-spaceship-result');
  if (checkDiv === null) {
    makeResultDiv();
  }
}

function makeResultDiv() {
  var oneSpaceShipDiv = document.querySelector('.one-spaceship');
  var newDiv = document.createElement('div');
  newDiv.className = 'one-spaceship-result';
  oneSpaceShipDiv.appendChild(newDiv);
}

function resultToTarget(target, value, type) {
  switch (type) {
  case 'new':
    document.querySelector(target).innerHTML = value;
    break;
  case 'append':
    document.querySelector(target).innerHTML += value;
    break;
  default:
    document.querySelector(target).innerHTML += value;
  }
}

function spaceshipItemToOne(spaceShipNumber, inputArray) {
  isOneSpaceShipDivExists();
  return resultToTarget('.one-spaceship-result', searchForShipShowFormat(showObjectProperties(inputArray[spaceShipNumber])), 'new');
}

/*
6. Készítened kell egy statisztikát, mely a shapceship-list class-ű div aljára a következő adatokat fogja beleírni:

* Egy fős (crew = 1) legénységgel rendelkező hajók darabszáma.
* A legnagyobb cargo_capacity-vel rendelkező hajó neve (model)
* Az összes hajó utasainak (passengers) összesített száma
* A leghosszabb(lengthiness) hajó képének a neve
*/
function showStatistics(inputArray) {
  var spaceshipListDiv = document.querySelector('.spaceship-list');
  var newDiv = document.createElement('div');
  newDiv.className = 'spaceship-statistics';
  newDiv.innerHTML = `<h2>Statisztikák</h2>Egy fős (crew = 1) legénységgel rendelkező hajók darabszáma: ${statisticsOneCrew(inputArray)} db<br>
  A legnagyobb cargo_capacity-vel rendelkező hajó neve (model): ${statisticsMaxCargo(inputArray)}<br>
  Az összes hajó utasainak (passengers) összesített száma: ${statisticsSumPassengers(inputArray)}<br>
  A leghosszabb (lengthiness) hajó képének a neve: ${statisticsMaxLengthShip(inputArray)}`;
  // resultToTarget('.spaceship-list', result, 'append');
  spaceshipListDiv.appendChild(newDiv);
}
function statisticsOneCrew(inputArray) {
  var count = 0;
  for (var i = 0; i < inputArray.length; i++) {
    if (parseInt(inputArray[i].crew, 10) === 1) {
      count++;
    }
  }
  return count;
}
function statisticsMaxCargo(inputArray) {
  var max = parseInt(inputArray[0].cargo_capacity, 10);
  var shipNumber = 0;
  for (var i = 0; i < inputArray.length; i++) {
    if (parseInt(inputArray[i].cargo_capacity, 10) > max) {
      max = parseInt(inputArray[i].cargo_capacity, 10);
      shipNumber = i;
    }
  }
  return inputArray[shipNumber].model;
}
function statisticsSumPassengers(inputArray) {
  var sum = 0;
  for (var i = 0; i < inputArray.length; i++) {
    if (parseInt(inputArray[i].passengers, 10)) {
      sum += parseInt(inputArray[i].passengers, 10);
    }
  }
  return sum;
}

function statisticsMaxLengthShip(inputArray) {
  var max = parseInt(inputArray[0].lengthiness, 10);
  var shipNumber = 0;
  for (var i = 0; i < inputArray.length; i++) {
    if (parseInt(inputArray[i].lengthiness, 10) > max) {
      max = parseInt(inputArray[i].lengthiness, 10);
      shipNumber = i;
    }
  }
  return `${inputArray[shipNumber].image} ${showImg(inputArray[shipNumber].image)}  `;
}

function showImg(imgSource) {
  return `<div class="img-inline"><img src="/img/${imgSource}" alt=""></div>`;
}

/*
7. Legyen lehetőség a hajókra rákeresni _model_ szerint.

* A keresett nevet paraméterként kapja a függvényed.
* A keresés nem case sensitive
* Nem csak teljes egyezést vizsgálunk, tehát ha a keresett szöveg szerepel a hajó nevében már az is találat
* Ha több találatunk is lenne, azt a hajót adjuk vissza, amelyiknek a neve ABC sorrendben a legelső lenne.
* Az adott hajó adatait a one-spaceship class-ű div-be kell megjeleníteni rendezett formában, képpel együtt.
*/

function searchForShipShowFormat(value) {
  if (value.length > 0) {
    return `<h3>A keresett hajó:</h3>
  <p>${value}</p>`;
  }
  return '<h3>Nincs találat a keresésre.</h3>';
}

function searchForShip(inputArray, value) {
  var results = [];
  for (var i = 0; i < inputArray.length; i++) {
    if (inputArray[i].model.toUpperCase().indexOf(value.toUpperCase()) > -1) {
      results.push(inputArray[i]);
    }
  }

  isOneSpaceShipDivExists();
  if (results.length > 1) {
    return resultToTarget('.one-spaceship-result',
      searchForShipShowFormat(showObjectProperties(descOrderByModel(results, 'model')[0])), 'new');
  }
  return resultToTarget('.one-spaceship-result', searchForShipShowFormat(showObjectProperties(results[0])), 'new');
}


function descOrderByModel(inputArray) {
  var newInputArray = inputArray.slice();
  for (var i = 0; i < inputArray.length - 1; i++) {
    for (var j = i + 1; j < inputArray.length; j++) {
      if (inputArray[i].model.localeCompare(inputArray[j].model) > 0) {
        [inputArray[i], inputArray[j]] = [inputArray[j], inputArray[i]];
      }
    }
  }
  return newInputArray;
}


function showObjectProperties(inputObject) {
  var result = '';
  for (var k in inputObject) {
    if (inputObject.hasOwnProperty(k)) {
      result += `${k} : ${inputObject[k]}<br> `;
      if (k === 'image') {
        result += showImg(inputObject[k]);
      }
    }
  }
  return result;
}

function deleteSearchInput() {
  document.querySelector('#search-text').value = '';
}

function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}


function successAjax(xhttp) {
  // Innen lesz elérhető a JSON file t{artalma, tehát az adatok amikkel dolgoznod kell
  var userDatas = JSON.parse(xhttp.responseText);
  // Innen lehet hívni.
  advencedBubbleToOrderByPrice(userDatas);
  deleteConsumablesNullValuedObjects(userDatas);
  setNullToUnknownToAllObjectProperties(userDatas);


  showShipProperties(userDatas);

  var search = document.querySelector('#search-button');
  search.addEventListener('click', function () {
    searchForShip(userDatas, document.querySelector('#search-text').value);
    deleteSearchInput();
  });

  var spaceshipDivs = document.querySelectorAll('.spaceship-item');
  for (let j = 0; j < spaceshipDivs.length; j++) {
    var spaceshipDivsNew = spaceshipDivs[j];
    spaceshipDivsNew.addEventListener('click', function () {
      spaceshipItemToOne(j, userDatas);
    });
  }

  showStatistics(userDatas);
}
getData('/json/spaceships.json', successAjax);
