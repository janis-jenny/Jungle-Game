import Phaser from 'phaser';
import bgIntro from '../assets/boot-background.png';
import play from '../assets/play-button.png';
import '../css/stylesheet.css';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Preloader' });
  }

  preload() {
    this.load.image('boot-background', bgIntro);
    this.load.image('play-button', play);
  }

  create() {
    this.sys.game.globals.score = 0;
    this.add.image(630, 300, 'boot-background').setScale(2.5);
    this.playBtn = this.add.image(630, 460, 'play-button').setScale(0.3);
    this.playBtn.setInteractive({ useHandCursor: true });
    this.pointer = this.input.activePointer;
    this.add.text(430, 24, 'JUNGLE', { fontFamily: '"Monoton"', fontSize: 90, color: '#a99561' });
    this.add.text(470, 105, 'GAME', { fontFamily: '"Monoton"', fontSize: 90, color: '#a99561' });
    this.playBtn.on('pointerdown', () => {
      const playerName = document.querySelector('#playerName').value.trim();
      const validName = (username) => {
        if (username.length > 2) return true;
        return false;
      };

      const validUserName = validName(playerName);
      if (validUserName) {
        this.scene.start('MainScene');
        document.querySelector('#playerName').classList.add('hide');
      } else {
        const notice = this.add.text(564, 350, 'Please enter your name', { fontFamily: '"Press Start 2P"', fontSize: 15, color: '#ffffff' });
        setTimeout(() => { notice.destroy(); }, 3000);
      }
    }, this);
  }
}
