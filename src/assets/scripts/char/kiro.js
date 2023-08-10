
class Kiro extends NPC {

    /*
     * Constructor
     */
    constructor(scene, x, y) {
        super("kiro", scene, x, y, "img-char-kiro");

        this.movements = [
            new Movement("kiro-0", this, 570, this.y, { faceDownWhenDone: true })
        ];

        this.animsKey = "kiro";

        this.firstName = "Kiro";
        this.lastName = "Kenito";

        this.items = [
            new HandLamp(this.scene, this)
        ];

    }


    /*
     * Methods
     */
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
    }

}