
class Kiro extends NPC {

    /*
     * Constructor
     */
    constructor(scene, x, y) {
        super("kiro", scene, x, y, "img-char-kiro");

        this.movements = [
            new Movement("kiro-0", this, 630, this.y, { canTalk: false, faceWhenDone: "down" }),
            new Movement("kiro-1", this, 630, 335, { canTalk: false, faceWhenDone: "right" })
        ];

        this.animsKey = "kiro";

        this.firstName = "Kiro";
        this.lastName = "Kenito";

    }


    /*
     * Methods
     */
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
    }

}