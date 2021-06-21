/* eslint-disable class-methods-use-this */
import Phaser from 'phaser';
import { gameState } from './MainScene';
import bgOver from '../assets/boot-background.png';
import gamoraDead from '../assets/dead_gamora.png';
import '../css/stylesheet.css';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOver' });
  }

  preload() {
    this.load.image('bg', bgOver);
    this.load.spritesheet('dead_gamora', gamoraDead, { frameWidth: 40, frameHeight: 34 });
  }

  create() {
    const { sys: { game: { globals: { api, score } } } } = this;
    const username = document.querySelector('#playerName').value.trim();
    api.saveScore(username, score);
    gameState.active = true;
    this.add.image(630, 290, 'bg').setScale(2.5);
    this.add.text(500, 23, 'GAME', { fontFamily: '"Monoton"', fontSize: 80, color: '#a99561' });
    this.add.text(504, 104, 'OVER', { fontFamily: '"Monoton"', fontSize: 80, color: '#a99561' });

    gameState.player = this.physics.add.sprite(635, 240, 'dead_gamora').setScale(2);
    gameState.player.body.allowGravity = false;
    gameState.player.anims.play('dead');
    this.anims.create({
      key: 'dead',
      frames: this.anims.generateFrameNumbers('dead_gamora', { start: 0, end: 4 }),
      frameRate: 4,
      repeat: -1,
    });

    this.playAgain = this.add.text(650, 400, 'Play again', { fontFamily: '"Train One"', fontSize: 30, color: '#a99561' })
      .setOrigin(0.5)
      .setPadding(7)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        this.scene.start('PreloaderScene');
        const playerNameInput = document.querySelector('#playerName');
        playerNameInput.classList.remove('hide');
        playerNameInput.value = '';
      })
      .on('pointerover', () => this.playAgain.setStyle({ fill: '#a99561' }))
      .on('pointerout', () => this.playAgain.setStyle({ fill: '#f8e578' }));

    this.scoreBoard = this.add.text(650, 470, 'Score board', { fontFamily: '"Train One"', fontSize: 30, color: '#a99561' })
      .setOrigin(0.5)
      .setPadding(7)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        this.scene.start('ScoreBoard');
      })
      .on('pointerover', () => this.scoreBoard.setStyle({ fill: '#a99561' }))
      .on('pointerout', () => this.scoreBoard.setStyle({ fill: '#f8e578' }));

    this.gameOverScore = this.add.text(520, 290, '', {
      fontFamily: '"Train One"', fontSize: 30, color: '#a99561', fontStyle: 'bolder',
    });

    this.gameOverScore.setText(`Your score is ${this.sys.game.globals.score}`);
  }

  update() {
    if (gameState.active) {
      gameState.player.anims.play('dead', true);
    }
  }
}