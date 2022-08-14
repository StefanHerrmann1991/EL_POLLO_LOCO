class Level {
  enemies;
  clouds;
  backgrounds;
  bottles;
  level_end_x;

/**
 * the constructor for generate new levels.
 * @param {object} enemies The different enemies which be encountered in the game.
 * @param {object} clouds Moving clouds in the background.
 * @param {object} backgrounds The background images of the level.
 * @param {object} bottles The lootable object of bottles.
 * @param {number} level_end_x The endpoint of the game.
 */

  constructor(enemies, clouds, backgrounds, bottles, level_end_x) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgrounds = backgrounds;
    this.bottles = bottles;
    this.level_end_x = level_end_x;
    }
}


