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
/** 
 * The function initiates the canvas and for the game relevant functions.
 * 
*/

/* Storing user's device details in a variable*/
let details = navigator.userAgent;

/* Creating a regular expression
containing some mobile devices keywords
to search it in details string*/
let regexp = /android|iphone|kindle|ipad/i;

/* Using test() method to search regexp in details
it returns boolean value*/
let isMobileDevice = regexp.test(details);



function generateLevel1() {
    canvas = document.getElementById('canvas');
    initLevel1();
    toggleStartBtn('noStart');
}


function initGame() {
    start = true;
    toggleStartBtn('restart');
    loadControlPanel();
    keyboard = new Keyboard();
    world = new World(canvas, keyboard);
}


function toggleStartBtn(startCondition) {

    let menuSound = new Audio('audio/selectSound.mp3');


    if (startCondition == 'noStart') {
        document.getElementById('startButton').innerHTML = `
        <div onclick="toggleStartBtn('firstStart')">Start</div>`;
    }

    if (startCondition == 'firstStart') {
        startStory();
        document.getElementById('startButton').innerHTML = `
        <div onclick="initGame()">Start</div>`;
        menuSound.play();
    }

    if (startCondition == 'restart') {
        stopGame();
        document.getElementById('startButton').innerHTML = `
        <div onclick="restartGame()">Restart</div>`;
        menuSound.play();
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
    if(start)
    keyboard.SPACE = true;
}

function jumpBtnFalse() {
    if(start)
    keyboard.SPACE = false;
}



/**
 * The function renders the elements for the responsive view of the game.
 * 400px größtes handy
 */

function loadControlPanel() {

    let crossPosition = document.getElementById('crossPosition');
    let controlBtnPosition = document.getElementById('controlBtnPosition');
    crossPosition.innerHTML = '';
    controlBtnPosition.innerHTML = '';
    if (isMobileDevice) {
        if (window.matchMedia("(orientation: landscape)").matches) {
            insertCross('controlCross2');  
            insertButtons();
        }     
    }

    else {
        let helpForDesktop = getId('crossPosition');
        let desktopHelp = keyboardHelpBar();
        helpForDesktop.insertAdjacentHTML('afterbegin', desktopHelp);
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


function renderDeviceBar() {
    let chooseSettingDevice = getId('settingCheckboxes');
    let text = controlBar();
    chooseSettingDevice.insertAdjacentHTML('afterbegin', text);
    loadControlPanel();
}

function controlBar() {
    return `
    <div class="checkbox"><input type="checkbox" id="helpSmartDesk" checked onclick="showHelp()">Help for controls
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


function renderHelpBar() {

    let buttonPosition = getId('controlBtnPosition');
    let crossPosition = getId('crossPosition');

    if (touchScreen) {
        loadControlPanel();
        uncheckBox();    
    }

    if (!touchScreen) {
        touchScreen = false;
        if (help) {
            crossPosition.innerHTML = keyboardHelpBar();
            buttonPosition.innerHTML = '';
        }
        else { getId('helpSmartDesk').checked = false; }
        uncheckBox();
    }
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

function uncheckBox() {
    let checkBoxDesk = getId('desktop');
    let checkBoxSmart = getId('smartphone');
    if (touchScreen) {
        checkBoxDesk.checked = false;
        checkBoxSmart.checked = true;
    }
    if (!touchScreen) {
        checkBoxDesk.checked = true;
        checkBoxSmart.checked = false;
    }

}


/**
 * The function simulates pressing the control pad.
 * @param {string} position The parameter resembles the 
 */
function touchCross(path, position) {
    document.getElementById('crossMap').src = `img/0.Own_Pictures/${path}/${position}.png`;
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

/**
 * The function uses a JSON in the following format:
 * CHICKEN_SOUND = {
        'audios': [],
        'soundIsPlayedOnce': false,
        'timeoutId' : '', 
        'randomSound' : '',
    }    
 * The audios in the first Line will be played once and will be attached randomly to 
 * an object. If only one audio is in the array it will be played.   
 * @param {JSON} mp3JSON The name of the audio file.
 * @param {Number} mp3JSON.randomSound is the random sound number which will be played.
 * @param {Number} soundDuration is the length in seconds of the mp3 file.
 * @param {Number} timeoutId is the id of the timeout which can later be cleared. 
 *
*/

function playAudioOnce(mp3JSON) {

    if (!mp3JSON.soundIsPlayedOnce) {
        mp3JSON.randomSound = (Math.floor(Math.random() * mp3JSON.audios.length));
        let randomSoundPosition = mp3JSON.randomSound
        let soundDuration = mp3JSON.audios[randomSoundPosition].duration;
        mp3JSON.soundIsPlayedOnce = true;
        mp3JSON.audios[randomSoundPosition].play();
        let timeoutId = setTimeout(() => {
            mp3JSON.audios[randomSoundPosition].pause();
        }, 1000 * soundDuration);
        allTimeouts.push(timeoutId);
        mp3JSON['timeoutId'] = timeoutId;
    }
}



function stopAllTimeouts() {
    allTimeouts.forEach(clearTimeout);
    allTimeouts = [];
}




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



