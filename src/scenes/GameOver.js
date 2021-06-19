/* eslint-disable class-methods-use-this */
import Phaser from 'phaser';
import { gameState } from './MainScene';
import ApiScore from './ApiScore';
import bg from '../assets/boot-background.png';
import gamoraDead from '../assets/dead_gamora.png';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  preload() {
    this.load.image('bg', bg);
    this.load.spritesheet('dead_gamora', gamoraDead, { frameWidth: 40, frameHeight: 34 });
  }

  create() {
    gameState.active = true;
    this.add.image(630, 300, 'bg').setScale(2.5);
    this.add.text(468, 23, 'GAME', { fontFamily: '"Monoton"', fontSize: 80, color: '#a99561' });
    this.add.text(470, 104, 'OVER', { fontFamily: '"Monoton"', fontSize: 80, color: '#a99561' });

    gameState.player = this.physics.add.sprite(620, 240, 'dead_gamora').setScale(2);
    gameState.player.body.allowGravity = false;
    gameState.player.anims.play('dead');
    this.anims.create({
      key: 'dead',
      frames: this.anims.generateFrameNumbers('dead_gamora', { start: 0, end: 4 }),
      frameRate: 4,
      repeat: -1,
    });

    this.playAgain = this.add.text(500, 400, 'Play Again');
    this.scoreBoard = this.add.text(500, 430, 'Score Board');
    this.playAgain.setInteractive({ useHandCursor: true });
    this.scoreBoard.setInteractive({ useHandCursor: true });
    this.pointer = this.input.activePointer;

    this.playAgain.on('pointerdown', () => {
      this.scene.start('Preloader');
      const playerNameInput = document.querySelector('#playerName');
      playerNameInput.classList.remove('hide');
      playerNameInput.value = '';
    });

    this.scoreBoard.on('pointerdown', () => {
      this.scene.start('ScoreBoard');
    });

    this.gameOverScore = this.add.text(550, 480, '', {
      fontFamily: 'Arial', fontSize: 45, color: '#ffffff',
    });

    this.gameOverScore.setText('Loading score ...');
    const username = document.querySelector('#playerName').value.trim();
    const score = new ApiScore();
    score.getScore(username, gameState.score);
    this.setGameOverScoreText(score);
  }

  async setGameOverScoreText(res) {
    const fontOptions = {
      fontSize: '50px',
      fontStyle: 'bolder',
      fill: '#d2e603',
      align: 'center',
      strokeThickness: 10,
      stroke: '#81b214',
    };
    const result = await res;
    if (result) this.gameOverScore.setText(`Your score is ${result}`, fontOptions);
  }

  update() {
    if (gameState.active) {
      gameState.player.anims.play('dead', true);
    }
  }
}