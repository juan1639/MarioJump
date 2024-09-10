import { Scene } from 'phaser';
import { Textos } from '../components/textos.js';

export class Preloader extends Scene
{
    constructor()
    {
        super('Preloader');
    }

    init()
    {
        const widthScreen = this.sys.game.config.width;
        const heightScreen = this.sys.game.config.height;

        this.load.image('fondo', 'assets/img/bg.png');
        this.add.image(0, 0, 'fondo').setOrigin(0, 0);

        this.txt = new Textos(this, {
            x: Math.floor(widthScreen / 2),
            y: Math.floor(heightScreen / 3.5),
            txt: ' Loading...',
            size: 24, color: '#ffa', style: '400',
            stroke: '#f91', sizeStroke: 4,
            shadowOsx: 2, shadowOsy: 2, shadowColor: '#111',
            bool1: false, bool2: true, origin: [0.5, 0.5],
            elastic: false, dura: 0
        });

        this.txt.create();

        this.add.rectangle(
            Math.floor(widthScreen / 2), Math.floor(heightScreen / 2),
            Math.floor(widthScreen / 1.5), Math.floor(heightScreen / 12)
        ).setStrokeStyle(1, 0xffee88);

        const bar = this.add.rectangle(
            Math.floor(widthScreen / 2) - Math.floor(widthScreen / 3) + 4,
            Math.floor(heightScreen / 2),
            4,
            Math.floor(heightScreen / 14),
            0xff9911
        );

        this.load.on('progress', (progress) => {
            bar.width = (Math.floor(widthScreen / 1.52) * progress);
        });
    } 
    
    preload()
    {
        this.load.setPath('assets');

        this.load.image('fondo-azul-celeste', './img/fondo-azul-celeste.png');

        this.load.image('boton-nueva-partida', './img/ui-newgame.png');
        this.load.image('boton-more-settings', './img/ui-newgame.png');
        this.load.image('boton-fire-joystick', './img/ui-1.png');
        this.load.image('cruceta', './img/cruceta-up.png');
        this.load.spritesheet('radio-buttons', './img/radio-buttons-ssheet.png', {frameWidth: 50, frameHeight: 50});
        this.load.spritesheet('boton-fullscreen', './img/boton-fullscreen.png', {frameWidth: 64, frameHeight: 64});

        this.load.image('particula1', './img/particula1.png');
        
        this.load.bitmapFont('font-fire', '/img/azo-fire.png', '/img/azo-fire.xml');

        this.load.spritesheet('plataformas', './img/plataformas-ssheet.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('mario-ssheet', './img/mario-ss1-mod.png', {frameWidth: 16, frameHeight: 16});

        this.load.image('letrero-IMI', './img/Letrero-IMI-64x64.png');

        this.load.spritesheet('nubes-ssheet', './img/nubes-ssheet.png', {frameWidth: 80, frameHeight: 80});

        //  -----------------------------------------------------------------------------------
        //  Archivos de audio
        //  -----------------------------------------------------------------------------------
        this.load.audio('mario-tuberias', './audio/mario-tuberias.mp3');
        this.load.audio('key', './audio/key.wav');
        this.load.audio('numkey', './audio/numkey.wav');
        this.load.audio('gameover-retro', './audio/gameoveretro.ogg');
        this.load.audio('jump-bros', './audio/jumpbros.ogg');
        this.load.audio('fireworks', './audio/fireworks.mp3');
        
        //this.load.audio('you-win', './audio/you-win.mp3');
    }

    create()
    {
        this.scene.start('MainMenu');
    }
}
