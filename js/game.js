let canvas;
let world;
let keyboard;
let allIntervals = [];
let start = false;
let isInFullscreen = false;

/** 
 * The function initiates the canvas and for the game relevant functions.
 * 
*/


function generateLevel1() {
    canvas = document.getElementById('canvas');
    initLevel1();
    toggleStartBtn();
}


function initGame() {
    start = true;
    toggleStartBtn();
    keyboard = new Keyboard();
    world = new World(canvas, keyboard);
}


function toggleStartBtn() {
    if (!start)
        document.getElementById('startButton').innerHTML = `<div onclick="restartGame()">Start</div>`;
    if (start) {
        stopGame();
        document.getElementById('startButton').innerHTML = `<div onclick="restartGame()">Restart</div>`;
    }
}

function restartGame() {
    stopGame();
    initLevel1();
    initGame()
}




function startStory() {
    document.getElementById('canvas').classList.toggle('background-img-1');
    document.getElementById('canvas').classList.toggle('background-img-2');
}

/**
 * The function enables the usage of the keyboard.
 * @param {event} e when clicking the corresponing key
 */

document.onkeydown = function (e) {
    switch (e.key) {
        case ' ':
            keyboard.SPACE = true;
            break;
        case 'ArrowLeft':
        case 'a':
            keyboard.LEFT = true;
            break;
        case 'ArrowRight':
        case 'd':
            keyboard.RIGHT = true;
            break;
        case 'w':
        case 'ArrowUp':
            keyboard.THROW = true;
            break;
        case 's':
        case 'ArrowDown':
            keyboard.DODGE = true;
            break;
        case 'F11':
            changeToFullscreen();
            break;
    }
};


/**
 * The function enables the usage of the keyboard.
 * @param {event} e when  the corresponing key isn't clicked anymore
 */

document.onkeyup = function (e) {
    switch (e.key) {
        case ' ':
            keyboard.SPACE = false;
            e.preventDefault()
            break;
        case 'ArrowLeft':
        case 'a':
            keyboard.LEFT = false;
            break;
        case 'ArrowRight':
        case 'd':
            keyboard.RIGHT = false;
            break;
        case 'w':
        case 'ArrowUp':
            keyboard.THROW = false;
            break;
        case 's':
        case 'ArrowDown':
            keyboard.DODGE = false;
            break;
    }
};

/**
 * The function renders the elements for the responsive view of the game.
 * 
 */

function loadControlPanel() {

    let crossPosition = document.getElementById('crossPosition');
    crossPosition.innerHTML = '';
    controlBtnPosition.innerHTML = '';
    insertButtons();
    if (window.matchMedia("(orientation: portrait)").matches) {
        document.getElementById('responsiveControl').classList.add('responsive-control-portrait');
        insertCross('controlCross1');
    }
    if (window.matchMedia("(orientation: landscape)").matches) {
        insertCross('controlCross2');
        document.getElementById('responsiveControl').classList.remove('responsive-control-portrait');
    }
}

/**
 * The function enables the responsivness of the map cross element.
 * 
 */
function insertCross(path) {
    let crossPosition = document.getElementById('crossPosition');
    let text = generateCross(path);
    crossPosition.insertAdjacentHTML('afterbegin', text);
}

