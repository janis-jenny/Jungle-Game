import Phaser from 'phaser';
// import BootScene from './scenes/BootScene';
import PreloaderScene from './scenes/PreloaderScene';
import MainScene from './scenes/MainScene';
import GameOver from './scenes/GameOver';
import ScoreBoard from './scenes/ScoreBoard';
import './css/stylesheet.css';
import ApiScore from './scenes/ApiScore';

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
  scene: [PreloaderScene, MainScene, GameOver, ScoreBoard],
};

// eslint-disable-next-line no-unused-vars
// PreloaderScene, MainScene,

const api = new ApiScore();

const game = new Phaser.Game(config);
game.globals = { score: 0, api };

export default game;