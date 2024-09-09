
export class Jugador
{
    constructor(scene, args)
    {
        this.relatedScene = scene;
        this.args = args;
    }

    create()
    {
        const {x, y, ancho, alto, scale, potenciaSalto} = this.args;

        this.jugador = this.relatedScene.physics.add.sprite(x * ancho, y * alto, 'mario-ssheet', 0);

        this.jugador.setData('pow-jump', -480);
        this.jugador.setData('vel-x', 3);
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
        }
        else if (this.controles.right.isDown)
        {
            this.jugador.x += this.jugador.getData('vel-x');
            this.jugador.setFlipX(false);
        }

        if (this.jugador.body.touching.down)
        {
            this.jugador.setVelocityY(this.jugador.getData('pow-jump'));
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
