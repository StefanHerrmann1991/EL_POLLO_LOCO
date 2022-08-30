
let level1
function initLevel1() {
    let generatedCoinCluster = 0;
    let generatedEnemies = 0;
    let coins;
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

    generateBackground(16);
    generateLoot(16);
    generateEnemies(16);

    /**
     * These are the elements which presents the majority of the map.
     */

    level1 = new Level(
        ENEMIES,
        [
            new Cloud()
        ],
        BACKGROUND,
        [
            new LootableObject(),
            new LootableObject(),
            new LootableObject(),
            new LootableObject(),
            new LootableObject(),
            new LootableObject(),
            new LootableObject()
        ],
        LOOT,
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

        for (let i = 0; i < worldLength - 1; i++) {
            minX = 100;
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
        endbossPosition = LEVEL_END - 4000;
        ENEMIES.push(new Endboss(endbossPosition))
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




/*
 
            let levelPart2 = worldLength * 719 * 2 / 4;
let levelPart3 = worldLength * 719 * 3 / 4;
let levelPart4 = worldLength * 719 * 4 / 4;
if (levelQuarter < 0.25 && levelQuarter > 0) {
        calcEnemyAmount(worldLength, enemyAmount, 0.25);
        let levelPart = levelXQuarter * 0.25;
        generateEnemiesAtRanX(minX, enemyAmount, Chicken, levelPart);
    }
    else if (levelQuarter < 0.5 && levelQuarter > 0.25) {
        calcEnemyAmount(worldLength, enemyAmount, 0.5)
    }
    else if (levelQuarter < 0.75 && levelQuarter > 0.5) { calcEnemyAmount(worldLength, enemyAmount, 0.75) }
    else if (levelQuarter < 1.0 && levelQuarter > 0.75) { calcEnemyAmount(worldLength, enemyAmount, 1.0) }     function calcEnemyAmount(worldLength, enemyAmount) {
let numberOfEnemies = levelPercent * worldLength;
enemyAmount = enemyAmount - numberOfEnemies;
}*/













