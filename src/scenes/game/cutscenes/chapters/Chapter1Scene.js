
class Chapter1Scene extends Phaser.Scene {

    constructor() {
        super({ key: "Chapter1" });
    }

    init() {

    }

    preload() {

        //Assets
        this.load.setPath("./src/assets/");

        //Images
        this.load.image("img-ui-black-screen", "images/ui/screens/black-screen.png");

        //Audio
        this.load.audio("audio-new-chapter", "sound/effects/new-chapter.wav");

        //Scenes
        this.load.setPath("./src/scenes/");
        //this.load.sceneFile("TakarTutorialScene", "game/TakarTutorialScene.js");

    }

    create() {

        this.input.setDefaultCursor("default");

        this.title = this.add.text(640, 300, 'Chapter I', { fontFamily: "pixel1", fontSize: 160, color: "#ffffff", align: "center" }).setAlpha(0);
        this.title.setOrigin(0.5, 0.5);
        this.title.setScrollFactor(0);

        this.subtitle = this.add.text(640, 420, "The journey begins!", { fontFamily: "pixel2", fontSize: 32, color: "#ffffff", align: "center" }).setAlpha(0);
        this.subtitle.setOrigin(0.5, 0.5);
        this.subtitle.setScrollFactor(0);

        this.tweens.add({
            targets: [this.title, this.subtitle],
            alpha: 1,
            duration: 900,
            delay: 2500
        });

        const timeEvent1 = this.time.addEvent({
            delay: 2400,
            callback: function() {
                const sound = this.sound.add("audio-new-chapter");
                sound.setVolume(0.3);
                sound.play();
            },
            callbackScope: this,
            loop: false
        });

        const timeEvent2 = this.time.addEvent({
            delay: 7000,
            callback: function() {
                const sceneFade = this.add.image(640, 360, "img-ui-black-screen");
                sceneFade.setAlpha(0);
                sceneFade.setOrigin(0.5, 0.5);
                sceneFade.setScrollFactor(0);

                const scene = this;
                const tween1 = this.tweens.add({
                    targets: sceneFade,
                    alpha: 1,
                    duration: 500,
                    delay: 0,
                    onComplete: function() {
                        scene.sound.stopAll();
                        scene.scene.start("TakarTutorial", { fadeIn: true });
                        scene.scene.get("UI").switchTo("TakarTutorial");
                    }
                });
            },
            callbackScope: this,
            loop: false
        });

    }

}
