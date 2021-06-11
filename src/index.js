import Phaser from 'phaser';
import MainScene from './scenes/MainScene';
import BootScene from './scenes/BootScene';
import PreloaderScene from './scenes/PreloaderScene';

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
  scene: [MainScene],
};

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);
game.score = 0;
window.focus();
resize();
window.addEventListener("resize", resize, false);
export default game;