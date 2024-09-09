import { Settings } from "../scenes/settings.js";

import {
    colliderJugadorPlataformas,
    exceptoDesdeAbajo
} from "../functions/functions.js";

export class Plataforma
{
    constructor(scene, args)
    {
        this.relatedScene = scene;
        this.args = args;
    }

    create()
    {
        const {xIni, yIni, xTiles, yTiles, ancho, alto, scale, sueloAncho, depth, nroPlataformas, id} = this.args;

        
        if (id === 0 || id === nroPlataformas)
        {
            console.log(id, nroPlataformas, yIni * alto);
            Settings.setMetaCoorY(yIni * alto);

            this.plataforma = this.relatedScene.physics.add.staticGroup();

            const selectFrame = id === 0 ? 2 : 3;
            const y = id === 0 ? 10 : yIni;

            for (let i = 1; i <= sueloAncho; i ++)
            {
                this.plataforma.create(
                    (-1 + i) * ancho,
                    y * alto,
                    'plataformas',
                    selectFrame
                );
            }
        }
        else
        {
            this.plataforma = this.relatedScene.physics.add.staticGroup();

            for (let i = 1; i <= xTiles; i ++)
            {
                const rnd = Phaser.Math.Between(0, 100);
                const selectFrame = rnd < 19 ? 0 : 1;

                this.plataforma.create(
                    (xIni + i) * ancho,
                    yIni * alto,
                    'plataformas',
                    selectFrame
                );
            }
        }

        this.plataforma.children.iterate(plataf =>
        {
            plataf.setDepth(depth);
        });

        // this.relatedScene.physics.add.existing(this.plataforma, true);

        // this.plataforma.body.setAllowGravity(false);
        // this.plataforma.setImmovable(true);
        
        this.relatedScene.physics.add.collider(this.relatedScene.jugador.get(), this.plataforma,
            colliderJugadorPlataformas, exceptoDesdeAbajo, this);

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
