
class TakarTutorialDialogue1 extends Dialogue {

    constructor(scene) {
        super(scene.uiScene.dialogueManager);

        this.addDialoguePart(new DialoguePart({
            text: "Let's go already!",
            type: 1
        }));

        this.addDialoguePart(new DialoguePart({
            text: "To sprint press the \"SHIFT\" key.",
            type: 2
        }));

    }

}