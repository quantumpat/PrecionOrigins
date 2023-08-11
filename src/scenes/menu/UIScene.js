
class UIScene extends Phaser.Scene {

    constructor() {
        super({ key: "UI", active: true });
    }

    preload() {
        //Assets
        this.load.setPath("./src/assets/");

        //Images
        this.load.image("img-ui-main-menu-bg", "images/ui/screens/main-menu-bg.png");

        //Spritesheets
        this.load.spritesheet("img-ui-close-menu-btn", "images/ui/buttons/close-menu-btn.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("img-ui-dialogue-bg", "images/ui/screens/dialogue-bg.png", { frameWidth: 900, frameHeight: 200 });
        this.load.spritesheet("img-ui-dialogue-option-btn", "images/ui/buttons/dialogue-option-btn.png", { frameWidth: 886, frameHeight: 30 });
        this.load.spritesheet("img-ui-save-btn", "images/ui/buttons/save-btn.png", { frameWidth: 40, frameHeight: 40 });
        this.load.spritesheet("img-ui-fullscreen-btn", "images/ui/buttons/fullscreen-btn.png", { frameWidth: 40, frameHeight: 40 });

    }

    create() {

        this.canOpenMenu = false;
        this.isSaving = false;
        this.isMenuOpen = false;
        this.isFullscreen = false;
        const scene = this;



        this.gameSceneKey = "TakarTutorial";
        this.gameScene = this.scene.get(this.gameSceneKey);






        /*
         * Dialogue
         */
        this.dialogueManager = new DialogueManager(this);








        /*
         * Main Menu
         */
        this.mainMenuContainer = this.add.container(0, 0);
        this.mainMenuContainer.setScrollFactor(0);
        this.mainMenuContainer.setVisible(false);
        this.mainMenuContainer.setDepth(1);

        this.darkScreen = this.add.image(640, 360, "img-ui-black-screen");
        this.darkScreen.setAlpha(0.4);
        this.mainMenuContainer.add(this.darkScreen);

        this.mainMenuBg = this.add.image(640, 360, "img-ui-main-menu-bg");
        this.mainMenuContainer.add(this.mainMenuBg);


        //Save Game
        this.saveGameBtn = this.add.image(1270, 10, "img-ui-save-btn", 0);
        this.saveGameBtn.setOrigin(1, 0);
        this.saveGameBtn.setInteractive({ cursor: "pointer" });
        this.mainMenuContainer.add(this.saveGameBtn);

        this.saveGameBtn.on("pointerover", function() {
            this.saveGameBtn.setFrame(1);
            this.hoverText.setText("Save Game");
        }, this);
        this.saveGameBtn.on("pointerout", function() {
            this.saveGameBtn.setFrame(0);
            this.hoverText.setText("");
        }, this);
        this.saveGameBtn.on("pointerdown", function() {
            this.saveGameBtn.setFrame(2);

            if (this.gameScene != null) {
                this.gameScene.saveGame();
            }
        }, this);
        this.saveGameBtn.on("pointerup", function() {
            scene.isSaving = true;

            this.saveGameBtn.setVisible(false);
            this.saveGameBtn.setFrame(0);

            this.closeMenu();

            const dialogue = new Dialogue(this.dialogueManager, [
                new DialoguePart({
                    text: "Game Saved!",
                    type: 2
                })
            ]);

            const btn = this.saveGameBtn;
            dialogue.onComplete = function() {
                scene.isSaving = false;

                btn.setVisible(true);
            };

            this.dialogueManager.start(dialogue);

        }, this);


        //Fullscreen Btn
        this.fullscreenBtn = this.add.image(1170, 70, "img-ui-fullscreen-btn");
        this.fullscreenBtn.setOrigin(1, 0);
        this.fullscreenBtn.setInteractive({ cursor: "pointer" });
        this.mainMenuContainer.add(this.fullscreenBtn);

        this.fullscreenBtn.on("pointerover", function() {
            this.fullscreenBtn.setFrame(1);
            this.hoverText.setText("Fullscreen");
        }, this);
        this.fullscreenBtn.on("pointerout", function() {
            this.fullscreenBtn.setFrame(0);
            this.hoverText.setText("");
        }, this);
        this.fullscreenBtn.on("pointerdown", function() {
            this.fullscreenBtn.setFrame(2);
        }, this);
        this.fullscreenBtn.on("pointerup", function() {
            if (this.isFullscreen) {
                console.log("fullscreen-off");
                this.isFullscreen = false;
            }else {
                console.log("fullscreen-on");
                this.isFullscreen = true;
            }
        }, this);



        //Close Menu Btn
        this.closeMenuBtn = this.add.image(100, 60, "img-ui-close-menu-btn");
        this.closeMenuBtn.setOrigin(0, 0);
        this.closeMenuBtn.setInteractive({ cursor: "pointer" });
        this.mainMenuContainer.add(this.closeMenuBtn);

        this.closeMenuBtn.on("pointerover", function() {
            this.closeMenuBtn.setFrame(1);
            this.hoverText.setText("Close");
        }, this);
        this.closeMenuBtn.on("pointerout", function() {
            this.closeMenuBtn.setFrame(0);
            this.hoverText.setText("");
        }, this);
        this.closeMenuBtn.on("pointerup", function() {
            this.closeMenu();
        }, this);




        /*
         * Hover Text
         */
        this.hoverText = this.add.text(640, 650, "", { fontFamily: "pixel1", fontSize: 16, color: "#f0f0f0", align: "right" });
        this.hoverText.setScrollFactor(0);
        this.hoverText.setOrigin(0.5, 1);
        this.hoverText.setDepth(2);
        this.mainMenuContainer.add(this.hoverText);




        //Closing the menu (with key)
        this.menuKeys = [ this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC), this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M) ];
        this.input.keyboard.on("keydown", event => {

            for (let i = 0; i < this.menuKeys.length; i++) {
                if (event.keyCode == this.menuKeys[i].keyCode) {
                    if (this.isMenuOpen) {
                        this.closeMenu();
                    }else {
                        this.openMenu();
                    }
                }
            }

        }, this);


    }

    openMenu() {

        if (this.isMenuOpen) {
            return;
        }

        if (!this.canOpenMenu) {
            return;
        }

        if (this.gameScene.player != null) {
            if (this.gameScene.player.isTalking) {
                return;
            }
        }

        if (this.gameScene != null) {
            this.scene.pause(this.gameScene.scene.key);
        }

        this.isMenuOpen = true;
        this.mainMenuContainer.setVisible(true);

    }

    closeMenu() {

        if (!this.isMenuOpen) {
            return;
        }

        if (this.gameScene != null) {
            this.scene.resume(this.gameScene.scene.key);
        }

        this.isMenuOpen = false;
        this.mainMenuContainer.setVisible(false);

    }

    switchTo(sceneKey) {
        this.gameSceneKey = sceneKey;
        this.gameScene = this.scene.get(sceneKey);

        this.scene.bringToTop();
    }

}