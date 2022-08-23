
let level1
function initLevel1() {
    let BACKGROUND = [];
    let LEVEL_END;
    let LEVEL_START = 100;
    let CLOUDS = [];
    let LOOT = [];
    let ENEMIES = [];
    let BACKGROUND_CHANGING = [[
        'img/5.Fondo/Capas/5.cielo_1920-1080px.png',
        'img/5.Fondo/Capas/3.Fondo3/1.png',
        'img/5.Fondo/Capas/2.Fondo2/1.png',
        'img/5.Fondo/Capas/1.suelo-fondo1/1.png'],
    [
        'img/5.Fondo/Capas/5.cielo_1920-1080px.png',
        'img/5.Fondo/Capas/3.Fondo3/2.png',
        'img/5.Fondo/Capas/2.Fondo2/2.png',
        'img/5.Fondo/Capas/1.suelo-fondo1/2.png']];

    generateBackground(15);
    generateLoot(15, 30);

    /**
     * These are the elements which presents the majority of the map.
     */

    level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Endboss()
        ],
        [
            new Cloud()
        ],
        BACKGROUND
        [
            new LootableObject(),
            new LootableObject(),
            new LootableObject(),
            new LootableObject(),
            new LootableObject(),
            new LootableObject(),
            new LootableObject()
        ],
        [
            LOOT
        ],
        LEVEL_END

    );

    /**
     * The function generates the whole Level depending on the worlds length. 
     * @param {number} worldLength The variable represents the map size. As higher the number as bigger the size of the map.
     */


    function generateLevel(worldLength) {
        generateBackground(worldLength);
        generateClouds(worldLength);
        generateEnemies(worldLength);
        generateLoot(worldLength);
    }



    function generateBackground(worldLength) {

        for (let i = -1; i < worldLength; i++) {
            if (isOdd(i) == true) {
                for (let k = 0; k < BACKGROUND_CHANGING[0].length; k++) {
                    x = i * 719
                    BACKGROUND.push(new StaticObject(`${BACKGROUND_CHANGING[0][k]}`, x))
                }
            }
            else if (isOdd(i) == false) {
                for (let m = 0; m < BACKGROUND_CHANGING[1].length; m++) {
                    x = i * 719
                    BACKGROUND.push(new StaticObject(`${BACKGROUND_CHANGING[1][m]}`, x))
                }
            }
        }
        LEVEL_END = worldLength * 719 - 630;
    }

    /**
     * 
     * @param {number} num The parameter tests if a number is odd.
     * @returns true when the number isOdd
     */

    function isOdd(num) { return Math.abs(num % 2) }

    /* TODO: not doubled xPosition
    in interval to prevent coins from being to near to each other*/

    /**
     * 
     * @param {number} worldLength The parameter reflects the length of the world. 
     * @param {number} coinNumber The total number of coins in the world.
     */

    function generateLoot(worldLength, coinNumber) {
        let randomXPosition = [];

        for (let i = 1; i < worldLength; i++) {
            let min = 100;
            let levelPart = LEVEL_END / i;
            let xPosition = getRandomArbitrary(min, levelPart);
            randomXPosition.push(xPosition);
            coinCluster(randomXPosition, coinNumber);
        }
        console.log(randomXPosition);
    }



    function generateXYCluster(coinNumber) {
        for (let i = 0; i < coinNumber; i++) {

        }


    }

    function coinCluster(randomXPosition, coins) {
        let coinCluster = [];
        for (let i = 0; i < coins; i++) {
            let x = randomXPosition + i * 50;
            let y = 100 - i * 50;
            let coin = new Coin(x, y);
            coinCluster.push(coin);
        }
        LOOT.push(coinCluster)
    }

    function randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }



    function generateEnemies(worldLength) {
        for (let i = 0; i < worldLength; i += 5) {
            ENEMIES.push(new Chicken());
        }
    }



}







