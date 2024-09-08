
export class Jugador
{
    constructor(scene, args)
    {
        this.relatedScene = scene;
        this.args = args;
    }

    create()
    {
        
        const {x, y, ancho, alto, scale} = this.args;

        this.jugador = this.relatedScene.physics.add.sprite(x * ancho, y * alto, 'mario-ssheet', 0);

        this.jugador.setScale(scale);

        console.log(this.jugador);
    }

    update()
    {

    }

    get()
    {
        return this.jugador;
    }
}
