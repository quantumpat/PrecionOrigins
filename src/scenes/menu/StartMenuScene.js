
let startAnims = true;
let dir = 0;
let hoverText = null;
let userHasClicked = false;

let loadInfoLabel = null;
let loadData = null;

class StartMenuScene extends Phaser.Scene {

    constructor() {

        super({ key: "StartMenu" });

    }

    init(data) {

        if (data != null) {
            if (data.startAnims != null) {
                if (data.startAnims == false) {
                    startAnims = false;
                    userHasClicked = true;
                }
            }
        }

    }

    preload() {

        //Webfont (root script)
        this.load.script("script-webfont", "./src/lib/webfont.js");

        //Assets
        this.load.setPath("./src/assets/");

        //Images
        this.load.image("img-ui-bottom-bar", "images/ui/screens/bottom-bar.png");
        this.load.image("img-ui-black-screen", "images/ui/screens/black-screen.png");
        this.load.image("img-ui-behind-pl-screen", "images/ui/screens/behind-pl-screen.png");
        this.load.image("img-tileset-start-menu", "tilesets/start-menu.png");

        //Spritesheets
        this.load.spritesheet("img-ui-play-btn", "images/ui/buttons/play-btn.png", { frameWidth: 128, frameHeight: 64 });
        this.load.spritesheet("img-ui-load-btn", "images/ui/buttons/load-btn.png", { frameWidth: 128, frameHeight: 64 });

        //Tilemaps
        this.load.tilemapTiledJSON("map-start-menu", "maps/menu/start-menu.json");

        //Audio
        this.load.audio("audio-text-writing", "sound/effects/text-writing.wav");
        this.load.audio("audio-btn-press1", "sound/effects/btn-press1.ogg");
        this.load.audio("audio-btn-hover1", "sound/effects/btn-hover1.ogg");
        this.load.audio("audio-intro-main", "sound/music/dawn-ilya-kuznetsov.mp3");

        //Scripts
        this.load.script("script-dialogue-manager", "scripts/story/DialogueManager.js");
        this.load.script("script-movement", "scripts/char/Movement.js");
        this.load.script("script-npc", "scripts/char/NPC.js");
        this.load.script("script-dialogue", "scripts/story/Dialogue.js");
        this.load.script("script-dialogue-part", "scripts/story/DialoguePart.js");
        this.load.script("script-conversation-manager", "scripts/story/ConversationManager.js");
        this.load.script("script-game-controls", "scripts/util/GameControls.js");
        this.load.script("script-item", "scripts/inventory/Item.js");

        //Scenes
        this.load.setPath("./src/scenes/");
        this.load.sceneFile("PreludeScene", "game/cutscenes/PreludeScene.js");
        this.load.sceneFile("TakarTutorialScene", "game/takar/TakarTutorialScene.js");
        this.load.sceneFile("UIScene", "menu/UIScene.js");

    }

    create() {

        //this.scene.start("TakarTutorial");

        loadGame(function(data) {
            loadData = data;
        });

        this.input.setDefaultCursor("pointer");

        this.commandLabel = this.add.text(640, 360, "CLICK ANYWHERE TO BEGIN", { fontFamily: "Arial", fontWeight: "bold", fontSize: 16, color: "#ffffff", align: "center" });
        this.commandLabel.setOrigin(0.5, 0.5);

        if (userHasClicked) {
            this.commandLabel.setVisible(false);
            createAfterClick(this);
        }

        this.input.on("pointerdown", function() {

            if (!userHasClicked) {
                this.commandLabel.setVisible(false);
                userHasClicked = true;

                this.input.setDefaultCursor("default");

                let mainSound = this.sound.add("audio-intro-main");
                mainSound.setLoop(true);
                mainSound.setVolume(0.2);
                mainSound.play();

                createAfterClick(this);
            }

        }, this);

    }

    update() {

    }
}

