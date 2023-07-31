
class Kiro extends NPC {

    /*
     * Constructor
     */
    constructor(scene, x, y) {
        super(scene, x, y, "img-char-kiro");

        this.movements = [
            new Movement("kiro-0", this, 550, this.y, { faceDownWhenDone: true })
        ];

        this.walkAnimsKey = "kiro";

        this.firstName = "Kiro";
        this.lastName = "Kenito";

        this.items = [
            new HandLamp(this.scene, this)
        ];


        //Add animations for Kiro walking with item

    }


    /*
     * Methods
     */
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
    }

}