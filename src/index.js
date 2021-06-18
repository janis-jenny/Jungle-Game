import Phaser from 'phaser';
// import BootScene from './scenes/BootScene';
import PreloaderScene from './scenes/PreloaderScene';
import MainScene from './scenes/MainScene';
import './css/stylesheet.css';

const config = {
  type: Phaser.AUTO,
  width: 1260,
  height: 585,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
      enableBody: true,
    },
  },
  scene: [PreloaderScene, MainScene],
};

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);
game.score = 0;

export default game;