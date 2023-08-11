
class TakarTutorialDialogue0 extends Dialogue {

    constructor(scene) {
        super(scene.uiScene.dialogueManager);

        this.addDialoguePart(new DialoguePart({
            text: "Hey, " + scene.player.getFirstName() + " you alright over there?",
            type: 1,
            options: [
                {
                    text: "I'm alright"
                },
                {
                    text: "Yes!"
                }
            ]
        }));

        this.addDialoguePart(new DialoguePart({
            text: "Ok good! It's getting dark out, we should probably head home.",
            type: 1
        }));

        this.addDialoguePart(new DialoguePart({
            text: "Here come over to me.",
            type: 1
        }));

        this.addDialoguePart(new DialoguePart({
            text: "To take out your lamp press \"E\".",
            type: 2
        }));
    }

}