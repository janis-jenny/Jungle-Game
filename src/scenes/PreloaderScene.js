import Phaser from 'phaser';
import bg from '../assets/boot-background.png';
import play from '../assets/play-button.png'
 
export default class PreloaderScene extends Phaser.Scene {
  constructor () {
    super('Preloader');
  }
 
  preload () {
    this.load.image('boot-background', bg);
    this.load.image('play-button', play);
  }

  create() {
    this.add.image(630, 300, 'boot-background').setScale(2.5);
    this.playBtn = this.add.image(630, 460, 'play-button').setScale(0.3);
    this.playBtn.setInteractive({ useHandCursor: true });
    this.pointer = this.input.activePointer;
    this.add.text(440, 25, 'JUNGLE', { fontFamily: '"Press Start 2P"', fontSize: 100, color: '#a99561' });
    this.add.text(480, 95, 'GAME', { fontFamily: '"Press Start 2P"', fontSize: 100, color: '#a99561' });
    this.playBtn.on('pointerdown', () => {
      const playerName = document.querySelector('#playerName').value.trim();
      const validUsername = (username) => {
        if (username.length > 2) return true;
        return false;
      };
      
      const validPlayerName = validUsername(playerName);
      if (validPlayerName) {
        this.scene.start('MainScene');
        // myGame.score = 1;
        document.querySelector('#playerName').classList.add('hide');
      } else {
        const notice = this.add.text(340, 420, 'Please enter your name', { fontFamily: '"Press Start 2P"', fontSize: 15, color: '#ffffff' });
        setTimeout(() => { notice.destroy(); }, 3000);
      }
    }, this);
  }
};
