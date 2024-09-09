
export class Settings
{
    static controlElegido =
    {
        mobile: false,
        keyboard: true
    };

    static SCREEN =
    {
        WIDTH: 320,
        HEIGHT: 320,
    };

    static TILE_SIZE =
    {
        X: 32,
        Y: 32,
        X16: 16,
        Y16: 16,

    };

    static RND_PLAT_ARGS =
    {
        ANCHO_MIN: 1,
        ANCHO_MAX: 7,
        ALTO_MIN: 1,
        ALTO_MAX: 1,
    };

    static NRO_FILAS = Math.floor(Settings.SCREEN.HEIGHT / Settings.TILE_SIZE.X);
    static NRO_COLUMNAS = Math.floor(Settings.SCREEN.WIDTH / Settings.TILE_SIZE.Y);

    static FPS = 60;
    static SCALE_GAME = 1;
    static SCALE_SPRITES = 2;

    static puntos = 0;
    static nivel = 1;
    static hi = 7000;
    static top = [7000, 5000, 3000, 2000, 1000];
    static vidas = 3;

    static gameOver = false;
    static nivelSuperado = false;

    static txtScore = 'Score: ';

    static WORLD_BOUNDS_HEIGHT = [20, 20, 24, 24, 24, 25, 25, 28, 29, 30];

    static fontSettings =
    {
        id: 'font-fire',
        arrayLetras: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.-@',
        size: 48,
        osX: 4,
        osY: 4,
        oriX: 0.5,
        oriY: 0.5,
        color: 0xffff00,
        alpha: 0.3
    };

    static cameraControles =
    {
        x: 0,
        y: Settings.SCREEN.HEIGHT - (128 * 2), // 128px buttons controls
        ancho: 600,
        alto: 400,
        scrollX: -70,
        scrollY: -1080
    };

    static cameraScores =
    {
        x: 0,
        y: 0,
        ancho: Settings.SCREEN.WIDTH,
        alto: 34,
        scrollX: 0,
        scrollY: -90
    };

    static DEPTH =
    {
        fondo: -500,
        nubes: -300,
        plataformas: 100,
        jugador: 300,
        efectos: 600,
        botones: 650,
        marcadores: 700,
        controles: 800,
        textos: 900
    };

    static audio =
    {
        key: null,
        numKey: null,
    };

    /* static RECORDS =
    {
        URL_GET: process.env.URL_GET,
        URL_POST: process.env.URL_POST,
        URL_G: 'https://ejemplo-node-railway-production.up.railway.app/all',
        URL_P: 'https://ejemplo-node-railway-production.up.railway.app/create',
    }; */

    // ---------------------------------------------------
    //  G E T T E R S
    // ---------------------------------------------------
    static getConfig()
    {
        return Settings.config;
    }

    static isGameOver()
    {
        return Settings.gameOver;
    }

    static isNivelSuperado()
    {
        return Settings.nivelSuperado;
    }

    static getPuntos()
    {
        return Settings.puntos;
    }

    static getNivel()
    {
        return Settings.nivel;
    }

    static getRecord()
    {
        return Settings.hi;
    }

    static getVidas()
    {
        return Settings.vidas;
    }

    static getTxtScore()
    {
        return Settings.txtScore;
    }

    // ---------------------------------------------------
    //  S E T T E R S
    // ---------------------------------------------------
    static setGameOver(bool)
    {
        Settings.gameOver = bool;
    }

    static setNivelSuperado(bool)
    {
        Settings.nivelSuperado = bool;
    }

    static setPuntos(ptos)
    {
        Settings.puntos = ptos;
    }

    static setNivel(level)
    {
        Settings.nivel = level;
    }

    static setRecord(hiScore)
    {
        Settings.hi = hiScore;
    }

    static setVidas(lifes)
    {
        Settings.vidas = lifes;
    }
}
