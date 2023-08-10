
class DialogueManager {

    constructor(uiScene) {

        this.scene = uiScene;

        this.dialogues = [];
        this.currentDialogue = null;

        this.isTextWriting = false;
        this.canMoveOn = false;

        this.createUI();

    }


    /*
     * Methods
     */
    createUI() {
        this.dialogueBg = this.scene.add.image(640, 560, "img-ui-dialogue-bg", 0);
        this.dialogueBg.setScrollFactor(0);
        this.dialogueBg.setOrigin(0.5);
        this.dialogueBg.setVisible(false);
        this.dialogueBg.setDepth(10000000);
        this.dialogueBg.setInteractive({ cursor: "default" });

        this.storyText = this.scene.make.text({
            x: 640,
            y: 560,
            text: "",
            origin: { x: 0.5, y: 0.5 },
            style: {
                font: "16px pixel2",
                fill: "#ffffff",
                wordWrap: { width: 880 }
            }
        });
        this.storyText.setScrollFactor(0);
        this.storyText.setDepth(10000001);
        this.storyText.setVisible(false);

        this.option1Btn = this.scene.add.image(640, 635, "img-ui-dialogue-option-btn", 0);
        this.option1Btn.setScrollFactor(0);
        this.option1Btn.setOrigin(0.5, 0.5);
        this.option1Btn.setDepth(10000002);
        this.option1Btn.setInteractive({ cursor: "pointer" });
        this.option1Btn.setVisible(false);

        this.option1Text = this.scene.add.text(640, 635, "...", { fontFamily: "pixel1", fontSize: 13, color: "#f1f1f1", align: "center" });
        this.option1Text.setScrollFactor(0);
        this.option1Text.setOrigin(0.5);
        this.option1Text.setVisible(false);
        this.option1Text.setDepth(10000003);

        this.option2Btn = this.scene.add.image(640, 600, "img-ui-dialogue-option-btn", 0);
        this.option2Btn.setScrollFactor(0);
        this.option2Btn.setOrigin(0.5, 0.5);
        this.option2Btn.setDepth(10000004);
        this.option2Btn.setInteractive({ cursor: "pointer" });
        this.option2Btn.setVisible(false);

        this.option2Text = this.scene.add.text(640, 600, "...", { fontFamily: "pixel1", fontSize: 13, color: "#f1f1f1", align: "center" });
        this.option2Text.setScrollFactor(0);
        this.option2Text.setOrigin(0.5);
        this.option2Text.setVisible(false);
        this.option2Text.setDepth(10000005);

        this.option3Btn = this.scene.add.image(640, 560, "img-ui-dialogue-option-btn", 0);
        this.option3Btn.setScrollFactor(0);
        this.option3Btn.setOrigin(0.5, 0.5);
        this.option3Btn.setDepth(10000006);
        this.option3Btn.setInteractive({ cursor: "pointer" });
        this.option3Btn.setVisible(false);

        this.option3Text = this.scene.add.text(640, 560, "...", { fontFamily: "pixel1", fontSize: 13, color: "#f1f1f1", align: "center" });
        this.option3Text.setScrollFactor(0);
        this.option3Text.setOrigin(0.5);
        this.option3Text.setVisible(false);
        this.option3Text.setDepth(10000007);

        this.dialogueBg.on("pointerdown", function() {

            if (this.canMoveOn) {
                this.nextStoryPart();
            }

        }, this);



        this.option1Btn.on("pointerover", function() {

            this.option1Btn.setFrame(1);

            this.scene.sound.play("audio-btn-hover2", {
                source: {
                    x: 0,
                    y: 0,
                    refDistance: 1000000
                }
            });

        }, this);

        this.option1Btn.on("pointerout", function() {

            this.option1Btn.setFrame(0);

        }, this);

        this.option1Btn.on("pointerdown", function() {
            this.option1Btn.setFrame(2);

            this.scene.sound.play("audio-btn-press2", {
                source: {
                    x: 0,
                    y: 0,
                    refDistance: 1000000
                }
            });
        }, this);

        this.option1Btn.on("pointerup", function() {

            if (this.currentDialogue.currentPartData.options[0].callback != null) {
                this.currentDialogue.currentPartData.options[0].callback();
            }
            this.hideOptions();
            this.nextStoryPart();

        }, this);



        this.option2Btn.on("pointerover", function() {

            this.option2Btn.setFrame(1);

            this.scene.sound.play("audio-btn-hover2", {
                source: {
                    x: 0,
                    y: 0,
                    refDistance: 1000000
                }
            });

        }, this);

        this.option2Btn.on("pointerout", function() {

            this.option2Btn.setFrame(0);

        }, this);

        this.option2Btn.on("pointerdown", function() {
            this.option2Btn.setFrame(2);

            this.scene.sound.play("audio-btn-press2", {
                source: {
                    x: 0,
                    y: 0,
                    refDistance: 1000000
                }
            });
        }, this);

        this.option2Btn.on("pointerup", function() {

            if (this.currentDialogue.currentPartData.options[1].callback != null) {
                this.currentDialogue.currentPartData.options[1].callback();
            }
            this.hideOptions();
            this.nextStoryPart();

        }, this);



        this.option3Btn.on("pointerover", function() {

            this.option3Btn.setFrame(1);

            this.scene.sound.play("audio-btn-hover2", {
                source: {
                    x: 0,
                    y: 0,
                    refDistance: 1000000
                }
            });

        }, this);

        this.option3Btn.on("pointerout", function() {

            this.option3Btn.setFrame(0);

        }, this);

        this.option3Btn.on("pointerdown", function() {
            this.option3Btn.setFrame(2);

            this.scene.sound.play("audio-btn-press2", {
                source: {
                    x: 0,
                    y: 0,
                    refDistance: 1000000
                }
            });
        }, this);

        this.option3Btn.on("pointerup", function() {

            if (this.currentDialogue.currentPartData.options[2].callback != null) {
                this.currentDialogue.currentPartData.options[2].callback();
            }
            this.hideOptions();
            this.nextStoryPart();

        }, this);

    }

