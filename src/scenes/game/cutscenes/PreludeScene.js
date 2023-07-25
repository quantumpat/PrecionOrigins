
let hoverText = null;
let storyPhase = 0;
let canSwitchStoryPhase = false;
let fastForwardText = false;

class PreludeScene extends Phaser.Scene {

    constructor() {
        super({ key: "Prelude" });
    }

    init(data) {

    }

    preload() {

        //Assets
        this.load.setPath("./src/assets/");

        //Images
        this.load.image("img-ui-black-screen", "images/ui/screens/black-screen.png");
        this.load.image("img-ui-space-screen", "images/ui/screens/space-screen.png");
        this.load.image("img-ui-large-bottom-bar", "images/ui/screens/large-bottom-bar.png");
        this.load.image("img-planet-solaris-star", "images/planets/solaris-star.png");
        this.load.image("img-planet-utumu", "images/planets/utumu-planet.png");
        this.load.image("img-planet-takar", "images/planets/takar-planet.png");
        this.load.image("img-planet-polaria", "images/planets/polaria-planet.png");
        this.load.image("img-planet-oblivio", "images/planets/oblivio-planet.png");

        //Spritesheets
        this.load.spritesheet("img-ui-skip-btn", "images/ui/buttons/skip-btn.png", { frameWidth: 32, frameHeight: 32 });

        //Audio
        this.load.audio("audio-btn-press2", "sound/effects/btn-press2.wav");
        this.load.audio("audio-prelude-main", "sound/music/x-cell-capturez.mp3");
        this.load.audio("audio-text-writing", "sound/effects/text-writing.wav");

        //Scenes
        this.load.setPath("./src/scenes/");
        this.load.sceneFile("Chapter1Scene", "game/cutscenes/chapters/Chapter1Scene.js");

    }

    create() {

        const game = this;

        this.backgroundMusic = this.sound.add("audio-prelude-main");
        this.backgroundMusic.setVolume(0.05);
        this.backgroundMusic.setLoop(false);
        this.backgroundMusic.play();

        this.spaceBackground = this.add.image(640, 320, "img-ui-space-screen");
        this.spaceBackground.setOrigin(0.5, 0.5);
        this.spaceBackground.setScrollFactor(0);

        this.solaris = this.add.image(640, 320, "img-planet-solaris-star");
        this.solaris.setOrigin(0.5, 0.5);
        this.solaris.setScrollFactor(0);
        this.solaris.setAlpha(0);

        this.utumu = this.add.image(640, 320, "img-planet-utumu");
        this.utumu.setOrigin(0.5, 0.5);
        this.utumu.setScrollFactor(0);
        this.utumu.setAlpha(0);

        this.takar = this.add.image(640, 320, "img-planet-takar");
        this.takar.setOrigin(0.5, 0.5);
        this.takar.setScrollFactor(0);
        this.takar.setAlpha(0);

        this.polaria = this.add.image(640, 320, "img-planet-polaria");
        this.polaria.setOrigin(0.5, 0.5);
        this.polaria.setScrollFactor(0);
        this.polaria.setAlpha(0);

        this.oblivio = this.add.image(640, 320, "img-planet-oblivio");
        this.oblivio.setOrigin(0.5, 0.5);
        this.oblivio.setScrollFactor(0);
        this.oblivio.setAlpha(0);

        //Over planets
        this.bottomBar = this.add.image(640, 720, "img-ui-large-bottom-bar");
        this.bottomBar.setOrigin(0.5, 1);
        this.bottomBar.setScrollFactor(0);

        this.storyText = this.make.text({
            x: 640,
            y: 660,
            text: "",
            origin: { x: 0.5, y: 0.5 },
            style: {
                font: "13px pixel3",
                fill: "#ffffff",
                wordWrap: { width: 1000 }
            }
        });

        this.time.delayedCall(1000, function() {
            storyAnimations(game, storyPhase);
        }, [], this);

        this.clickLabel = this.add.text(640, 20, "(Click to continue)", { fontFamily: "pixel2", fontSize: 14, color: "#ffffff", align: "center" });
        this.clickLabel.setOrigin(0.5, 0);
        this.clickLabel.setScrollFactor(0);
        this.clickLabel.setVisible(false);

        const tween1 = this.tweens.add({
            targets: this.clickLabel,
            alpha: 0,
            ease: "Power1",
            yoyo: true,
            onComplete: function() {
                tween1.play()
            },
            duration: 1000,
            delay: 500
        });

        this.skipBtn = this.add.sprite(1260, 700, "img-ui-skip-btn", 0);
        this.skipBtn.setOrigin(1, 1);
        this.skipBtn.setInteractive({ cursor: "pointer" });
        this.skipBtn.setScrollFactor(0);

        this.skipBtn.on("pointerover", function(pointer) {

            if (hoverText != null) {
                hoverText.setText("Skip");
                hoverText.setVisible(true);
            }

        }, this);
        this.skipBtn.on("pointerout", function(pointer) {

            if (hoverText != null) {
                hoverText.setText("");
                hoverText.setVisible(false);
            }

        }, this);
        this.skipBtn.on("pointerdown", function(pointer) {

            this.skipBtn.setFrame(1);
            this.sound.play("audio-btn-press2");

        }, this);
        this.skipBtn.on("pointerup", function(pointer) {

            this.skipBtn.setFrame(0);

            const scene = this;

            const sceneFade = scene.add.image(640, 360, "img-ui-black-screen");
            sceneFade.setAlpha(0);
            sceneFade.setOrigin(0.5, 0.5);
            sceneFade.setScrollFactor(0);

            const tween1 = scene.tweens.add({
                targets: sceneFade,
                alpha: 1,
                duration: 500,
                delay: 0,
                onComplete: function() {
                    scene.sound.stopAll();
                    scene.scene.start("Chapter1", {});
                }
            });

        }, this);

        //Should be on top
        hoverText = this.add.text(0, 0, "", { fontFamily: "pixel2", fontSize: 15, color: "#ffffff", align: "left" });
        hoverText.setScrollFactor(0);
        hoverText.setShadow(0, 0, "#000000", 20, false, true);
        hoverText.setOrigin(1, 1);
        hoverText.setVisible(false);

        this.input.on("pointerdown", function(pointer) {

            //fastForwardText = true;
            if (canSwitchStoryPhase) {
                nextStoryPhase(this);
            }

        }, this);

    }

