/**
 * @jest-environment jsdom
*/
import Phaser from 'phaser';
import GameOver from '../scenes/PreloaderScene';
import gameconfig from '../_mocks/gameconfig';

const game = new Phaser.Game(gameconfig);

test('1. Test game over scene inheritance from phaser ', () => {
  const testScene = new GameOver();
  expect(testScene instanceof Phaser.Scene).toBeTruthy();
});

test('2. Test if the scene was added to the game', () => {
  game.scene.add('Preload', GameOver);
  expect(game.scene.getScenes.length).toBe(2);
});

test('3. Test if preload is a function', () => {
  const gameOverScene = new GameOver();
  expect(typeof gameOverScene.preload).toBe('function');
});

test('4. game scene is a subclass of scene', () => {
  expect(GameOver.prototype instanceof Phaser.Scene).toBe(true);
});
