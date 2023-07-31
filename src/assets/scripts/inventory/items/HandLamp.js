
class HandLamp extends Item {

    constructor(scene, char) {
        super(scene, char, "TOOL", "hand-lamp", "img-item-hand-lamp", 0);

        this.setOffsetsUp(4, 2);
        this.setOffsetsDown(-4, 5);
        this.setOffsetsLeft(-6, 4);
        this.setOffsetsRight(2, 4);

        this.setFrameUpDown(0);
        this.setFrameLeftRight(1);

        this.light = scene.lights.addLight(char.x, char.y, 75).setIntensity(0.9);
        this.light.setVisible(this.isActive);

    }

    update() {

        super.update();

        if (this.isActive) {
            this.light.setVisible(true);
        }else {
            this.light.setVisible(false);
        }

        this.light.setPosition(this.char.x, this.char.y);
    }

}