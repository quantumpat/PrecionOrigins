
class Doorway1 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, nextSceneKey, nextSceneData) {

        super(scene, x, y);

        this.nextSceneKey = nextSceneKey;
        this.nextSceneData = nextSceneData;

        this.setTexture("img-obst-doorway1");
        this.setPosition(x, y);
        this.setScale(scene.worldScale);

        scene.physics.add.existing(this);
        this.body.setImmovable(true);

        this.activated = false;

        //Scale body with offset

        this.depth = Math.round(this.y);

        scene.add.existing(this);

        this.setPipeline("Light2D");

    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
    }

    callback(player) {

        if (this.activated) {
            return;
        }

        player.setCanControl(false);

        this.activated = true;

        this.sceneFade = this.scene.add.image(640, 360, "img-ui-black-screen");
        this.sceneFade.setScrollFactor(0);
        this.sceneFade.setOrigin(0.5, 0.5);
        this.sceneFade.setAlpha(0);
        this.sceneFade.setDepth(1000000);

        const scene = this.scene;
        this.scene.tweens.add({
            targets: this.sceneFade,
            alpha: 1,
            ease: "Power1",
            duration: 1000,
            delay: 100,
            onComplete: function() {
                scene.scene.start(this.nextSceneKey, this.nextSceneData);
            }
        });

    }

    checkOverlap(player) {
        this.setDepth(player.depth - 100);

        if (player.body.left > this.body.left && player.body.top > this.body.top && player.body.right < this.body.right + 50 && player.body.bottom < this.body.bottom) {
            this.callback(player);
        }
    }

    hasActivated() {
        return this.activated;
    }
}