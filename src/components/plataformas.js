
export class Plataforma
{
    constructor(scene, args)
    {
        this.relatedScene = scene;
        this.args = args;
    }

    create()
    {
        const {xIni, yIni, xTiles, yTiles, ancho, alto, scale} = this.args;

        this.plataforma = this.relatedScene.add.tileSprite(
            xIni * ancho * 2,
            yIni * alto * 2,
            xTiles * ancho * 2,
            yTiles * alto * 2,
            'plataformas',
            1
        );

        this.relatedScene.physics.add.existing(this.plataforma, true);

        // this.plataforma.body.setAllowGravity(false);
        // this.plataforma.setImmovable(true);

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
