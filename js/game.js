let canvas;
let world;
let keyboard = new Keyboard();
let levelInitiated = false;


function init() {
    canvas = document.getElementById('canvas');
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
