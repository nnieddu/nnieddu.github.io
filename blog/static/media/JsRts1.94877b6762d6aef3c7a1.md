# RTS game in Javascript

#### I love strategy games so i decided to made an RTS engine and a game in javascript.


First of all, we need to define and get our playing area and our basic needs.
  
```html
<body>
  <div id="playingArea" oncontextmenu="return false;">
</div>
```
  
Here :  
```oncontextmenu="return false;"```   
serve to avoid / prevent default browser/os contextual menu.
  
A simple GUI to view units/building infos, ressources available and building/units cost  

```html
<footer id="bar-bottom" class="gui bar-bottom">
  <div class="unitIconArea">
      <div id="unitIcon" class="unitIcon"></div>
      <div class="unitNameAndNumbers" id="unitNameAndNumbers">
          <div id="unitName" class="gui-label name"></div>
          <div id="numberOfUnits" class="gui-label number"></div>
    </div>
  </div>
  <div class="unitDetails" id="unitDetails">
    <div id="hp" class="gui-label hp"></div>
    <div id="hpBar" class = "hp-bar"></div>
    <div id="attack" class="gui-label attack">attack</div>
    <div id="defense" class="gui-label defense">defense</div>
  </div>
  <div class="buttons">
    <button id="q" class="gui-button">Button Q</button>
    <button id="w" class="gui-button">Button W</button>
    <button id="e" class="gui-button">Button E</button>
    <div class="gui-label">Select a Unit or Building with left click.<br>
      Produce units from your buildings.<br>
      Use right click to move a selected unit.</div>
  </div>
</footer>
```
   
A game loop interval who's gonna influence the game speed and FPS.  
  
A class to view units or building who's selected  
  
Some arrays :
  - player              : with all players in the game  
  - units               : with all units display on screen (solider, builder...)  
  - environmentObjects  : with all environement objects display on screen (trees, rocks etc...)  

<Code language="javascript">
var playingArea = document.getElementById("playingArea");
const gameLoopIntervalTime = 8; // in ms
var selectedElements = playingArea.getElementsByClassName("selected");
<!-- var unitsAndBuildings = []; -->
var units = [];
var environmentObjects = [];
var players = [];
</Code>
  
Now we need some CSS styling : WIP  
// TODO 
  
  
Some event listeners to manage mouse clicks and some keyboard shortcut :  
(Keyboard shortcut and GUI button click lead to same actions)

<Code language="javascript">
// Keyboard / GUI Button decls
const buttonQ = document.getElementById("q");
const buttonW = document.getElementById("w");
const buttonE = document.getElementById("e");

buttonQ.style.visibility = "hidden";
buttonW.style.visibility = "hidden";
buttonE.style.visibility = "hidden";

// Event listeners
buttonQ.addEventListener("click", qClicked);
buttonW.addEventListener("click", wClicked);
buttonE.addEventListener("click", eClicked);
playingArea.addEventListener("contextmenu", setTargetOfSelectedUnit);
playingArea.addEventListener('click', selectElement);

// Hotkeys
window.onkeydown = function (e) {
  var code = e.keyCode ? e.keyCode : e.which;
  if (code === 81 && buttonQ.style.visibility !== 'hidden') { // Q
      qClicked();
  } else if (code === 87 && buttonW.style.visibility !== 'hidden') { // W
      wClicked();
  }
  else if (code === 69 && buttonE.style.visibility !== 'hidden') { // E
      eClicked();
  }
};

function qClicked () {
  selectedUnit = getUnitOfDomElement(selectedElements[0]);
  switch (selectedUnit.name) {
    case "Townhall": {
      createUnit(selectedUnit.player, "Footman", getPosition(selectedUnit.domElement)[0], getPosition(selectedUnit.domElement)[1] + selectedUnit.height);
    }
  }
}

function wClicked () {
  selectedUnit = getUnitOfDomElement(selectedElements[0]);
  switch (selectedUnit.name) {
    case "Townhall": {
      createUnit(selectedUnit.player, "Peasant", getPosition(selectedUnit.domElement)[0], getPosition(selectedUnit.domElement)[1] + selectedUnit.height);
    }
  }
}

function eClicked () {
  selectedUnit = getUnitOfDomElement(selectedElements[0]);
  switch (selectedUnit.name) {}
}
</Code>
  
#### Now we need a Map : forest.js
I create a realy simple map class :  
  
<Code language="javascript">
class gameMap {
    constructor () {
        // General
        this.name = "Forest";
        this.numberOfPlayers = 2;

        // Map size
        this.width = 5120;
        this.height = 5120;

        // Textures
        this.ground = "url(assets/textures/grass.jpg)";
        this.composition =
        [
            "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",
            "T                                                  T",
            "T  1                                               T",
            "T                                                  T",
            "T                                                  T",
            "T                                                  T",
            "T                                                  T",
            "T                                                  T",
            "T                                                  T",
            "T                                                  T",
            "T                                                  T",
            "T                                                  T",
            "T                                                  T",
            "T                                                  T",
            "T                                                  T",
            "T                                                  T",
            "T                                                  T",
            "T                                                  T",
            "T                                                  T",
            "T                                            2     T",
            "T                                                  T",
            "T                                                  T",
            "T                                                  T",
            "T                                                  T",
            "T                                                  T",
            "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",
        ]
    }
}
</Code>
  
The composition of the map is stored in an array :  
- T = Tree  
- 1 = Player 1 spawn  
- 2 = Player 2 spawn  

<Code language="javascript">
// Create Map
var map = new gameMap();
playingArea.style.background = map.ground;
playingArea.style.width = map.width + "px";
playingArea.style.height = map.height + "px";
const mapComposition = map.composition;
</Code>
  
Init the basic game settings (we can imagine a future game menu at game launching who allow player custom theses settings ):
<Code language="javascript">
// Game settings
const numberOfPlayers = map.numberOfPlayers;  
// numberOfPlayers actualy fixed by the map but can be choose in menu in futur
const startingGold = 300;
const startingWood = 0;
</Code>
  
  
Now we have to create some classes :  
- Player
- EnvironementObject
- Units
- Building
   

> ***Note***
> the sequel's coming soon