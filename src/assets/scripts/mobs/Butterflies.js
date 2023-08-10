
class Butterflies {

    /*
     * Constructor
     */
    constructor(scene) {

        this.scene = scene;

        this.group = this.scene.add.group();

    }


    /*
     * Methods
     */
    generate(num) {

        for (let i = 0; i < num; i++) {

            let x = Math.floor(Math.random() * (this.scene.physics.world.bounds.width - 0 + 1));
            let y = Math.floor(Math.random() * (this.scene.physics.world.bounds.height - 0 + 1));

            let butterfly = this.scene.add.sprite(x, y, "img-mob-butterfly");
            butterfly.light = this.scene.lights.addLight(x, y, 50).setIntensity(0.2);
            butterfly.anims.play("butterfly-fly", true);
            butterfly.setDepth(99999);
            butterfly.setScale(0.5);
            butterfly.setPipeline("Light2D");

            let tween = this.scene.tweens.add({
                targets: [butterfly, butterfly.light],
                x: Math.floor(Math.random() * (this.scene.physics.world.bounds.width - 0 + 1)),
                y: Math.floor(Math.random() * (this.scene.physics.world.bounds.height - 0 + 1)),
                ease: "Power2",
                repeat: -1,
                delay: Math.floor(Math.random() * (2000 - 500 + 1) + 500),
                yoyo: true,
                duration: 100000
            });

            this.group.add(butterfly);

        }

    }


    /*
     * Getters & Setters
     */
    getScene() {
        return this.scene;
    }

    getGroup() {
        return this.group;
    }

}