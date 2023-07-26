
let controlTutorialComplete = true;
let fadeIn = false;

let loadData = null;
let sceneData = {
    sceneName: "TakarTutorial",
    player: {
        x: 385,
        y: 150,
        direction: "down",
        isLampOn: false
    },
    characters: {
        kiro: {
            x: 1060,
            y: 440,
            direction: "left",
            currentDialogueIndex: 0
        }
    },
    dialogue: {
        current: 0
    }
};

let roomData = {
    time: 11
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
        this.load.animation("anims-stone-torch", "anims/obst/stone-torch.json");

        //Spritesheets
        this.load.spritesheet("img-char-player", "images/char/player.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("img-char-kiro", "images/char/kiro.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("img-obst-stone-torch", "images/obst/stone-torch.png", { frameWidth: 8, frameHeight: 24 });
        this.load.spritesheet("img-item-hand-lamp", "images/items/hand-lamp.png", { frameWidth: 8, frameHeight: 9 });
        this.load.spritesheet("img-obst-tree1", "images/obst/tree1.png", { frameWidth: 64, frameHeight: 96 });
        this.load.spritesheet("img-ui-dialogue-bg", "images/ui/screens/dialogue-bg.png", { frameWidth: 900, frameHeight: 200 });
        this.load.spritesheet("img-ui-dialogue-option-btn", "images/ui/buttons/dialogue-option-btn.png", { frameWidth: 900, frameHeight: 30 });
        this.load.spritesheet("img-ui-save-btn", "images/ui/buttons/save-btn.png", { frameWidth: 32, frameHeight: 32 });

        //Audio
        this.load.audio("audio-tribal-loop", "sound/music/tribal-loop-azteca-154482.mp3");
        this.load.audio("audio-btn-press2", "sound/effects/btn-press2.wav");
        this.load.audio("audio-btn-hover2", "sound/effects/btn-hover2.wav");
        this.load.audio("audio-fire-crackle", "sound/music/crackling-fireplace-nature-sounds-8012.mp3");
        this.load.audio("audio-item-equip", "sound/effects/item-equip.wav");

        //Scripts

        this.load.script("script-stone-torch", "scripts/obst/stone-torch.js");
        this.load.script("script-bush1", "scripts/obst/bush1.js");
        this.load.script("script-doorway1", "scripts/obst/doorway1.js");
        this.load.script("script-tree1", "scripts/obst/tree1.js");
        this.load.script("script-item-hand-lamp", "scripts/inventory/items/hand-lamp.js");
        this.load.script("script-player", "scripts/char/player.js");
        this.load.script("script-kiro", "scripts/char/kiro.js");

        //Tilemaps
        this.load.tilemapTiledJSON("map-tutorial", "maps/world/takar/tutorial.json");

    }

    create() {

        const scene = this;

        this.worldScale = 3;

        this.input.setDefaultCursor("default");

        //Controls
        this.gameControls = new GameControls(scene, this);

        //Conversations
        this.conversations = new ConversationManager(this);

        //Lights
        this.lights.enable();
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

        //Set scale & pipeline
        for (let i = 0; i < this.layers.length; i++) {
            this.layers[i].setScale(this.worldScale);
            this.layers[i].setPipeline("Light2D");
        }

        this.cameras.main.setBounds(0, 0, this.worldMap.widthInPixels * this.worldScale, this.worldMap.heightInPixels * this.worldScale);
        this.physics.world.setBounds(0, 0, this.worldMap.widthInPixels * this.worldScale, this.worldMap.heightInPixels * this.worldScale);



        /*
         * Characters
         */
        //Player
        this.player = new Player(this, sceneData.player.x, sceneData.player.y);
        this.player.setDirection(sceneData.player.direction);
        this.player.setLampOn(sceneData.player.isLampOn);
        this.conversations.setPlayer(this.player);
        this.gameControls.setControlledSprite(this.player);

        console.log(sceneData.player);

        //NPC
        this.kiro = new Kiro(this, sceneData.characters.kiro.x, sceneData.characters.kiro.y);
        this.kiro.setCurrentDialogueIndex(sceneData.characters.kiro.currentDialogueIndex);
        this.conversations.registerNpc(this.kiro);





        /*
         * Obstacles
         */
        this.obstacles = [
            new StoneTorch(this, 380, 110),
            new StoneTorch(this, 1060, 380),
            new StoneTorch(this, 1060, 530),
            new Bush1(this, 280, 190),
            new Bush1(this, 490, 190),
            new Bush1(this, 970, 280),
            new Bush1(this, 1380, 620),
        ];

        this.doorway1 = new Doorway1(this, 2860, 572, "TakarTutorial", {});




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
        //Day/Night
        //updateDayNight(this);




        /*
         * Minimap
         */
        //this.minimapCam = this.cameras.add(20, 500, 200, 200);
        //this.minimapCam.startFollow(this.player);
        //this.minimapCam.setZoom(0.1);




        /*
         * Save Game
         */
        this.saveGameBtn = this.add.image(1270, 10, "img-ui-save-btn", 0);
        this.saveGameBtn.setOrigin(1, 0);
        this.saveGameBtn.setInteractive({ cursor: "pointer" });
        this.saveGameBtn.setScrollFactor(0);
        this.saveGameBtn.setAlpha(0.8);

        this.saveGameBtn.on("pointerover", function() {
            this.saveGameBtn.setAlpha(1);
        }, this);

        this.saveGameBtn.on("pointerout", function() {
            this.saveGameBtn.setAlpha(0.8);
        }, this);

        this.saveGameBtn.on("pointerdown", function() {

            this.saveGameBtn.setFrame(1);

            sceneData.player.x = this.player.x;
            sceneData.player.y = this.player.y;
            sceneData.player.direction = this.player.direction;
            sceneData.player.isLampOn = this.player.getLampOn();

            scene.gameControls.setControlsEnabled(false);

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

        }, this);

        this.saveGameBtn.on("pointerup", function() {
            this.saveGameBtn.setVisible(false);

            this.saveGameBtn.setFrame(0);

            const dialogue = new Dialogue(scene, [
                new DialoguePart({
                    text: "Game Saved!",
                    type: 2
                })
            ]);

            const btn = this.saveGameBtn;
            dialogue.onComplete = function() {
                scene.gameControls.setControlsEnabled(true);

                btn.setVisible(true);
            };

            dialogue.start();

        }, this);

        this.saveGameBtn.setVisible(false);




        /*
         * Dialogue
         */
        this.dialogue1 = new Dialogue(this, [
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
            scene.gameControls.setControlsEnabled(true);

            sceneData.dialogue.current = 1;

            scene.saveGameBtn.setVisible(true);

            scene.time.addEvent({
                delay: 10000,
                callback: function() {
                    if (scene.player.distanceMoved > 0) {
                        return;
                    }

                    scene.saveGameBtn.setVisible(false);

                    scene.gameControls.setControlsEnabled(false);

                    const dialogue = new Dialogue(scene, [
                        new DialoguePart({
                            text: "To move use the \"WASD\" keys.",
                            type: 2
                        })
                    ]);

                    dialogue.onComplete = function() {
                        scene.gameControls.setControlsEnabled(true);

                        scene.saveGameBtn.setVisible(true);
                    };

                    dialogue.start();

                }
            });
        };

        this.dialogue2 = new Dialogue(this, [
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


        this.kiro.addDialogue(new Dialogue(this, [
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
            scene.gameControls.setControlsEnabled(true);
            scene.player.setTalking(false);
        });



        this.time.addEvent({
            delay: 1000,
            callback: function() {

                if (sceneData.dialogue.current == 0) {
                    this.dialogue1.start();
                }else {
                    scene.gameControls.setControlsEnabled(true);
                }

            },
            callbackScope: this,
            loop: false
        });





        /*
         * Fade in (called when the game is run chronologically)
         */
        if (fadeIn) {
            this.fadeScreen = this.add.image(640, 360, "img-ui-black-screen");
            this.fadeScreen.setScrollFactor(0);
            this.fadeScreen.setOrigin(0.5, 0.5);
            this.fadeScreen.setScale(this.worldScale);
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

    update() {

        if (!this.dialogue2.hasBeenCompleted) {
            if (this.player.distanceMoved >= 350) {
                if (!this.gameControls.getHasSprintEverBeenPressed()) {
                    this.gameControls.setControlsEnabled(false);
                    scene.saveGameBtn.setVisible(false);
                    this.dialogue2.start();
                }
            }
        }

        this.conversations.update();

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
