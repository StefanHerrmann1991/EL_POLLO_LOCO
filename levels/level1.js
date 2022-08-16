
let level1
function initLevel1() {
    let BACKGROUND = [];
    let LEVEL_END = [];
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

    function generateLoot(worldLength) {
        for (let i = 0; i < worldLength; i+=3) {
        LOOT.push(new LootableObject());}
    }
    function generateEnemies(worldLength) {
        for (let i = 0; i < worldLength; i+= 5) {
           ENEMIES.push(new Chicken());}
    }

}