/**
* This function generates a cross with an area function fitting the img of the cross element.
* Depending of the side length the scale of the cross element is determined.
* @param {number} sideLength The side length of the cross element.
* @returns {string} Returns the cross properties.
*/
function generateCross(path) {
    let sideLength = document.getElementById('canvas').offsetWidth / 6;
    let coord1 = sideLength * 3 / 8;
    let coord2 = sideLength * 5 / 8;
    let cross = `
         <div class="relative">
           <img class='cross-map' id="crossMap" src="img/0.Own_Pictures/${path}/cross.png" usemap='#image-map' height="${sideLength}px" width="${sideLength}px">
             <map name='image-map'>              
                 <area target="" alt="up"    title="up"     id="up"    ontouchstart="touchCross('${path}','up')"  ontouchend="touchCrossEnd('${path}','cross')"  coords="${coord1},0,${coord2},${coord1}" shape="rect">
                 <area target="" alt="left"  title="left"   id="left"   ontouchstart="touchCross('${path}','left')" ontouchend="touchCrossEnd('${path}','cross')" coords="0,${coord1},${coord1},${coord2}" shape="rect">
                 <area target="" alt="down"  title="down"   id="down"   ontouchstart="touchCross('${path}','down')" ontouchend="touchCrossEnd('${path}','cross')" coords="${coord2},${coord2},${coord1},${sideLength}" shape="rect">
                 <area target="" alt="right" title="right"  id="right"  ontouchstart="touchCross('${path}','right')" ontouchend="touchCrossEnd('${path}','cross')" coords="${sideLength},${coord1},${coord2},${coord2}" shape="rect">   
             </map>   
        <div class="help" id="help">
             <div class="throw">Throw</div>
             <div class="right">Right</div>
             <div class="dodge">Dodge</div>
             <div class="left">Left</div>
         </div>                       
         </div>`;
    return cross;
}



function insertButtons() {
    let buttonPosition = document.getElementById('controlBtnPosition');
    let text = generateButtons();
    buttonPosition.insertAdjacentHTML('afterbegin', text);
}

function generateButtons() {
    let newButtons = `  
    <div class="A-btn  mgn-r mgn-t">
    <button ontouchstart="jumpBtn()" ontouchend ="jumpBtnFalse()" class="pushable-btn" id="buttonA">
        <span class="shadow-child"></span>
        <span class="edge"></span>
        <span class="front">A</span>
    </button>
    <div class="btn-help" id="helpBtn" >Jump</div>
    </div>
`;
    return newButtons;
}

function jumpBtn() {
    keyboard.SPACE = true;
}

function jumpBtnFalse() {
    keyboard.SPACE = false;
}

/**
 * The function simulates pressing the control pad.
 * @param {string} position The parameter resembles the 
 */
function touchCross(path, position) {
    document.getElementById('crossMap').src = `img/0.Own_Pictures/${path}/${position}.png`;
    switch (position) {
        case 'up': keyboard.THROW = true;
            break;
        case 'left': keyboard.LEFT = true;
            break;
        case 'down': keyboard.DODGE = true;
            break;
        case 'right': keyboard.RIGHT = true;
            break;
    }
}

function touchCrossEnd(img, position) {
    document.getElementById('crossMap').src = `img/0.Own_Pictures/${img}/${position}.png`;
    switch (position) {
        case 'cross':
            keyboard.LEFT = false;
            keyboard.THROW = false;
            keyboard.DODGE = false;
            keyboard.RIGHT = false;
            break;
    }
}

/**
 * 
 * @param {string} intervalName The name of the interval which needs to be cleared while restarting the game.
 */

function setStoppableInterval(fn, frame) {
    if (start) {
        let id = setInterval(fn, frame);
        allIntervals.push(id);
    }
}

function stopGame() {
    allIntervals.forEach(clearInterval);
    allIntervals = [];
}

function changeToFullscreen() {
    let fullscreen = document.getElementById('mainContainer');
    if (!isInFullscreen) {
        enterFullscreen(fullscreen);
        isInFullscreen = true;
    }

    else {
        exitFullscreen();
        isInFullscreen = false;
    }
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

function toggleOptionPanel() {
    styleSetting = document.getElementById('settingMenu').classList.toggle('d-none');
}

function toggleFastHelp() {
    document.getElementById('help').classList.toggle('d-none');
    document.getElementById('crossPosition').classList.toggle('cross-position2');
    document.getElementById('helpBtn').classList.toggle('d-none');
}

function toggleControls() {
    document.getElementById('responsiveControl').classList.toggle('d-none');
}