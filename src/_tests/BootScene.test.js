/**
 * @jest-environment jsdom
*/
import Phaser from 'phaser';
import BootScene from '../scenes/BootScene';
import gameconfig from '../_mocks/gameconfig';

require('jest-canvas-mock');

const game = new Phaser.Game(gameconfig);

test('1. Test boot scene inheritance from phaser ', () => {
  const testScene = new BootScene();
  expect(testScene instanceof Phaser.Scene).toBeTruthy();
});

test('2. Test if the scene was added to the game', () => {
  game.scene.add('Boot', BootScene);
  expect(game.scene.getScenes.length).toBe(2);
});