
class HandLamp extends Item {

    constructor(itemManager) {
        super(itemManager);

        this.setType("tool");
        this.setName("hand-lamp");
        this.setHandImage("img-item-hand-lamp");
        this.setIconFrame(0);

        this.setOffsetsUp(4, 2);
        this.setOffsetsDown(-4, 5);
        this.setOffsetsLeft(-6, 4);
        this.setOffsetsRight(2, 4);

        this.setFrameUpDown(0);
        this.setFrameLeftRight(1);

        this.light = this.scene.lights.addLight(this.itemManager.char.x, this.itemManager.char.y, 100).setIntensity(0.7);
        this.light.setVisible(this.isActive);

    }

    on() {
        super.on();

        this.light.setVisible(true);
    }

    off() {
        super.off();

        this.light.setVisible(false);
    }

    update() {
        super.update();

        this.light.setPosition(this.char.x, this.char.y);
    }

}