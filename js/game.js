let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    console.log('My Character is', world.character);
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
        // right arrow
    }
};
