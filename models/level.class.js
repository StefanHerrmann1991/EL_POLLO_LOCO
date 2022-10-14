class Level {
  enemies;
  clouds;
  backgrounds;
  bottles;
  coins;
  level_end_x;

/**
 * The constructor for generating new levels.
 * @param {object} enemies The different enemies which be encountered in the game.
 * @param {object} clouds Moving clouds in the background.
 * @param {object} backgrounds The background images of the level.
 * @param {object} bottles The lootable object of bottles.
 * @param {number} level_end_x The endpoint of the game.
 */

  constructor(enemies, clouds, backgrounds, bottles, coins, level_end_x) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgrounds = backgrounds;
    this.bottles = bottles;
    this.coins = coins; 
    this.level_end_x = level_end_x;
    }
}


