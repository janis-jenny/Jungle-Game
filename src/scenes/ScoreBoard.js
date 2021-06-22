import Phaser from 'phaser';
import bgScore from '../assets/boot-background.png';

export default class ScoreBoard extends Phaser.Scene {
  constructor() {
    super({ key: 'ScoreBoard' });
  }

  preload() {
    this.load.image('boot-background', bgScore);
  }

  async create() {
    this.add.image(630, 290, 'boot-background').setScale(2.5);
    this.add.text(380, 30, 'LEADERBOARD', { fontFamily: '"Monoton"', fontSize: 60, color: '#a99561' });

    this.playAgain = this.add.text(650, 460, 'Play again', { fontFamily: '"Train One"', fontSize: 30, color: '#a99561' })
      .setOrigin(0.5)
      .setPadding(7)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        this.scene.start('Preloader');
        const playerNameInput = document.querySelector('#playerName');
        playerNameInput.classList.remove('hide');
        playerNameInput.value = '';
      })
      .on('pointerover', () => this.playAgain.setStyle({ fill: '#a99561' }))
      .on('pointerout', () => this.playAgain.setStyle({ fill: '#f8e578' }));

    this.loading = this.add.text(500, 290, '', {
      fontFamily: '"Train One"', fontSize: 30, color: '#a99561', fontStyle: 'bolder',
    });
    this.loading.setText('Loading top scores ...');

    const top = await this.getTopScores();
    this.deleteLoadingText(top);

    let gap = 0;
    top.forEach((item) => {
      this.add.text(530, 170 + gap, `${item.user} -------------  ${item.score}`, {
        fontSize: '17px',
        fill: '#f8e578',
        width: 400,
        fontFamily: '"Train One"',
        padding: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
        },
      });
      gap += 50;
    });
  }

  async getTopScores() {
    const { sys: { game: { globals: { api: apiScore } } } } = this;
    const scores = await apiScore.getScores();
    const array = [];
    scores.forEach((item) => array.push({ user: item.user, score: item.score }));
    const topScores = array.sort((a, b) => b.score - a.score).slice(1, 6);

    return topScores;
  }

  async deleteLoadingText(scores) {
    const topScores = await scores;
    if (topScores) { this.loading.destroy(); }
  }
}
