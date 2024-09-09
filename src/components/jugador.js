import { play_sonidos } from "../functions/functions.js";
import { Settings } from "../scenes/settings.js";

export class Jugador
{
    constructor(scene, args)
    {
        this.relatedScene = scene;
        this.args = args;
    }

    create()
    {
        const {x, y, ancho, alto, scale, depth} = this.args;

        this.jugador = this.relatedScene.physics.add.sprite(x * ancho, y * alto, 'mario-ssheet', 0);

        this.jugador.setData('pow-jump', -480);
        this.jugador.setData('vel-x', 3);
        this.jugador.setDepth(depth);
        this.jugador.setScale(scale);
        // this.jugador.setVelocityY(-300);

        this.controles = this.relatedScene.input.keyboard.createCursorKeys();

        console.log(this.jugador);
    }

    update()
    {
        if (this.controles.left.isDown)
        {
            this.jugador.x -= this.jugador.getData('vel-x');
            this.jugador.setFlipX(true);
            if (this.jugador.x < 0) this.jugador.x = 0;
        }
        else if (this.controles.right.isDown)
        {
            this.jugador.x += this.jugador.getData('vel-x');
            this.jugador.setFlipX(false);
            
            if (this.jugador.x > Settings.SCREEN.WIDTH)
            {
                this.jugador.x = Settings.SCREEN.WIDTH;
            }
        }

        if (this.jugador.body.touching.down)
        {
            if (!Settings.isNivelSuperado())
            {
                this.jugador.setVelocityY(this.jugador.getData('pow-jump'));

                if (this.controles.right.isDown || this.controles.left.isDown)
                {
                    play_sonidos(this.relatedScene.sonidoJumpBros, false, 0.5);
                }
            }
        }

        this.cambiarAnimacion();
    }

    cambiarAnimacion()
    {
        if (this.jugador.body.velocity.y < 0)
        {
            this.jugador.setFrame(1);
        }
        else
        {
            this.jugador.setFrame(0);
        }
    }

    get()
    {
        return this.jugador;
    }
}
