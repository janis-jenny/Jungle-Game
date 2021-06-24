/**
 * @jest-environment jsdom
*/
import Phaser from 'phaser';
import PreloaderScene from '../scenes/PreloaderScene';

require('jest-canvas-mock');

/* test('1. Test if create is a function ', () => {
  const create = new PreloaderScene();
  expect(typeof create.create).toBe('function');
});
 */
test('2. Test if the game scene is a subclass of scene', () => {
  expect(PreloaderScene.prototype instanceof Phaser.Scene).toBe(true);
});