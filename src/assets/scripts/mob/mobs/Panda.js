
class Panda extends Mob {

    /*
     * Constructor
     */
    constructor(scene, x, y) {
        super("panda", scene, x, y, "img-mob-panda");

        //Body offset & size
        this.setDirectionalBodySizes(32, 4, 18, 22);
        this.setDirectionalOffsets(8, 28, 16, 10);
        this.body.setSize(18, 22);
        this.body.setOffset(16, 10);

        this.movements = [
            new Movement("panda-right", this, 900, this.y, {})
        ];

        this.setScale(1.25);

        this.walkSpeed = 30;

        this.animsKey = "panda";

        this.hasIdleAnimation = true;
    }


    /*
     * Methods
     */
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
    }

}