    start(dialogue) {
        if (this.currentDialogue != null) {
            return;
        }

        dialogue.start();

        this.currentDialogue = dialogue;

        if (this.currentDialogue.dialogueParts[0] != null) {
            this.currentDialogue.currentPart = 0;
            this.currentDialogue.currentPartData = this.currentDialogue.dialogueParts[this.currentDialogue.currentPart].getData();

            this.setupUI();
            this.writeText();
        }
    }

    endDialogue() {
        if (this.currentDialogue == null) {
            return;
        }

        if (this.scene.gameScene != null) {
            if (this.scene.gameScene.player != null) {
                this.scene.gameScene.player.setTalking(false);
            }
        }

        this.isTextWriting = false;
        this.canMoveOn = false;
        this.currentDialogue.currentPart = -1;

        this.dialogueBg.setVisible(false);
        this.storyText.setVisible(false);

        this.currentDialogue.hasBeenCompleted = true;
        this.currentDialogue.stop();
        this.currentDialogue.onComplete();

        this.scene.gameScene.conversations.stop();

        this.currentDialogue = null;

    }

    nextStoryPart() {

        if (this.currentDialogue.currentPart >= this.currentDialogue.dialogueParts.length - 1) {
            this.endDialogue();
            return;
        }

        this.dialogueBg.setInteractive({ cursor: "default" });
        this.canMoveOn = false;

        this.currentDialogue.currentPart += 1;
        this.currentDialogue.currentPartData = this.currentDialogue.dialogueParts[this.currentDialogue.currentPart].getData();

        this.setupUI();
        this.writeText();

    }

    setupUI() {

        if (this.currentDialogue.currentPartData == null) {
            return;
        }

        if (this.currentDialogue.currentPartData.type == 1) {
            this.dialogueBg.setFrame(1);
        }else if (this.currentDialogue.currentPartData.type == 2) {
            this.dialogueBg.setFrame(3);
        }
        this.storyText.setPosition(640, 600);

        this.dialogueBg.setVisible(true);
        this.storyText.setVisible(true);

    }

    onTextWritingComplete() {
        this.isTextWriting = false;

        if (this.currentDialogue.currentPartData.options == null) {

            this.dialogueBg.setInteractive({ cursor: "pointer" });
            this.canMoveOn = true;

        }else {

            this.canMoveOn = false;
            this.showOptions();

        }
    }

    showOptions() {

        this.storyText.setPosition(640, 520);
        if (this.currentDialogue.currentPartData.type == 1) {
            this.dialogueBg.setFrame(0);
        }else if (this.currentDialogue.currentPartData.type == 2) {
            this.dialogueBg.setFrame(2);
        }

        if (this.currentDialogue.currentPartData.options.length == 1) {
            this.option1Btn.setVisible(true);
            this.option1Text.setVisible(true);
            this.option1Text.text = this.currentDialogue.currentPartData.options[0].text;
        }else if (this.currentDialogue.currentPartData.options.length == 2) {
            this.option1Btn.setVisible(true);
            this.option1Text.setVisible(true);
            this.option1Text.text = this.currentDialogue.currentPartData.options[0].text;

            this.option2Btn.setVisible(true);
            this.option2Text.setVisible(true);
            this.option2Text.text = this.currentDialogue.currentPartData.options[1].text;
        }else if (this.currentDialogue.currentPartData.options.length >= 3) {
            this.option1Btn.setVisible(true);
            this.option1Text.setVisible(true);
            this.option1Text.text = this.currentDialogue.currentPartData.options[0].text;

            this.option2Btn.setVisible(true);
            this.option2Text.setVisible(true);
            this.option2Text.text = this.currentDialogue.currentPartData.options[1].text;

            this.option3Btn.setVisible(true);
            this.option3Text.setVisible(true);
            this.option3Text.text = this.currentDialogue.currentPartData.options[2].text;
        }

    }

    hideOptions() {
        this.option1Btn.setVisible(false);
        this.option1Text.setVisible(false);

        this.option2Btn.setVisible(false);
        this.option2Text.setVisible(false);

        this.option3Btn.setVisible(false);
        this.option3Text.setVisible(false);
    }

    writeText() {
        if (this.isTextWriting) {
            return;
        }

        this.isTextWriting = true;

        const ref = this.currentDialogue.currentPartData.text;
        let str = "";
        let currIndex = 0;

        const textWritingSound = this.scene.sound.add("audio-text-writing");
        textWritingSound.play({
            loop: true,
            volume: 0.3,
            source: {
                x: 0,
                y: 0,
                refDistance: 100000
            }
        });

        const timeEvent = this.scene.time.addEvent({
            delay: 50,
            callback: function() {
                str += ref.charAt(currIndex);

                currIndex += 1;

                this.storyText.text = str;

                if (str === ref) {
                    timeEvent.destroy();
                    textWritingSound.stop();

                    this.onTextWritingComplete();
                }
            },
            callbackScope: this,
            loop: true
        });
    }


    /*
     * Getters & Setters
     */
    getTextWriting() {
        return this.isTextWriting;
    }

    getCanMoveOn() {
        return this.canMoveOn;
    }

    getCurrentPart() {
        return this.currentPart;
    }

    getCurrentPartData() {
        return this.currentPartData;
    }

    getActive() {
        return this.isActive;
    }

    getOnComplete() {
        return this.onComplete();
    }

    getHasBeenCompleted() {
        return this.hasBeenCompleted;
    }

}