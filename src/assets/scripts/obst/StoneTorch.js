
class StoneTorch extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {

        super(scene, x, y);

        this.setTexture("img-obst-stone-lamp");
        this.setPosition(x, y);

        scene.physics.add.existing(this);
        this.body.setImmovable(true);

        this.light = scene.lights.addLight(x, y, 150);
        this.light.setIntensity(1);
        this.light.setColor(0xffaa68);

        this.soundFx = this.scene.sound.add("audio-fire-crackle");
        this.soundFx.play({
            loop: true,
            volume: 0.4,
            source: {
                x: this.x,
                y: this.y - 20,
                refDistance: 10,
                follow: this.image
            }
        });

        //Scale body with offset
        this.setCircle(4);
        this.body.setOffset(0, 16);

        this.depth = Math.round(this.y - 8);

        scene.add.existing(this);

        this.play("on");

    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
    }
}