function createAfterClick(scene) {

    const scale = 2;

    const backgroundMap = scene.make.tilemap({ key: "map-start-menu" });
    const tiles = backgroundMap.addTilesetImage("start-menu", "img-tileset-start-menu");

    const layer1 = backgroundMap.createLayer("art", [ tiles ]);
    layer1.setScale(scale);

    scene.cameras.main.setBounds(0, 0, backgroundMap.widthInPixels * scale, backgroundMap.heightInPixels * scale);
    scene.physics.world.setBounds(0, 0, backgroundMap.widthInPixels * scale, backgroundMap.heightInPixels * scale);

    const blackScreen = scene.add.image(640, 360, "img-ui-black-screen");
    blackScreen.setOrigin(0.5, 0.5);
    blackScreen.setScrollFactor(0);

    if (!startAnims) {
        blackScreen.setVisible(false);
    }

    const fS = scene.physics.add.sprite(0, 520, "img-ui-black-screen");
    fS.setScale(0.1, 0.1);
    fS.setVisible(false);
    fS.setCollideWorldBounds(true);

    const timedEvent = scene.time.addEvent({
        delay: 40,
        callback: function() {
            if (dir == 0) {
                fS.y += 1;
            }else if (dir == 1) {
                fS.y -= 1;
            }

            if (fS.y >= 2600) {
                dir = 3;

                scene.time.addEvent({
                    delay: 1500,
                    callback: function() {
                        dir = 1;
                    },
                    callbackScope: this,
                    loop: false
                });
            }else if (fS.y <= 500) {
                dir = 3;

                scene.time.addEvent({
                    delay: 1500,
                    callback: function() {
                        dir = 0;
                    },
                    callbackScope: this,
                    loop: false
                });
            }
        },
        callbackScope: this,
        loop: true
    });

    scene.cameras.main.startFollow(fS);

    let bottomBar = null;
    let authorLabel = null;
    let introHeader = null;
    let introSubheader = null;
    let playBtn = null;
    let loadBtn = null;
    let behindPL = null;

    WebFont.load({
        custom: {
            families: [ "pixel1", "pixel2", "pixel3" ]
        },
        active: function() {

            bottomBar = scene.add.image(0, 720, "img-ui-bottom-bar");
            bottomBar.setOrigin(0, 1);
            bottomBar.setScrollFactor(0);
            bottomBar.setAlpha(0);

            loadInfoLabel = scene.add.text(640, 706, "\"No load data found\"", { fontFamily: "pixel1", fontSize: 16, color: "#da3737", align: "center" });
            loadInfoLabel.setOrigin(0.5, 1);
            loadInfoLabel.setScrollFactor(0);
            loadInfoLabel.setVisible(false);

            //#87d6ac
            introHeader = scene.add.text(640, 300, 'Precion Origins', { fontFamily: "pixel1", fontSize: 84, color: "#ffffff", align: "center" }).setAlpha(0);
            introHeader.setShadow(0, 6, '#333333', 0, false, true);
            introHeader.setOrigin(0.5, 0.5);
            introHeader.setScrollFactor(0);

            introSubheader = scene.add.text(640, 400, "A Space Odyssey", { fontFamily: "pixel1", fontSize: 32, color: "#ffffff", align: "center"}).setAlpha(0);
            introSubheader.setShadow(0, 3, "#333333", 0, false, true);
            introSubheader.setOrigin(0.5, 0.5);
            introSubheader.setScrollFactor(0);

            authorLabel = scene.add.text(10, 706, "Created by Patrick Carroll", { fontFamily: "pixel1", fontSize: 16, color: "#ffffff", align: "left" });
            authorLabel.setScrollFactor(0);
            authorLabel.setOrigin(0, 1);
            authorLabel.setAlpha(0);

            behindPL = scene.add.image(640, 500, "img-ui-behind-pl-screen");
            behindPL.setAlpha(0)
            behindPL.setScrollFactor(0);

            playBtn = scene.add.sprite(640, 460, "img-ui-play-btn", 0);
            playBtn.setScrollFactor(0);
            playBtn.setAlpha(0);

            loadBtn = scene.add.sprite(640, 540, "img-ui-load-btn", 0);
            loadBtn.setScrollFactor(0);
            loadBtn.setAlpha(0);

            //640, 607
            hoverText = scene.add.text(1270, 706, "", { fontFamily: "pixel1", fontSize: 16, color: "#f0f0f0", align: "right" });
            hoverText.setScrollFactor(0);
            hoverText.setOrigin(1, 1);
            hoverText.setVisible(false);

            //Only if start animations are enabled
            if (startAnims) {
                const tween1 = scene.tweens.add({
                    targets: bottomBar,
                    alpha: 0.8,
                    duration: 1000,
                    delay: 500
                });

                const tween2 = scene.tweens.add({
                    targets: introHeader,
                    alpha: 1,
                    duration: 2000,
                    ease: "Power1"
                });

                const tween3 = scene.tweens.add({
                    targets: introSubheader,
                    alpha: 1,
                    duration: 1000,
                    delay: 1000
                });

                const tween4 = scene.tweens.add({
                    targets: authorLabel,
                    alpha: 1,
                    duration: 1000,
                    delay: 1000
                });

                const tween5 = scene.tweens.add({
                    targets: blackScreen,
                    alpha: 0,
                    duration: 1000,
                    delay: 1000
                });

                const tween6 = scene.tweens.add({
                    targets: behindPL,
                    alpha: 1,
                    duration: 1000,
                    delay: 3000
                });

                const tween7 = scene.tweens.add({
                    targets: playBtn,
                    alpha: 1,
                    duration: 1000,
                    delay: 3000,
                    onComplete: function() {
                        setPlayBtnInteractive(scene, playBtn);
                    }
                });

                const tween8 = scene.tweens.add({
                    targets: loadBtn,
                    alpha: 1,
                    duration: 1000,
                    delay: 3000,
                    onComplete: function() {
                        setLoadBtnInteractive(scene, loadBtn);
                    }
                });

                const tween2a = scene.tweens.add({
                    targets: introHeader,
                    y: 200,
                    ease: "Power1",
                    duration: 500,
                    delay: 2500
                });

                const tween3a = scene.tweens.add({
                    targets: introSubheader,
                    y: 300,
                    ease: "Power1",
                    duration: 500,
                    delay: 2500
                });
            }

            if (!startAnims) {
                bottomBar.setAlpha(0.8);
                introHeader.setAlpha(1);
                introSubheader.setAlpha(1);
                authorLabel.setAlpha(1);
                behindPL.setAlpha(1);
                playBtn.setAlpha(1);
                loadBtn.setAlpha(1);

                introHeader.setY(200);
                introSubheader.setY(300);

                setPlayBtnInteractive(scene, playBtn);
                setLoadBtnInteractive(scene, loadBtn);
            }

        }
    });

}

