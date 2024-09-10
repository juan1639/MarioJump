
export class Nubes
{
    constructor(scene, args)
    {
        this.relatedScenecene = scene;
        this.args = args;
    }

    create()
    {
        const {ancho, alto, width, height, worldBoundsHeight, depth} = this.args;

        this.nubes = this.relatedScenecene.physics.add.staticGroup();

        for (let i = -160; i > -worldBoundsHeight; i -= alto)
        {
            const rndX = Phaser.Math.Between(0, width);
            this.nubes.create(rndX, i, 'nubes-ssheet', 0);
        }

        this.nubes.children.iterate(nub =>
        {
            nub.setDepth(depth);
            nub.setFrame(Phaser.Math.Between(0, 15));
            nub.setScale(Phaser.Math.FloatBetween(0.8, 1.4));
        });

        console.log(this.nubes);
    }

    get()
    {
        return this.nubes;
    }
}
