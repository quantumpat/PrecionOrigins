
class Bush extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, frame) {

        super(scene, x, y);

        this.setTexture("img-obst-bush-med");
        this.setPosition(x, y);

        this.setFrame(frame);

        scene.physics.add.existing(this);
        this.body.setImmovable(true);

        //Scale body with offset
        this.setSize(64, 16);
        this.body.setOffset(0, 16);

        this.depth = Math.round(this.y - 8);

        scene.add.existing(this);

        this.setPipeline("Light2D");

    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
    }
}