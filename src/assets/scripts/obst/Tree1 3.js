
class Tree1 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, type = 0) {

        super(scene, x, y);

        this.setTexture("img-obst-tree0");
        this.setPosition(x, y);

        scene.physics.add.existing(this);
        this.body.setImmovable(true);

        //Scale body with offset
        this.setSize(24, 10);
        this.body.setOffset(86, 145);

        this.depth = Math.round(this.y + 50);

        this.setFrame(type);
        this.type = type;

        scene.add.existing(this);

        this.setPipeline("Light2D");

    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
    }
}