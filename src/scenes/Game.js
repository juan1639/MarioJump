// ============================================================
//      P a c - C l o n  -->  Phaser  |  By Juan Eguia
//   
//      https://juan1639.github.io/PacClon2-vite-phaser
// 
// ------------------------------------------------------------
import { Scene } from 'phaser';
import { Plataforma } from '../components/plataformas.js';
import { Jugador } from '../components/jugador.js';
import { Textos } from '../components/textos.js';
import { Marcador } from './../components/marcador.js';
import { Settings } from './settings.js';

import {
  BotonNuevaPartida,
  BotonFullScreen,
  CrucetaControl
} from '../components/boton-nuevapartida.js';

import {
  colliderJugadorPlataformas,
  play_sonidos
} from '../functions/functions.js';

export class Game extends Scene
{
  constructor()
  {
    super('Game');
  }

  init()
  {
    Settings.setGameOver(false);
    Settings.setNivelSuperado(false);

    const {
      TILE_SIZE,
      SCALE_GAME,
      SCALE_SPRITES,
      NRO_COLUMNAS,
      NRO_FILAS,
      RND_PLAT_ARGS
    } = Settings;

    let vertical = 10;
    this.arrayPlataformas = [];

    for (let i = 0; i < 3; i ++)
    {
      const x = Phaser.Math.Between(0, NRO_COLUMNAS - 3);
      const y = vertical;
      const ancho = Phaser.Math.Between(RND_PLAT_ARGS.ANCHO_MIN, RND_PLAT_ARGS.ANCHO_MAX);
      const alto = Phaser.Math.Between(RND_PLAT_ARGS.ALTO_MIN, RND_PLAT_ARGS.ALTO_MAX);

      this.plataforma = new Plataforma(this, {

        xIni: x, yIni: y,
        xTiles: ancho, yTiles: alto,
        ancho: TILE_SIZE.X, alto: TILE_SIZE.Y,
        scale: SCALE_GAME,
        sueloAncho: NRO_COLUMNAS + 2,
        id: i
      });

      this.arrayPlataformas.push(this.plataforma);

      vertical -= 3 + Phaser.Math.Between(0, 1);
    }

    this.jugador = new Jugador(this, {

      x: 2, y: 2,
      ancho: TILE_SIZE.X, alto: TILE_SIZE.Y,
      scale: SCALE_SPRITES
    });

    this.instanciar_mobileControls();
    this.instanciar_marcadores();
  }

  preload() {}

  create()
  {
    this.add.image(0, 0, 'fondo-azul-celeste').setScale(1).setOrigin(0, 0);

    this.arrayPlataformas.forEach(plataf =>
    {
      plataf.create();
    });

    this.jugador.create();

    //this.set_sonidos();
    //this.set_cameras();
    //this.set_cameras_controles();
    this.set_cameras_marcadores();

    // this.marcadorPtos.create();
    // this.marcadorNivel.create();
    // this.marcadorHi.create();
    this.botonfullscreen.create();
    // this.botonesc.create();

    this.crucetaup.create();  
    this.crucetado.create();  
    this.crucetale.create();  
    this.crucetari.create();  

    this.hideMobileControls();

    //this.cameras.main.startFollow(this.jugador.get());
    // this.cameras.main.followOffset.set(0, 0);

    this.set_colliders();
  }

  update()
  {
  }

  set_colliders()
  { 
    // Collide Jugador-Puntitos
    this.physics.add.collider(this.jugador.get(), this.arrayPlataformas, colliderJugadorPlataformas, null, this);
    
    // Collide Jugador-PuntitosGordos
    //this.physics.add.overlap(this.jugador.get(), this.puntitosgordos.get(), colliderJugadorPuntitosGordos, exceptoScary, this);

    // Collide Jugador-Frutas
    //this.physics.add.overlap(this.jugador.get(), this.cerezas.get(), colliderJugadorFruta, null, this);

    // Overlap Jugador-Fantasmas
    //this.physics.add.overlap(this.jugador.get(), this.fantasmas.get(), overlapJugadorFantasmas, exceptoNotVisible, this);
  }

  hideMobileControls()
  {
    console.log(Settings.controlElegido);
    
    if (!Settings.controlElegido.mobile)
    {
      this.crucetale.get().setVisible(false);
      this.crucetari.get().setVisible(false);
      this.crucetaup.get().setVisible(false);
      this.crucetado.get().setVisible(false);
    }
  }

