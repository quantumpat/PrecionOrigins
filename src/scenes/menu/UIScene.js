
class UIScene extends Phaser.Scene {

    constructor() {
        super({ key: "UI", active: true });
    }

    preload() {
        //Assets
        this.load.setPath("./src/assets/");

        //Spritesheets
        this.load.spritesheet("img-ui-dialogue-bg", "images/ui/screens/dialogue-bg.png", { frameWidth: 900, frameHeight: 200 });
        this.load.spritesheet("img-ui-dialogue-option-btn", "images/ui/buttons/dialogue-option-btn.png", { frameWidth: 886, frameHeight: 30 });
        this.load.spritesheet("img-ui-save-btn", "images/ui/buttons/save-btn.png", { frameWidth: 32, frameHeight: 32 });

    }

    create() {

        this.isSaving = false;
        const scene = this;




        this.gameScene = this.scene.get("TakarTutorial");
        const gameScene = this.gameScene;






        /*
         * Hover Text
         */
        this.hoverText = this.add.text(1270, 706, "", { fontFamily: "pixel1", fontSize: 16, color: "#f0f0f0", align: "right" });
        this.hoverText.setScrollFactor(0);
        this.hoverText.setOrigin(1, 1);
        this.hoverText.setDepth(100000000);






        /*
         * Dialogue
         */
        this.dialogueManager = new DialogueManager(this);










        /*
         * Save Game
         */
        this.saveGameBtn = this.add.image(1270, 10, "img-ui-save-btn", 0);
        this.saveGameBtn.setOrigin(1, 0);
        this.saveGameBtn.setVisible(false);
        this.saveGameBtn.setInteractive({ cursor: "pointer" });
        this.saveGameBtn.setScrollFactor(0);
        this.saveGameBtn.setAlpha(0.8);

        this.saveGameBtn.on("pointerover", function() {
            this.saveGameBtn.setAlpha(1);
            this.hoverText.setText("Save Game");
        }, this);
        this.saveGameBtn.on("pointerout", function() {
            this.saveGameBtn.setAlpha(0.8);
            this.hoverText.setText("");
        }, this);
        this.saveGameBtn.on("pointerdown", function() {
            this.saveGameBtn.setFrame(1);

            gameScene.saveGame();
        }, this);
        this.saveGameBtn.on("pointerup", function() {
            scene.isSaving = true;

            if (gameScene.player != null) {
                gameScene.player.setTalking(true);
            }

            this.saveGameBtn.setVisible(false);

            this.saveGameBtn.setFrame(0);

            const dialogue = new Dialogue(this.dialogueManager, [
                new DialoguePart({
                    text: "Game Saved!",
                    type: 2
                })
            ]);

            const btn = this.saveGameBtn;
            dialogue.onComplete = function() {
                scene.isSaving = false;

                if (gameScene.player != null) {
                    gameScene.player.setTalking(false);
                }

                btn.setVisible(true);
            };

            this.dialogueManager.start(dialogue);

        }, this);

    }

    switchTo(sceneKey) {
        this.gameScene = this.scene.get(sceneKey);
        const gameScene = this.gameScene;
    }

    update() {
        this.hoverText.x = this.input.activePointer.x;
        this.hoverText.y = this.input.activePointer.y;
    }

}