    update() {

        if (hoverText != null) {
            hoverText.x = this.input.activePointer.x;
            hoverText.y = this.input.activePointer.y;
        }

        this.clickLabel.setVisible(canSwitchStoryPhase);

    }

}

function storyAnimations(scene, phase) {

    scene.input.setDefaultCursor("default");
    canSwitchStoryPhase = false;

    if (phase == 0) {

        const tween1 = scene.tweens.add({
            targets: scene.solaris,
            alpha: 1,
            x: 0,
            ease: "Power1",
            duration: 1800,
            delay: 200
        });

        const text = "See that blue orb floating in space?";

        writeText(scene, text);

    }else if (phase == 1) {

        scene.solaris.setAlpha(1);
        scene.solaris.setPosition(0, 320);

        const tween1 = scene.tweens.add({
            targets: scene.solaris,
            scaleX: 3,
            scaleY: 3,
            onComplete: function() {
                const tween2 = scene.tweens.add({
                    targets: scene.solaris,
                    x: -350,
                    ease: "Power1",
                    duration: 1800,
                    delay: 200
                });

                const text = "That's Solaris, the central-star of the Precion solar system.";

                writeText(scene, text);
            },
            ease: "Power1",
            duration: 1800,
            delay: 200
        });

    }else if (phase == 2) {

        scene.solaris.setPosition(-350, 320);
        scene.solaris.setScale(3, 3);

        const text = "It heats up all the other planets and provides usable energy.";

        writeText(scene, text);

    }else if (phase == 3) {

        const tween1 = scene.tweens.add({
            targets: scene.utumu,
            alpha: 1,
            duration: 1800,
            delay: 200
        });

        const text = "Next to Solaris is the planet Utumu.";

        writeText(scene, text);

    }else if (phase == 4) {

        scene.utumu.setAlpha(1);

        const tween1 = scene.tweens.add({
            targets: scene.utumu,
            scaleX: 2,
            scaleY: 2,
            ease: "Power1",
            duration: 1800,
            delay: 200
        });

        const text = "Utumu's the only planet that produces the rare material, Exotill.";

        writeText(scene, text);

    }else if (phase == 5) {

        scene.utumu.setScale(2, 2);

        const text = "Utumu's moon, Batu holds the only Exotill refinery in the galaxy.";

        writeText(scene, text);

    }else if (phase == 6) {

        const tween1 = scene.tweens.add({
            targets: scene.utumu,
            x: 400,
            scaleX: 1,
            scaleY: 1,
            ease: "Power1",
            duration: 1800,
            delay: 200
        });

        const text = "Utumu's surface temperature can reach over 1000 degrees celcius making it extremely uninhabitable.";

        writeText(scene, text);

    }else if (phase == 7) {

        scene.utumu.setScale(1, 1);
        scene.utumu.setPosition(400, 320);

        const tween1 = scene.tweens.add({
            targets: scene.takar,
            alpha: 1,
            scaleX: 2,
            scaleY: 2,
            ease: "Power1",
            duration: 1800,
            delay: 200
        });

        const text = "Here's planet Takar in the habitable zone of the solar system.";

        writeText(scene, text);

    }else if (phase == 8) {

        scene.takar.setAlpha(1);
        scene.takar.setScale(2, 2);

        const tween1 = scene.tweens.add({
            targets: scene.takar,
            scaleX: 2.5,
            scaleY: 2.5,
            duration: 800,
            delay: 200
        });

        const text = "Takar contains massive jungles and vast oceans.";

        writeText(scene, text);

    }else if (phase == 9) {

        scene.takar.setScale(2.5, 2.5);

        const tween1 = scene.tweens.add({
            targets: scene.takar,
            scaleX: 1,
            scaleY: 1,
            duration: 1800,
            delay: 200
        });

        const text = "Takar hosts many villages for you to explore.";

        writeText(scene, text);

    }else if (phase == 10) {

        scene.takar.setScale(1, 1);

        const tween1 = scene.tweens.add({
            targets: scene.polaria,
            alpha: 1,
            scaleX: 2,
            scaleY: 2,
            ease: "Power1",
            duration: 1800,
            delay: 200
        });

        const text = "Ahh, the mighty planet, Polaria. Much colder than Takar, the people who live here embrace year-round artic weather.";

        writeText(scene, text);

    }else if (phase == 11) {

        scene.polaria.setAlpha(1);
        scene.polaria.setScale(2, 2);

        const tween1 = scene.tweens.add({
            targets: scene.polaria,
            scaleX: 1,
            scaleY: 1,
            x: 900,
            duration: 1800,
            delay: 200
        });

        const text = "Polaria's oceans are filled with icebergs and specially adapted creatures.";

        writeText(scene, text);

    }else if (phase == 12) {

        scene.polaria.setScale(1, 1);
        scene.polaria.setPosition(900, 320);

        const tween1 = scene.tweens.add({
            targets: scene.oblivio,
            alpha: 1,
            scaleX: 2.5,
            scaleY: 2.5,
            ease: "Power1",
            duration: 1800,
            delay: 200
        });

        const text = "The mysterious planet named, Oblivio exists far from Solaris's reach.";

        writeText(scene, text);

    }else if (phase == 13) {

        scene.oblivio.setAlpha(1);
        scene.oblivio.setScale(2.5, 2.5);

        const tween1 = scene.tweens.add({
            targets: scene.oblivio,
            scaleX: 3,
            scaleY: 3,
            duration: 800,
            delay: 200
        });

        const text = "Not much is known about Oblivio, but it's said to contain Irrium, the only known material that can conduct universal energy.";

        writeText(scene, text);

    }else if (phase == 14) {

        scene.oblivio.setScale(3, 3);

        const tween1 = scene.tweens.add({
            targets: scene.oblivio,
            scaleX: 1,
            scaleY: 1,
            x: 1100,
            duration: 1200,
            delay: 200
        });

        const tween2 = scene.tweens.add({
            targets: scene.takar,
            scaleX: 2,
            scaleY: 2,
            duration: 1000,
            delay: 1400
        });

        const text = "Your journey will begin on the planet Takar in a small village called Moins.";

        writeText(scene, text);

    }else if (phase == 15) {

        scene.oblivio.setScale(1, 1);
        scene.oblivio.setPosition(1100, 320);
        scene.takar.setScale(2, 2);

        const sceneFade = scene.add.image(640, 360, "img-ui-black-screen");
        sceneFade.setAlpha(0);
        sceneFade.setOrigin(0.5, 0.5);
        sceneFade.setScrollFactor(0);

        const tween1 = scene.tweens.add({
            targets: sceneFade,
            alpha: 1,
            duration: 500,
            delay: 0,
            onComplete: function() {
                scene.sound.stopAll();
                scene.scene.start("Chapter1", {});
            }
        });

    }

}

function nextStoryPhase(game) {

    storyPhase += 1;

    storyAnimations(game, storyPhase);

}

function writeText(scene, text) {

    const ref = text;
    let str = "";
    let currIndex = 0;

    const textWritingSound = scene.sound.add("audio-text-writing");
    textWritingSound.setLoop(true);
    textWritingSound.setVolume(0.4);
    textWritingSound.play();

    const timeEvent = scene.time.addEvent({
        delay: 50,
        callback: function() {
            if (fastForwardText) {
                timeEvent.destroy();
                scene.storyText.text = ref;
                fastForwardText = false;

                return;
            }

            str += ref.charAt(currIndex);

            currIndex += 1;

            scene.storyText.text = str;

            if (str === ref) {
                timeEvent.destroy();
                textWritingSound.stop();
                scene.input.setDefaultCursor("pointer");
                canSwitchStoryPhase = true;
            }
        },
        loop: true
    });

}
