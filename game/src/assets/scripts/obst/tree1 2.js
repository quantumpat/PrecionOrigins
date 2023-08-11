
class Tree1 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, type) {

        super(scene, x, y);

        this.setTexture("img-obst-tree1");
        this.setPosition(x, y);
        this.setScale(scene.worldScale);

        scene.physics.add.existing(this);
        this.body.setImmovable(true);

        //Scale body with offset
        this.setSize(10, 4);
        this.body.setOffset(27, 90);

        this.depth = Math.round(this.y + 100);

        this.setFrame(type);
        this.type = type;

        scene.add.existing(this);

        this.setPipeline("Light2D");

    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
    }
}