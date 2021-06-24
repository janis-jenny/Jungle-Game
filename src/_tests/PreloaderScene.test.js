/**
 * @jest-environment jsdom
*/
import Phaser from 'phaser';
import PreloaderScene from '../scenes/PreloaderScene';
import gameconfig from '../_mocks/gameconfig';

require('jest-canvas-mock');

const game = new Phaser.Game(gameconfig);

test('1. Test if create is a function ', () => {
  const create = new PreloaderScene();
  expect(typeof create.create).toBe('function');
});

test('2. Test if the game scene is a subclass of scene', () => {
  expect(PreloaderScene.prototype instanceof Phaser.Scene).toBe(true);
});

test('3. Test preloader scene inheritance from phaser ', () => {
  const testScene = new PreloaderScene();
  expect(testScene instanceof Phaser.Scene).toBeTruthy();
});

test('4. Test if the scene was added to the game', () => {
  game.scene.add('Preloader', PreloaderScene);
  expect(game.scene.getScenes.length).toBe(2);
});