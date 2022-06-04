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
            keyboard.LEFT = true;
            console.log(keyboard);
            // left arrow
            break;
        case 'ArrowRight':
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
            keyboard.LEFT = false;
            // left arrow
            break;
        case 'ArrowRight':
            keyboard.RIGHT = false;
        // right arrow
    }
};
