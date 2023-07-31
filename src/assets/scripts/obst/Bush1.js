
class Bush1 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {

        super(scene, x, y);

        this.setTexture("img-obst-bush1");
        this.setPosition(x, y);

        scene.physics.add.existing(this);
        this.body.setImmovable(true);

        //Scale body with offset
        this.setSize(32, 22);
        this.body.setOffset(0, 8);

        this.depth = Math.round(this.y - 8);

        scene.add.existing(this);

        this.setPipeline("Light2D");

    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
    }
}