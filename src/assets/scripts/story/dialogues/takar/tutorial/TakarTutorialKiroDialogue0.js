
class TakarTutorialKiroDialogue0 extends Dialogue {

    constructor(scene) {

        super(scene.uiScene.dialogueManager);

        this.addDialoguePart(new DialoguePart({
            text: "Finally, you made it.",
            type: 1
        }));

        this.addDialoguePart(new DialoguePart({
            text: "We don't want to worry anyone back home, so lets get going!",
            type: 1
        }));

        this.addDialoguePart(new DialoguePart({
            text: "Follow " + scene.kiro.getFirstName() + " down the path back to the village.",
            type: 2
        }));

    }

}
