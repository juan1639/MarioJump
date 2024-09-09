import { Scene } from 'phaser';
import { Textos } from '../components/textos.js';
import { BotonNuevaPartida } from '../components/boton-nuevapartida.js';
import { play_sonidos, particulas } from '../functions/functions.js';
import { Settings } from './settings.js';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    init()
    {
        this.sonidoMarioTuberias = this.sound.add('mario-tuberias');

        this.botoninicio = new BotonNuevaPartida(this, {
            left: Math.floor(this.sys.game.config.width / 2),
            top: Math.floor(this.sys.game.config.height / 1.25),
            id: 'boton-nueva-partida',
            scX: 0.6, scY: 0.5, angle: 1, originX: 0.5, originY: 0.5,
            texto: ' New Game ', nextScene: 'Game'
        });

        this.txt = new Textos(this, {
            x: Math.floor(this.sys.game.config.width / 2),
            y: 0,
            txt: ' Mario \n Jump ',
            size: 48, color: '#ffa', style: 'bold',
            stroke: '#fa1', sizeStroke: 8,
            shadowOsx: 2, shadowOsy: 2, shadowColor: '#111',
            bool1: false, bool2: true, origin: [0.5, 0.5],
            elastic: Math.floor(this.sys.game.config.height / 4), dura: 3000
        });

        /* this.txtRecords = new Textos(this, {
            x: Math.floor(this.sys.game.config.width / 2),
            y: 0,
            txt: ' Tabla records ',
            size: 28, color: '#ffa', style: 'bold',
            stroke: '#5e1', sizeStroke: 7,
            shadowOsx: 2, shadowOsy: 2, shadowColor: '#111',
            bool1: false, bool2: true, origin: [0.5, 0.5],
            elastic: Math.floor(this.sys.game.config.height / 1.7), dura: 3000
        }); */
    }

    preload() {}

    create()
    {
        const aparecerBoton = 1800; // 1800

        this.add.image(0, 0, 'fondo-azul-celeste').setOrigin(0, 0).setDepth(Settings.DEPTH.fondo);

        this.txt.create();
        this.txt.get().setDepth(Settings.DEPTH.textos);

        //this.txtRecords.create();
        //this.txtRecords.get().setVisible(true).setDepth(Settings.depth.textos);
        //console.log(this.txtRecords.get().visible);

        const basedOn = this.add.text(
            Math.floor(this.sys.game.config.width / 9),
            Math.floor(this.sys.game.config.height / 1.04),
            'Based on classic arcade Super Mario Bros (1985)',
            {fontSize: '12px', color: '#9ff', align: 'justify', fontFamily: 'Arial'}
        );

        const coorXY = [
            Math.floor(this.sys.game.config.width / 2),
            Math.floor(this.sys.game.config.height / 20),
            Math.floor(this.sys.game.config.height / 5)
        ];

        const timeline = this.add.timeline([
            {
                at: aparecerBoton,
                run: () =>
                {
                    this.botoninicio.create();

                    particulas(
                        coorXY[0], coorXY[2] + 50,
                        'particula1',
                        {min: 60, max: 120},
                        {min: 2500, max: 3000},
                        {start: 0.2, end: 0},
                        0xffcc11,
                        null, false, this
                    );    
                }
            }
        ]);

        timeline.play();

        play_sonidos(this.sonidoMarioTuberias, false, 0.1);
        
        console.log(this.txt);
    }

    update()
    {
        // this.jugador.update();
    }
}
