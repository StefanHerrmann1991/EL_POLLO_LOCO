function generateCross() {
    let sideLength = document.getElementById('canvas').offsetWidth / 6;
    let cross = `   
        <div class="relative">
            <div class="cross-parent" style="width: ${sideLength}px; height: ${sideLength}px">
                <div class="cross-image default"></div>
                <div class="cross-image right" style="display: none;"></div>
                <div class="cross-image left" style="display: none;"></div>
                <div class="cross-image up" style="display: none;"></div>
                <div class="cross-image down" style="display: none;"></div>
                <div class="button-container">
                    <button class="btn up btn1"></button>
                    <button class="btn down btn1"></button>
                    <button class="btn left btn2 "></button>
                    <button class="btn right btn2 "></button>
                </div>
            </div>
            <div class="help" id="help">
                <div class="throw-help">Throw</div>
                <div class="right-help">Right</div>
                <div class="dodge-help">Dodge</div>
                <div class="left-help">Left</div>
            </div>
        </div>
   `;
    return cross;
}


/**
 * The function enables the responsivness of the map cross element.
 * 
 */
function insertCross() {
    let crossPosition = document.getElementById('crossPosition');
    let text = generateCross();
    crossPosition.insertAdjacentHTML('afterbegin', text);
    attachEventListenersToButtons();
}


/**
 * The function simulates pressing the control pad.
 * @param {string} position The parameter resembles the 
 */
function touchCross(position) {
    if (start) {
        switch (position) {
            case 'right': keyboard.RIGHT = true;
                break;
            case 'up': keyboard.THROW = true;
                break;
            case 'left': keyboard.LEFT = true;
                break;
            case 'down': keyboard.DODGE = true;
                break;
        }
    }
}


function touchCrossEnd() {
    if (start) {
        keyboard.LEFT = false;
        keyboard.THROW = false;
        keyboard.DODGE = false;
        keyboard.RIGHT = false;
    }
}


function attachEventListenersToButtons() {
    const buttons = document.querySelectorAll('.btn');
    const images = document.querySelectorAll('.cross-image');
    buttons.forEach(button => {
        button.addEventListener('touchstart', (event) => {
            const direction = button.classList[1];
            images.forEach(img => {
                img.style.display = img.classList.contains(direction) ? 'block' : 'none';
                touchCross(direction);
            });
        }, { passive: true });

        button.addEventListener('touchend', (event) => {
            images.forEach(img => {
                img.style.display = img === images[0] ? 'block' : 'none';
                touchCrossEnd();
            });
        });
    });
}
