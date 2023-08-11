
class TakarTutorialKiroDialogue1 extends Dialogue {

    constructor(scene) {

        super(scene.uiScene.dialogueManager);

        this.addDialoguePart(new DialoguePart({
            text: "Ohh look, a Spotted Mountain Bear!",
            type: 1
        }));

        this.addDialoguePart(new DialoguePart({
            text: "Spotted Mountain Bear's are one of the rarest species of Takar.",
            type: 1
        }));

        this.addDialoguePart(new DialoguePart({
            text: "Some people go an entire lifetime without seeing one.",
            type: 1
        }));

    }

}