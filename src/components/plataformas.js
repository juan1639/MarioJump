import { colliderJugadorPlataformas } from "../functions/functions.js";

export class Plataforma
{
    constructor(scene, args)
    {
        this.relatedScene = scene;
        this.args = args;
    }

    create()
    {
        const {xIni, yIni, xTiles, yTiles, ancho, alto, scale, sueloAncho, id} = this.args;

        if (id === 0)
        {
            this.plataforma = this.relatedScene.physics.add.staticGroup();

            for (let i = 1; i <= sueloAncho; i ++)
            {
                this.plataforma.create(
                    (-1 + i) * ancho,
                    10 * alto,
                    'plataformas',
                    2
                );
            }
        }
        else
        {
            this.plataforma = this.relatedScene.physics.add.staticGroup();

            this.plataforma.create(
                xIni * ancho,
                yIni * alto,
                'plataformas',
                1
            );
        }

        this.relatedScene.physics.add.existing(this.plataforma, true);

        // this.plataforma.body.setAllowGravity(false);
        // this.plataforma.setImmovable(true);
        
        this.relatedScene.physics.add.collider(this.relatedScene.jugador.get(), this.plataforma,
            colliderJugadorPlataformas, null, this);

        console.log(this.plataforma);
    }

    update()
    {
    }

    get()
    {
        return this.plataforma;
    }
}
