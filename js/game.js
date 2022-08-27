let canvas;
let world;
let keyboard;
let allIntervals = [];

/** 
 * The function initiates the canvas and for the game relevant functions.
 * 
*/
function init() {
    stopGame();
    canvas = document.getElementById('canvas');
    initLevel1();
    keyboard = new Keyboard();
    world = new World(canvas, keyboard);
    lifebar = new Statusbar();
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
    }
};

/**
 * The function renders the elements for the responsive view of the game.
 * 
 */


function loadControlPanel() {
    insertCross();
}

/**
 * The function enables the responsivness of the map cross element.
 * 
 */
function insertCross() {
    let crossPosition = document.getElementById('crossPosition');
    let text = generateCross(150);
    crossPosition.insertAdjacentHTML('afterbegin', text);
}

/**
* This function generates a cross with an area function fitting the img of the cross element.
* Depending of the side length the scale of the cross element is determined.
* @param {number} sideLength The side length of the cross element.
* @returns {string} Returns the cross properties.
*/
function generateCross(sideLength) {
    let coord1 = sideLength * 3 / 8;
    let coord2 = sideLength * 5 / 8;
    cross = `
           <img class='cross-map' id="crossMap" src='img/0.Own_Pictures/cross.png' usemap='#image-map' height="${sideLength}px" width="${sideLength}px">
             <map name='image-map'>
                 <area target="" alt="up"    title="up"     id="up"     ontouchstart="touchCross('up')"   ontouchend="touchCrossEnd('up')" coords="${coord1},0,${coord2},${coord1}" shape="rect">
                 <area target="" alt="left"  title="left"   id="left"   ontouchstart="touchCross('left')" ontouchend="touchCrossEnd('left')" coords="0,${coord1},${coord1},${coord2}" shape="rect">
                 <area target="" alt="down"  title="down"   id="down"   ontouchstart="touchCross('down')" ontouchend="touchCrossEnd('down')" coords="${coord2},${coord2},${coord1},${sideLength}" shape="rect">
                 <area target="" alt="right" title="right"  id="right"  ontouchstart="touchCross('right')" ontouchend="touchCrossEnd('right')" coords="${sideLength},${coord1},${coord2},${coord2}" shape="rect">   
             </map> `;
    return cross;
}
/**
 * The function simulates pressing the control pad.
 * @param {string} position The parameter resembles the 
 */
function touchCross(position) {
    document.getElementById('crossMap').src = `img/0.Own_Pictures/${position}.png`;
    switch (position) {
        case 'left': keyboard.LEFT = true;
            break;
        case 'up': keyboard.SPACE = true;
            break;
        case 'down': keyboard.THROW = true;
            break;
        case 'right': keyboard.RIGHT = true;
            break;
    }
}

function touchCrossEnd(position) {
    document.getElementById('crossMap').src = "img/0.Own_Pictures/cross.png";
    switch (position) {
        case 'left': keyboard.LEFT = false;
            break;
        case 'up': keyboard.SPACE = false;
            break;
        case 'down': keyboard.THROW = false;
            break;
        case 'right': keyboard.RIGHT = false;
            break;
    }
}

function buttonPush(button, command) {

}


/**
 * 
 * @param {string} intervalName The name of the interval which needs to be cleared while restarting the game.
 */



function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    allIntervals.push(id);
}

function stopGame() {
    allIntervals.forEach(clearInterval);
}


