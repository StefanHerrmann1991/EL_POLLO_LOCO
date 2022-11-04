let canvas;
let world;
let keyboard;
let allIntervals = [];
let allTimeouts = [];
let start = false;
let isInFullscreen = false;
let menuSound = new Audio('audio/selectSound.mp3');
let touchScreen = false;
let deviceStart = true;
let help = true;
let walking_sound = new Audio('audio/walking.mp3');
let jumping_sound = new Audio('audio/jumping.mp3');
let musicIsOn = false;
let backgroundMusic = new Audio('audio/backgroundMusic.mp3');

/* Using test() method to search regexp in details
it returns boolean value*/
const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

/**
 * The functio generates the Level before the game is started, to reduce the loading time.
 */


function generateLevel1() {
    canvas = document.getElementById('canvas');
    initLevel1();
    toggleStartBtn('showStory');
}

/** 
 * The function initiates the canvas and for the game relevant functions.
 * 
*/

function initGame() {
    start = true;    
    toggleStartBtn('restart');
    loadControlPanel();
    keyboard = new Keyboard();
    world = new World(canvas, keyboard);
}

function absorbEvent_(event) {
    var e = event || window.event;
    e.preventDefault && e.preventDefault();
    e.stopPropagation && e.stopPropagation();
    e.cancelBubble = true;
    e.returnValue = false;
    return false;
}

function preventLongPressMenu(nodes) {
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].ontouchstart = absorbEvent_;
        nodes[i].ontouchmove = absorbEvent_;
        nodes[i].ontouchend = absorbEvent_;
        nodes[i].ontouchcancel = absorbEvent_;
    }
}



/**
 * The function changes the start button depending on the state of the game.
 * @param {string} startCondition 
 * 
 * 
 */

function toggleStartBtn(startCondition) {
    let start = getId('startButton');

    if (startCondition == 'showStory') {
        start.innerHTML = `
        <div onclick="toggleStartBtn('firstStart')">Start</div>`;

    }

    if (startCondition == 'firstStart') {
        startStory();
        start.innerHTML = `
        <div onclick="initGame()">Start</div>`;

    }

    if (startCondition == 'restart') {
        toggleMusic();
        start.innerHTML = `
        <div onclick="restartGame()">Restart</div>`;
        renderDeviceBar();
    }

}

