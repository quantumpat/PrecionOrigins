
class Kiro extends Phaser.Physics.Arcade.Sprite {

    /*
     * Constructor
     */
    constructor(scene, x, y) {
        super(scene, x, y);

        this.setTexture("img-char-kiro");
        this.setPosition(x, y);
        this.setScale(scene.worldScale);

        scene.physics.add.existing(this);
        scene.add.existing(this);

        this.body.setSize(6, 3);
        this.body.setOffset(13, 29);
        this.setImmovable(true);

        this.talkRadius = 80;
        this.isTalking = false;
        this.canTalk = true;
        this.onTalk = function() {};

        this.direction = "down";
        this.setFrame(8);

        this.isStanding = true;

        this.firstName = "Kiro";
        this.lastName = "Kenito";

        this.setPipeline("Light2D");

        this.dialogues = [];
        this.currentDialogue = null;

    }


    /*
     * Methods
     */
    preUpdate() {
        super.preUpdate();

        this.setDepth(Math.round(this.y));
    }

    addDialogue(dialogue, callback) {

        let dia = dialogue;
        dia.onComplete = callback;

        if (this.dialogues.length == 0) {
            this.currentDialogue = dia;
        }

        this.dialogues.push(dia);

    }


    /*
     * Getters & Setters
     */
    getTalkRadius() {
        return this.talkRadius;
    }

    setTalkRadius(radius) {
        this.talkRadius = radius;
    }

    getTalking() {
        return this.isTalking;
    }

    setTalking(talking) {
        this.isTalking = talking;
    }

    getCanTalk() {
        return this.canTalk;
    }

    setCanTalk(canTalk) {
        this.canTalk = canTalk;
    }

    getOnTalk() {
        return this.onTalk;
    }

    getDirection() {
        return this.direction;
    }

    setDirection(dir) {
        if (dir == "up") {
            this.direction = dir;
            this.setFrame(4);
        }else if (dir == "down") {
            this.direction = dir;
            this.setFrame(0);
        }else if (dir == "left") {
            this.direction = dir;
            this.setFrame(8);
        }else if (dir == "right") {
            this.direction = dir;
            this.setFrame(12);
        }
    }

    getStanding() {
        return this.isStanding;
    }

    getFirstName() {
        return this.firstName;
    }

    getLastName() {
        return this.lastName;
    }

    getDialogues() {
        return this.dialogues;
    }

    getCurrentDialogue() {
        return this.currentDialogue;
    }

}