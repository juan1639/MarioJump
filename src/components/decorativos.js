
export class Decorativos
{
    constructor(scene, args)
    {
        this.relatedScene = scene;
        this.args = args;
    }

    create()
    {
        const {ancho, alto, depth} = this.args;

        this.decorativos = this.relatedScene.physics.add.staticGroup();

        this.decorativos.create(1 * ancho, (9 * alto) - 8, 'letrero-IMI');

        this.decorativos.children.iterate(decor =>
        {
            decor.setDepth(depth);
        });

        console.log(this.decorativos);
    }

    get()
    {
        return this.decorativos;
    }
}
