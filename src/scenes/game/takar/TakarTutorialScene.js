
let controlTutorialComplete = true;
let fadeIn = false;

let loadData = null;
let sceneData = {
    sceneName: "TakarTutorial",
    finishedTutorial: false,
    currentTime: 11,
    player: {
        x: 130,
        y: 50,
        direction: "down",
        isLampOn: false,
        distanceMoved: 0,
        hasSprinted: false,
        handItem: null
    },
    characters: {
        kiro: {
            x: 350,
            y: 145,
            direction: "left",
            canTalk: true,
            currentDialogueIndex: 0,
            currentMovementName: null,
            handItem: "hand-lamp"
        }
    },
    dialogue: {
        current: 0
    }
};

class TakarTutorialScene extends Phaser.Scene {

    constructor() {

        super({ key: "TakarTutorial" });

    }

    init(data) {

        if (data != null) {
            if (data.fadeIn != null) {
                fadeIn = data.fadeIn;
            }

            if (data.loadData != null) {

                for (let i = 0; i < data.loadData.scenes.length; i++) {
                    if (data.loadData.scenes[i].sceneName === sceneData.sceneName) {

                        sceneData = data.loadData.scenes[i];
                        loadData = data.loadData;
                    }
                }

            }
        }

    }

    preload() {

        //Assets
        this.load.setPath("./src/assets/");

        //Images
        this.load.image("img-tileset-tera", "tilesets/tera.png");
        this.load.image("img-ui-black-screen", "images/ui/screens/black-screen.png");
        this.load.image("img-obst-bush1", "images/obst/bush1.png");
        this.load.image("img-obst-doorway1", "images/obst/doorway1.png");

        //Animations
        this.load.animation("anims-player", "anims/char/player.json");
        this.load.animation("anims-kiro", "anims/char/kiro.json");
        this.load.animation("anims-stone-torch", "anims/obst/stone-torch.json");

        //Spritesheets
        this.load.spritesheet("img-char-player", "images/char/player.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("img-char-kiro", "images/char/kiro.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("img-obst-stone-torch", "images/obst/stone-torch.png", { frameWidth: 8, frameHeight: 24 });
        this.load.spritesheet("img-item-hand-lamp", "images/items/hand-lamp.png", { frameWidth: 8, frameHeight: 9 });
        this.load.spritesheet("img-obst-tree1", "images/obst/tree1.png", { frameWidth: 64, frameHeight: 96 });

        //Audio
        this.load.audio("audio-tribal-loop", "sound/music/tribal-loop-azteca-154482.mp3");
        this.load.audio("audio-btn-press2", "sound/effects/btn-press2.wav");
        this.load.audio("audio-btn-hover2", "sound/effects/btn-hover2.wav");
        this.load.audio("audio-fire-crackle", "sound/music/crackling-fireplace-nature-sounds-8012.mp3");
        this.load.audio("audio-item-equip", "sound/effects/item-equip.wav");

        //Scripts

        this.load.script("script-stone-torch", "scripts/obst/StoneTorch.js");
        this.load.script("script-bush1", "scripts/obst/Bush1.js");
        this.load.script("script-doorway1", "scripts/obst/Doorway1.js");
        this.load.script("script-tree1", "scripts/obst/Tree1.js");
        this.load.script("script-item-hand-lamp", "scripts/inventory/items/HandLamp.js");
        this.load.script("script-player", "scripts/char/player.js");
        this.load.script("script-kiro", "scripts/char/kiro.js");

        //Tilemaps
        this.load.tilemapTiledJSON("map-tutorial", "maps/world/takar/tutorial.json");

    }

    create() {

        /*
         * REQUIRED
         */
        const scene = this;








        //Do this first so other objects can use it
        this.scene.sendToBack();
        this.uiScene = this.scene.get("UI");
        this.uiScene.switchTo("TakarTutorial");







        /*
         * NOT REQUIRED
         */
        this.input.setDefaultCursor("default");

        this.cameras.main.setZoom(3);

        //Controls
        this.gameControls = new GameControls(scene, this);
        this.gameControls.hasSprintEverBeenPressed = sceneData.player.hasSprinted;

        //Conversations
        this.conversations = new ConversationManager(this);

        //Lights
        this.lights.enable();
        //this.lights.setAmbientColor(0x000000);
        this.lights.setAmbientColor(0x222222);
        //this.lights.setAmbientColor(0xA2936F);

        this.bgMusic = this.sound.add("audio-tribal-loop");
        this.bgMusic.play({
            loop: true,
            volume: 0.05,
            source: {
                x: 0,
                y: 0,
                refDistance: 1000000
            }
        });








        /*
         * Tilemap
         */
        this.worldMap = this.make.tilemap({ key: "map-tutorial" });

        this.tileset = this.worldMap.addTilesetImage("tera", "img-tileset-tera");

        this.layers = [];
        this.layers[0] = this.worldMap.createLayer("ground", this.tileset);
        this.layers[1] = this.worldMap.createLayer("ground-top", this.tileset);

        //this.layers[1].setCollision([ 20, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 37, 38, 39, 40, 41, 42 ]);

        //Set pipeline
        for (let i = 0; i < this.layers.length; i++) {
            this.layers[i].setPipeline("Light2D");
        }

        this.cameras.main.setBounds(0, 0, this.worldMap.widthInPixels, this.worldMap.heightInPixels);
        this.physics.world.setBounds(0, 0, this.worldMap.widthInPixels, this.worldMap.heightInPixels);








        /*
         * Characters
         */
        //Player
        this.player = new Player(this, sceneData.player.x, sceneData.player.y);
        this.player.setDirection(sceneData.player.direction);
        this.player.setLampOn(sceneData.player.isLampOn);
        this.player.setDistanceMoved(sceneData.player.distanceMoved);
        this.conversations.setPlayer(this.player);
        this.gameControls.setControlledSprite(this.player);

        //NPC
        this.kiro = new Kiro(this, sceneData.characters.kiro.x, sceneData.characters.kiro.y);
        this.kiro.setCurrentDialogueIndex(sceneData.characters.kiro.currentDialogueIndex);
        this.kiro.startMovement(sceneData.characters.kiro.currentMovementName);
        this.kiro.setHandItem("hand-lamp");
        this.kiro.setDirection(sceneData.characters.kiro.direction, true);
        this.conversations.registerNpc(this.kiro);









        /*
         * Obstacles
         */
        this.obstacles = [
            new StoneTorch(this, 125, 35),
            new StoneTorch(this, 350, 125),
            new StoneTorch(this, 350, 175),
            new Bush1(this, 90, 60),
            new Bush1(this, 160, 60),
            new Bush1(this, 320, 90),
            new Bush1(this, 460, 205),
        ];

        this.doorway1 = new Doorway1(this, 950, 190, "TakarTutorial", {  });










        /*
         * Physics
         */
        //Tilemap
        //this.physics.add.collider(this.player, this.layers[1]);

        //Characters
        this.physics.add.collider(this.player, this.kiro);

        //Obstacles
        for (let i = 0; i < this.obstacles.length; i++) {
            this.physics.add.collider(this.player, this.obstacles[i]);
        }







        /*
         * Day / Night
         */
        //updateDayNight(this);







        /*
         * Dialogue
         */
        this.dialogue1 = new Dialogue(this.uiScene.dialogueManager, [
            new DialoguePart({
                text: "Hey, " + this.player.getFirstName() + " you alright over there?",
                type: 1,
                options: [
                    {
                        text: "I'm alright"
                    },
                    {
                        text: "Yes!"
                    }
                ]
            }),
            new DialoguePart({
                text: "Ok good! It's getting dark out, we should probably head home.",
                type: 1
            }),
            new DialoguePart({
                text: "Here come over to me.",
                type: 1
            }),
            new DialoguePart({
                text: "To take out your lamp press \"E\".",
                type: 2
            })
        ]);
        this.dialogue1.onComplete = function() {
            sceneData.dialogue.current = 1;

            scene.time.addEvent({
                delay: 10000,
                callback: function() {
                    if (scene.player.distanceMoved > 0) {
                        return;
                    }

                    scene.player.setTalking(true);

                    const dialogue = new Dialogue(scene.uiScene.dialogueManager, [
                        new DialoguePart({
                            text: "To move use the \"WASD\" keys.",
                            type: 2
                        })
                    ]);

                    scene.uiScene.dialogueManager.start(dialogue);

                }
            });
        };

        this.dialogue2 = new Dialogue(this.uiScene.dialogueManager, [
            new DialoguePart({
                text: "Let's go already!",
                type: 1
            }),
            new DialoguePart({
                text: "To sprint press the \"SHIFT\" key.",
                type: 2
            })
        ]);
        this.dialogue2.onComplete = function() {
            scene.gameControls.setControlsEnabled(true);

            scene.saveGameBtn.setVisible(true);
        };


        this.kiro.addDialogue(new Dialogue(this.uiScene.dialogueManager, [
            new DialoguePart({
                text: "Finally, you made it.",
                type: 1
            }),
            new DialoguePart({
                text: "We don't want to worry anyone back home, so lets get going!",
                type: 1
            }),
            new DialoguePart({
                text: "Follow " + this.kiro.getFirstName() + " down the path back to the village.",
                type: 2
            })
        ]), function() {
            scene.kiro.setCanTalk(false);
            scene.kiro.nextDialogue();
            scene.kiro.startMovement("kiro-0");
        });



        this.time.addEvent({
            delay: 1000,
            callback: function() {

                if (sceneData.dialogue.current == 0) {
                    this.uiScene.dialogueManager.start(this.dialogue1);
                    scene.player.setTalking(true);
                }

            },
            callbackScope: this,
            loop: false
        });
        this.uiScene.saveGameBtn.setVisible(false);








        /*
         * Fade in (called when the game is run chronologically)
         */
        if (fadeIn) {
            this.fadeScreen = this.add.image(640, 360, "img-ui-black-screen");
            this.fadeScreen.setScrollFactor(0);
            this.fadeScreen.setOrigin(0.5, 0.5);
            this.fadeScreen.setAlpha(1);
            this.fadeScreen.setDepth(10000000);

            this.tweens.add({
                targets: this.fadeScreen,
                alpha: 0,
                delay: 500,
                duration: 1000,
                ease: "Power1"
            });
        }

    }

    saveGame() {
        sceneData.player.x = this.player.x;
        sceneData.player.y = this.player.y;
        sceneData.player.direction = this.player.direction;
        sceneData.player.isLampOn = this.player.getLampOn();
        sceneData.player.distanceMoved = this.player.getDistanceMoved();
        sceneData.player.hasSprinted = this.gameControls.hasSprintEverBeenPressed;

        sceneData.characters.kiro.x = this.kiro.x;
        sceneData.characters.kiro.y = this.kiro.y;
        sceneData.characters.kiro.direction = this.kiro.getDirection();
        sceneData.characters.kiro.currentDialogueIndex = this.kiro.getCurrentDialogueIndex();
        sceneData.characters.kiro.canTalk = this.kiro.getCanTalk();
        if (this.kiro.getCurrentMovement() == null) {
            sceneData.characters.kiro.currentMovementName = null;
        }else {
            sceneData.characters.kiro.currentMovementName = this.kiro.getCurrentMovement().getName();
        }

        if (loadData == null) {
            loadData = {
                currentScene: "TakarTutorial",
                scenes: [sceneData]
            };

            saveGame(loadData);
        }else {
            for (let i = 0; i < loadData.scenes.length; i++) {
                if (loadData.scenes[i].sceneName === sceneData.sceneName) {
                    loadData.scenes[i] = sceneData;

                    saveGame(loadData);
                }
            }
        }
    }

    update() {

        this.conversations.update();

        if (!this.dialogue2.hasBeenCompleted) {
            if (this.player.distanceMoved >= 350) {
                if (!this.gameControls.getHasSprintEverBeenPressed()) {
                    this.uiScene.dialogueManager.start(this.dialogue2);
                }
            }
        }

        if (this.player.getTalking()) {
            this.uiScene.saveGameBtn.setVisible(false);
            this.gameControls.setControlsEnabled(false);
        }else {
            this.uiScene.saveGameBtn.setVisible(true);
            this.gameControls.setControlsEnabled(true);
        }

    }

}

function updateDayNight(scene) {

    roomData.time += 1;
    if (roomData.time > 23) {
        roomData.time = 1;
    }

    if (roomData.time == 1) {
        scene.lights.setAmbientColor(0x111111);
    }else if (roomData.time == 2) {
        scene.lights.setAmbientColor(0x222222);
    }else if (roomData.time == 3) {
        scene.lights.setAmbientColor(0x333333);
    }else if (roomData.time == 4) {
        scene.lights.setAmbientColor(0x444444);
    }else if (roomData.time == 5) {
        scene.lights.setAmbientColor(0x555555);
    }else if (roomData.time == 6) {
        scene.lights.setAmbientColor(0x666666);
    }else if (roomData.time == 7) {
        scene.lights.setAmbientColor(0x777777);
    }else if (roomData.time == 8) {
        scene.lights.setAmbientColor(0x888888);
    }else if (roomData.time == 9) {
        scene.lights.setAmbientColor(0x999999);
    }else if (roomData.time == 10) {
        scene.lights.setAmbientColor(0xf1f1f1);
    }else if (roomData.time == 11) {
        scene.lights.setAmbientColor(0xf2f2f2);
    }else if (roomData.time == 12) {
        scene.lights.setAmbientColor(0xf3f3f3);
    }else if (roomData.time == 13) {
        scene.lights.setAmbientColor(0xf2f2f2);
    }else if (roomData.time == 14) {
        scene.lights.setAmbientColor(0xf1f1f1);
    }else if (roomData.time == 15) {
        scene.lights.setAmbientColor(0x999999);
    }else if (roomData.time == 16) {
        scene.lights.setAmbientColor(0x888888);
    }else if (roomData.time == 17) {
        scene.lights.setAmbientColor(0x777777);
    }else if (roomData.time == 18) {
        scene.lights.setAmbientColor(0x666666);
    }else if (roomData.time == 19) {
        scene.lights.setAmbientColor(0x555555);
    }else if (roomData.time == 20) {
        scene.lights.setAmbientColor(0x444444);
    }else if (roomData.time == 21) {
        scene.lights.setAmbientColor(0x333333);
    }else if (roomData.time == 22) {
        scene.lights.setAmbientColor(0x222222);
    }else if (roomData.time == 23) {
        scene.lights.setAmbientColor(0x111111);
    }

}
