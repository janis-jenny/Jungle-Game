import Phaser from 'phaser';
import MainScene from './scenes/MainScene';
import BootScene from './scenes/BootScene';
import PreloaderScene from './scenes/PreloaderScene';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      enableBody: true,
    },
  },
  scene: [MainScene],
};

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);
game.score = 0;
export default game;