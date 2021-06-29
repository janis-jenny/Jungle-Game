/**
 * @jest-environment jsdom
*/
import Phaser from 'phaser';
import MainScene from '../scenes/PreloaderScene';
import gameconfig from '../_mocks/gameconfig';

const game = new Phaser.Game(gameconfig);

test('1. Test game scene inheritance from phaser ', () => {
  const testScene = new MainScene();
  expect(testScene instanceof Phaser.Scene).toBeTruthy();
});

test('2. Test if the scene was added to the game', () => {
  game.scene.add('MainScene', MainScene);
  expect(game.scene.getScenes.length).toBe(2);
});

test('3. Test if update is a function', () => {
  const mainScene = new MainScene();
  expect(typeof mainScene.update).toBe('function');
});

test('4. Test if Main scene is a subclass of scene', () => {
  expect(MainScene.prototype instanceof Phaser.Scene).toBe(true);
});