function restartGame() {
    stopGame();
    stopAllTimeouts();
    initLevel1();
    initGame();
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
    if (start) {
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
}

/**
 * The function enables the usage of the keyboard.
 * @param {event} e when  the corresponing key isn't clicked anymore
 */

document.onkeyup = function (e) {
    if (start) {
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
}

function jumpBtn() {
    if (start)
        keyboard.SPACE = true;
}

function jumpBtnFalse() {
    if (start)
        keyboard.SPACE = false;
}

/**
 * The function renders the control cross and the help button depending on the device and orientation. * 
 */

function loadControlPanel() {

    let crossPosition = document.getElementById('crossPosition');
    let controlBtnPosition = document.getElementById('controlBtnPosition');
    crossPosition.innerHTML = '';
    controlBtnPosition.innerHTML = '';
    if (isMobile()) {
        getId('fullscreen').classList.add('d-none');
        checkMobile();
        getId('title').classList.add('d-none');
    }

    else {
        getId('fullscreen').classList.remove('d-none');
        getId('title').classList.remove('d-none');
        if (start)
            showDesktopMode();
    }
}

function toggleMusic() {
    musicIsOn = !musicIsOn;
    if (musicIsOn) {
        backgroundMusic.volume = 0.2;
        backgroundMusic.play();
    }
    else {
        backgroundMusic.pause();
    }

}

function showDesktopMode() {
    touchScreen = false;
    let helpForDesktop = getId('crossPosition');
    let desktopHelp = keyboardHelpBar();
    helpForDesktop.insertAdjacentHTML('afterbegin', desktopHelp);
}

function checkMobile() {
    touchScreen = true;
    if (window.matchMedia("(orientation: landscape)").matches) {
        changeOrientation('landscape');
        if (start) {
            insertCross('controlCross2');
            insertButtons();
        }
    }
    if (window.matchMedia("(orientation: portrait)").matches) {
        changeOrientation('portrait');
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
* Depending of the side length, the scale of the cross element is determined.
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
                 <area target="" alt="left"  title="left"   id="left"   ontouchstart="touchCross('${path}','left')" ontouchend="touchCrossEnd(${path}','cross')" coords="0,${coord1},${coord1},${coord2}" shape="rect">
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

/**
 * The function that is responsible for the pop up window, which occurs when the device is in portrait
 * @param {string} orientation Landscape or portrait change
 */

function changeOrientation(orientation) {
    let chooseDevice = getId('deviceSetting');
    if (orientation == 'landscape') {
        chooseDevice.classList.add('d-none');
    }
    if (orientation == 'portrait') {
        chooseDevice.classList.remove('d-none')
    }
}

function renderDeviceBar() {
    if (start) {
        let helpCheckbox = getId('settingCheckboxes');
        helpCheckbox.innerHTML = '';
        let text = controlBar();
        helpCheckbox.insertAdjacentHTML('afterbegin', text);
    }

}

function controlBar() {
    return `
    <div class="checkbox"><input type="checkbox" id="helpSmartDesk" checked onclick="showHelp()">Help for controls
    </div>
    <div class="checkbox"><input type="checkbox" id="backgroundMusic" checked onclick="toggleMusic()">Background music
    </div>`
}

function getId(id) { return document.getElementById(`${id}`) }

function keyboardHelpBar() {
    let keyboardHelp = ` 
    <div class="desk-help" id="desktopHelp">
    <div><b>Jump</b>: Space</div>
    <div><b>Throw</b>: &uarr; or W</div>       
    <div><b>Dodge</b>: &darr; or S</div>
    <div><b>Left</b>:  &larr; or A</div>
    <div><b>Right</b>: &rarr; or D</div>
    </div>
    `;
    return keyboardHelp
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
    <div class="btn-help" id="helpBtn">Jump</div>
    </div>
`;
    return newButtons;
}



function toggleOptionPanel() {
    styleSetting = document.getElementById('settingMenu').classList.toggle('d-none');
}


function chooseDevice(boolean) {
    if (boolean == 'touchScreen') { touchScreen = true; }
    if (boolean == 'desktop') { touchScreen = false; }
    renderHelpBar();
}



function showHelp() {

    help = !help;
    if (touchScreen) {
        let smartHelp = getId('help');
        let helpBtn = getId('helpBtn');
        smartHelp.classList.toggle('d-none');
        helpBtn.classList.toggle('d-none');
    }
    if (!touchScreen) {
        let desktopHelp = getId('desktopHelp');
        desktopHelp.classList.toggle('d-none')
    }
}


/**
 * The function simulates pressing the control pad.
 * @param {string} position The parameter resembles the 
 */
function touchCross(img, position) {
    document.getElementById('crossMap').src = `img/0.Own_Pictures/${img}/${position}.png`;
    if (start) {
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
}

function touchCrossEnd(img, position) {
    document.getElementById('crossMap').src = `img/0.Own_Pictures/${img}/${position}.png`;
    if (start) {
        switch (position) {
            case 'cross':
                keyboard.LEFT = false;
                keyboard.THROW = false;
                keyboard.DODGE = false;
                keyboard.RIGHT = false;
                event.preventDefault();
                break;
        }
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

function stopAllTimeouts() {
    allTimeouts.forEach(clearTimeout);
    allTimeouts = [];
}



/**The function prevents an audio bug in chrome. */



/**
 * The function stops a single audio depending on the id of the audio.
 * @param {string} mp3JSON.timeoutId The id of the corresponing timeout.
*/

function stopTimeout(mp3JSON) {
    if (mp3JSON.soundIsPlayedOnce) {
        mp3JSON.audios.forEach(audio => audio.pause());
        clearTimeout(JSON.parse(mp3JSON.timeoutId));
    }
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