function setPlayBtnInteractive(scene, playBtn) {

    playBtn.setInteractive({ cursor: "pointer" });

    playBtn.on("pointerover", function(pointer) {

        if (hoverText != null) {
            hoverText.setText("Play");
            hoverText.setVisible(true);
        }

        scene.sound.play("audio-btn-hover1");

    });

    playBtn.on("pointerout", function(pointer) {

        if (hoverText != null) {
            hoverText.setText("");
            hoverText.setVisible(false);
        }

    });

    playBtn.on("pointerdown", function(pointer) {
        playBtn.setFrame(1);
        scene.sound.play("audio-btn-press1");
    });

    playBtn.on("pointerup", function(pointer) {
        playBtn.setFrame(0);

        const sceneFade = scene.add.image(640, 360, "img-ui-black-screen");
        sceneFade.setAlpha(0);
        sceneFade.setOrigin(0.5, 0.5);
        sceneFade.setScrollFactor(0);

        const tween1 = scene.tweens.add({
            targets: sceneFade,
            alpha: 1,
            duration: 800,
            delay: 0,
            onComplete: function() {
                scene.sound.stopAll();
                scene.scene.start("Prelude", {});
            }
        });
    });

}

function setLoadBtnInteractive(scene, loadBtn) {

    loadBtn.setInteractive({ cursor: "pointer" });

    loadBtn.on("pointerover", function(pointer) {

        if (hoverText != null) {
            hoverText.setText("Load");
            hoverText.setVisible(true);
        }

        scene.sound.play("audio-btn-hover1");

    });

    loadBtn.on("pointerout", function(pointer) {

        if (hoverText != null) {
            hoverText.setText("");
            hoverText.setVisible(false);
        }

    });

    loadBtn.on("pointerdown", function(pointer) {
        loadBtn.setFrame(1);
        scene.sound.play("audio-btn-press1");
    });

    loadBtn.on("pointerup", function(pointer) {
        loadBtn.setFrame(0);

        const sceneFade = scene.add.image(640, 360, "img-ui-black-screen");
        sceneFade.setAlpha(0);
        sceneFade.setOrigin(0.5, 0.5);
        sceneFade.setScrollFactor(0);

        if (loadData == null) {
            if (loadInfoLabel != null) {

                loadInfoLabel.setVisible(true);

                scene.tweens.add({
                    targets: loadInfoLabel,
                    alpha: 0,
                    yoyo: true,
                    ease: "bounce.inout",
                    duration: 500
                });

            }
        }else {

            for (let i = 0; i < loadData.scenes.length; i++) {

                if (loadData.scenes[i].sceneName === loadData.currentScene) {

                    scene.scene.start(loadData.currentScene, { loadData: loadData });

                    return;

                }

            }

        }

    });

}
