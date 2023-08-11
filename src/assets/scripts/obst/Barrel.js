
class Barrel extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, frame) {

        super(scene, x, y);

        this.setTexture("img-obst-barrel");
        this.setPosition(x, y);

        this.setFrame(frame);

        scene.physics.add.existing(this);
        this.body.setImmovable(true);

        //Scale body with offset
        this.setSize(30, 16);
        this.body.setOffset(0, 44);

        this.depth = Math.round(this.y);

        scene.add.existing(this);

        this.setPipeline("Light2D");

    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
    }
}