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
function init() {
    start = true;
    loadControlPanel();
    stopGame();
    canvas = document.getElementById('canvas');
    initLevel1();
    keyboard = new Keyboard();
    world = new World(canvas, keyboard);
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
    if (start) {
        let crossPosition = document.getElementById('crossPosition');
        crossPosition.innerHTML = '';
        if (window.matchMedia("(orientation: portrait)").matches) {
            if (onSmallScreen()) { insertCross(80, 'controlCross1'); }
            if (onMiddleScreen()) { insertCross(120, 'controlCross1'); }
            if (onBigScreen()) { insertCross(140, 'controlCross1'); }
        }

        if (window.matchMedia("(orientation: landscape)").matches) {

            if (onSmallScreen()) { insertCross(80, 'controlCross2'); }
            if (onMiddleScreen()) { insertCross(120, 'controlCross2'); }
            if (onBigScreen()) { insertCross(140, 'controlCross2'); }
        }
    }
}


function onSmallScreen() { return window.innerWidth >= 320 && window.innerWidth <= 640 }
function onMiddleScreen() { return window.innerWidth >= 641 && window.innerWidth <= 1007 }
function onBigScreen() { return window.innerWidth > 1008 }


/**
 * The function enables the responsivness of the map cross element.
 * 
 */
function insertCross(sideLength, path) {
    let crossPosition = document.getElementById('crossPosition');
    let text = generateCross(sideLength, path);
    crossPosition.insertAdjacentHTML('afterbegin', text);
}

/**
* This function generates a cross with an area function fitting the img of the cross element.
* Depending of the side length the scale of the cross element is determined.
* @param {number} sideLength The side length of the cross element.
* @returns {string} Returns the cross properties.
*/
function generateCross(sideLength, path) {
    let coord1 = sideLength * 3 / 8;
    let coord2 = sideLength * 5 / 8;
    cross = `
           <img class='cross-map' id="crossMap" src="img/0.Own_Pictures/${path}/cross.png" usemap='#image-map' height="${sideLength}px" width="${sideLength}px">
             <map name='image-map'>
                 <area target="" alt="up"    title="up"     id="up"     ontouchstart="touchCross('${path}','up')"   ontouchend="touchCrossEnd('${path}','cross')" coords="${coord1},0,${coord2},${coord1}" shape="rect">
                 <area target="" alt="left"  title="left"   id="left"   ontouchstart="touchCross('${path}','left')" ontouchend="touchCrossEnd('${path}','cross')" coords="0,${coord1},${coord1},${coord2}" shape="rect">
                 <area target="" alt="down"  title="down"   id="down"   ontouchstart="touchCross('${path}','down')" ontouchend="touchCrossEnd('${path}','cross')" coords="${coord2},${coord2},${coord1},${sideLength}" shape="rect">
                 <area target="" alt="right" title="right"  id="right"  ontouchstart="touchCross('${path}','right')" ontouchend="touchCrossEnd('${path}','cross')" coords="${sideLength},${coord1},${coord2},${coord2}" shape="rect">   
             </map> `;
    return cross;
}


function generateButtons() {
    
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
    let id = setInterval(fn, frame);
    allIntervals.push(id);
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