  set_cameras()
  {
    this.cameras.main.setBounds(
      0, -Math.floor(Settings.tileXY.y / 2),
      Math.floor(this.sys.game.config.width * Settings.screen.escBoundsX),
      Math.floor(this.sys.game.config.height * Settings.screen.escBoundsY + Math.floor(Settings.tileXY.y / 2))
    );

    this.physics.world.setBounds(
      0, -Math.floor(Settings.tileXY.y / 2),
      Math.floor(this.sys.game.config.width * Settings.screen.escBoundsX),
      Math.floor(this.sys.game.config.height * Settings.screen.escBoundsY + Math.floor(Settings.tileXY.y / 2))
    );
  }

  set_cameras_controles()
  {
    var { x, y, ancho, alto, scrollX, scrollY } = Settings.getCameraControles();
    
    this.mapa_controles = this.cameras.add(x, y, ancho, alto).setZoom(0.9).setName('view-controls').setAlpha(1).setOrigin(0, 0);
    this.mapa_controles.scrollX = scrollX;
    this.mapa_controles.scrollY = scrollY;
    // console.log(this.mapa_controles);
  }
  
  set_cameras_marcadores()
  {
    var { x, y, ancho, alto, scrollX, scrollY } = Settings.cameraScores;
    
    this.mapa_scores = this.cameras.add(x, y, ancho, alto).setZoom(0.6).setName('view-scores').setAlpha(1).setOrigin(0, 0);
    this.mapa_scores.scrollX = scrollX;
    this.mapa_scores.scrollY = scrollY;
    // console.log(this.mapa_scores);
  }

  instanciar_marcadores()
  {
    const ancho = this.sys.game.config.width;
    const alto = this.sys.game.config.height;

    const marcadoresPosY = -99;

    this.marcadorPtos = new Marcador(this, {
      x: 10, y: marcadoresPosY, size: 40, txt: Settings.getTxtScore(), color: '#fff', strokeColor: '#af1', id: 0
    });

    this.marcadorNivel = new Marcador(this, {
      x: Math.floor(ancho / 2), y: marcadoresPosY, size: 40, txt: ' Level: ', color: '#ff5', strokeColor: '#16d', id: 1
    });

    this.marcadorHi = new Marcador(this, {
      x: Math.floor(ancho / 1.2), y: marcadoresPosY, size: 40, txt: ' Record: ', color: '#fff', strokeColor: '#af1',id: 2
    });

    this.botonfullscreen = new BotonFullScreen(this, {
      x: Math.floor(ancho * 1.3), y: marcadoresPosY + 7, id: 'boton-fullscreen',
      orX: 0, orY: 0, scX: 1.2, scY: 0.8, ang: 0
    });

    /* this.botonesc = new BotonEsc(this, {
      left: Math.floor(ancho * 1.42), top: marcadoresPosY + 26, id: 'boton-fire-joystick',
      scX: 0.5, scY: 0.5, angle: 0, originX: 0.5, originY: 0.5, texto: 'Music', nextScene: ''
    }); */

    this.botonrejugar = new BotonNuevaPartida(this, {
      left: Math.floor(this.sys.game.config.width / 2),
      top: Math.floor(this.sys.game.config.height / 1.3),
      id: 'boton-nueva-partida',
      scX: 0.6, scY: 0.5, angle: 1, originX: 0.5, originY: 0.5,
      texto: ' Continue ', nextScene: 'MainMenu'
    });
  }

  instanciar_mobileControls()
  {
    const posY = -1000;
    const sizeXY = [128, 128];
    const gap = 20;

    this.crucetaup = new CrucetaControl(this, {
      x: sizeXY[0] + gap,
      y: posY,
      id: 'cruceta-up',
      orX: 0.5, orY: 0.5, scX: 1, scY: 1, ang: 0, alpha: 0.8, texto: ''
    });

    this.crucetado = new CrucetaControl(this, {
      x: sizeXY[0] + gap,
      y: posY + sizeXY[1] + gap,
      id: 'cruceta-do',
      orX: 0.5, orY: 0.5, scX: 1, scY: 1, ang: 180, alpha: 0.8, texto: ''
    });

    this.crucetale = new CrucetaControl(this, {
      x: 0,
      y: posY + sizeXY[1] + gap,
      id: 'cruceta-le',
      orX: 0.5, orY: 0.5, scX: 1, scY: 1, ang: 270, alpha: 0.8, texto: ''
    });

    this.crucetari = new CrucetaControl(this, {
      x: (sizeXY[0] + gap) * 2,
      y: posY + sizeXY[1] + gap,
      id: 'cruceta-ri',
      orX: 0.5, orY: 0.5, scX: 1, scY: 1, ang: 90, alpha: 0.8, texto: ''
    });
  }

  set_sonidos()
  {
    this.sonidoKey = this.sound.add('key');
    this.sonidoNumkey = this.sound.add('numkey');
    this.sonidoGameover = this.sound.add('gameover-retro');
  }
}
