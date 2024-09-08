import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: 320,
    height: 320,
    parent: 'game-container',
    backgroundColor: '#871',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
          debug: false,
          gravity: {y: 500}
        }
    },
    pixelArt: true,
    scene: [
        Boot,
        Preloader,
        MainMenu,
        Game,
    ]
};

export default new Phaser.Game(config);
