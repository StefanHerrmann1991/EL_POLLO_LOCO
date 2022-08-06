let canvas;
let world;
let keyboard;
let allIntervals = [];


function startScreen() {
    document.getElementById('startScreen').classList.add('d-none');

}

function init() {
    startScreen();
    canvas = document.getElementById('canvas');
    initLevel1();
    keyboard = new Keyboard();
    world = new World(canvas, keyboard);
    lifebar = new Statusbar();
}


document.onkeydown = function (e) {
    switch (e.key) {
        case ' ':
            keyboard.SPACE = true;
            break;
        case 'ArrowLeft':
        case 'a':
            keyboard.LEFT = true;
            // left arrow
            break;
        case 'ArrowRight':
        case 'd':
            keyboard.RIGHT = true;
            break;
        case 'w':
        case 'ArrowUp':
            keyboard.THROW = true;
            break;


        // right arrow
    }
};

document.onkeyup = function (e) {
    switch (e.key) {
        case ' ':
            keyboard.SPACE = false;
            break;
        case 'ArrowLeft':
        case 'a':
            keyboard.LEFT = false;
            // left arrow
            break;
        case 'ArrowRight':
        case 'd':
            keyboard.RIGHT = false;
            break;
        case 'w':
        case 'ArrowUp':
            keyboard.THROW = false;
            break;

        // right arrow
    }
};
