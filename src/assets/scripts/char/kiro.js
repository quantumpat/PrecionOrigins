
class Kiro extends NPC {

    /*
     * Constructor
     */
    constructor(scene, x, y) {
        super(scene, x, y, "img-char-kiro");

        this.movements = [
            new Movement("kiro-0", this, 1650, this.y, {faceDownWhenDone: true})
        ];

        this.walkAnimsKey = "kiro";

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