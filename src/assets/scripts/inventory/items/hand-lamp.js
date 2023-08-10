
class HandLamp extends Item {

    constructor(scene, char) {
        super(scene, char, "TOOL", "hand-lamp", "img-item-hand-lamp", 0);

        this.setOffsetsUp(14, 6);
        this.setOffsetsDown(-14, 15);
        this.setOffsetsLeft(-17, 14);
        this.setOffsetsRight(6, 14);

        this.setFrameUpDown(0);
        this.setFrameLeftRight(1);

    }

    update() {
        super.update(this);
    }

}