
let level1;
function initLevel1() {

    let generatedCoinCluster = 0;
    let coins;
    let BACKGROUND = [];
    let LEVEL_END;
    let LEVEL_START = 100;
    let BOTTLE = [];
    let CLOUDS = [];
    let LOOT = [];
    let ENEMIES = [];
    let BACKGROUND_CHANGING = [[
        'img/5.Fondo/Capas/5.cielo_1920-1080px.png',
        'img/5.Fondo/Capas/3.Fondo3/1.png',
        'img/5.Fondo/Capas/2.Fondo2/1.png',
        'img/5.Fondo/Capas/1.suelo-fondo1/1.png'
    ],
    ['img/5.Fondo/Capas/5.cielo_1920-1080px.png',
        'img/5.Fondo/Capas/3.Fondo3/2.png',
        'img/5.Fondo/Capas/2.Fondo2/2.png',
        'img/5.Fondo/Capas/1.suelo-fondo1/2.png'
    ]];
    let CLOUDS_CHANGING = [
        'img/5.Fondo/Capas/4.nubes/1.png',
        'img/5.Fondo/Capas/4.nubes/2.png'];


    generateLevel(16);

    /**
     * These are the elements which presents the majority of the map.
     */

    level1 = new Level(
        ENEMIES,
        CLOUDS,
        BACKGROUND,
        BOTTLE,
        LOOT,
        LEVEL_END
    );

    /**
     * The function generates the whole Level depending on the worlds length. 
     * @param {number} worldLength The variable represents the map size. As higher the number as bigger the size of the map.
     */


    function generateLevel(worldLength) {
        generateBackground(worldLength);
        generateLoot(worldLength);
        generateEnemies(worldLength);
        generateClouds(worldLength);
        generateBottles(worldLength);
    }



    function generateBackground(worldLength) {

        for (let i = -1; i < worldLength; i++) {
            if (isOdd(i) == true) {
                for (let k = 0; k < BACKGROUND_CHANGING[0].length; k++) {
                    x = i * 719
                    BACKGROUND.push(new StaticObject(BACKGROUND_CHANGING[0][k], x))
                }
            }
            else if (isOdd(i) == false) {
                for (let m = 0; m < BACKGROUND_CHANGING[1].length; m++) {
                    x = i * 719
                    BACKGROUND.push(new StaticObject(BACKGROUND_CHANGING[1][m], x))
                }
            }
        }
        LEVEL_END = worldLength * 719 - 630;
       }

    function generateClouds(worldLength) {
        for (let i = -1; i < worldLength; i++) {
            if (isOdd(i) == true) {
                for (let k = 0; k < CLOUDS_CHANGING.length; k++) {
                    x = i * 719
                    CLOUDS.push(new Cloud(CLOUDS_CHANGING[0], x, LEVEL_END));
                }
            }
            else if (isOdd(i) == false) {
                for (let m = 0; m < CLOUDS_CHANGING.length; m++) {
                    x = i * 719
                    CLOUDS.push(new Cloud(CLOUDS_CHANGING[1], x, LEVEL_END))
                }
            }
        }
    }

    function generateBottles(worldLength) {
        for (let i = 0; i < worldLength; i++) {
            let xPosition = Number(getRandomArbitrary(LEVEL_START, LEVEL_END - 1200).toFixed(0));
            let yPostion = Number(getRandomArbitrary(100, 300).toFixed(0));
            BOTTLE.push(new LootableObject(xPosition, yPostion));
        }
    }




    /* TODO: not doubled xPosition
    in interval to prevent coins from being to near to each other*/

    /**
     * 
     * @param {number} worldLength The parameter reflects the length of the world. 
     * @param {number} coinNumber The total number of coins in the world.
     */


    function generateLoot(worldLength) {
        let minX = 100;
        coins = 4 * worldLength;
        while (coins > 0) {
            generatedCoinCluster++;
            let levelPart = 719 * generatedCoinCluster;
            let xPosition = getRandomArbitrary(minX + 225, levelPart).toFixed(0);
            minX = Number(xPosition);
            randomXPosition = minX;
            coinCluster(randomXPosition, 3, 7);
        }
    }


    /**
     * 
     * @param {number} randomXPosition Position where a cluster of coins will be generated.
     * @param {number} numberOfCoins Number of coins in the whole world.
     * @param {number} clusterMin Minimum number of coins in a cluster.
     * @param {number} clusterMax Maximum number of coins in a cluster.
     */

    function coinCluster(randomXPosition, clusterMin, clusterMax) {

        clusterNumber = Number(getRandomArbitrary(clusterMin, clusterMax).toFixed(0));
        if (clusterNumber >= coins) {
            clusterNumber = coins;
            coins = coins - clusterNumber;
            generateCoinParabel(clusterNumber, randomXPosition);
        }
        else {
            generateCoinParabel(clusterNumber, randomXPosition);
            coins = coins - clusterNumber;
        }
    }

    function generateCoinParabel(clusterNumber, randomXPosition) {

        let randomYPosition = Number(getRandomArbitrary(5, 150).toFixed(0))
        for (let j = (-clusterNumber + 1) / 2; j < clusterNumber / 2; j++) {
            let x = randomXPosition + j * 50;
            let y = Number((((x - randomXPosition) ** 2) / 100).toFixed(0)) + randomYPosition;
            LOOT.push(new Coin(x, y));
        }
    }



    function generateEnemies(worldLength) {
        endbossPosition = LEVEL_END - 9000;
        ENEMIES.push(new Endboss(endbossPosition));
        for (let i = 0; i < worldLength - 1; i++) {
            minX = 500;
            let enemyAmount = i / 2;
            let levelPart = 719 * i;
            if (enemyAmount < 7) {
                generateEnemiesAtX(minX, levelPart, Chicken, enemyAmount);
            }
            else {
                enemyAmount >= 7;
                generateEnemiesAtX(minX, levelPart, Chicken, enemyAmount);
            }
        }
    }


    function generateEnemiesAtX(minX, levelPart, enemy, enemyAmount) {

        for (let i = 1; i < enemyAmount; i++) {
            let xPosition = Number(getRandomArbitrary(minX, levelPart).toFixed(0));
            currentEnemy = new enemy(xPosition);
            minX = xPosition;
            ENEMIES.push(currentEnemy);
        }
    }

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

}


/**
    * 
    * @param {number} num The parameter tests if a number is odd.
    * @returns true when the number isOdd
    */



function isOdd(num) { return Math.abs(num % 2) }







