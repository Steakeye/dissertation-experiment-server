declare module Tone {
    class Synth {
        constructor(thing1: any);
        toMaster(): this;
        triggerAttackRelease(note: string | number, duration: string | number, time?: string | number, velocity?: number): void;
    }
}

class ARGame extends BaseStep {
    constructor() {
        super('#ar-game');

        this.gatherSceneEntities();

        this.bindCallbacks();

        this.setupSynth();

        this.setupLoadedHandler();
    }

    public doIntroAnimation() {
        //TODO
    }

    public doExitAnimation() {
        this.hideStep();
    }

    public startARGame() {
        console.log('Starting AR Game');
    }

    public endARGame() {
        console.log('Ending AR Game');
    }

    private setupLoadedHandler() {
        const scene: AFrame.Scene = <AFrame.Scene>this.scene;
        if (scene.hasLoaded) {
            this.onSceneLoaded();
        } else {
            scene.addEventListener("loaded", this.onSceneLoaded)
        }
    }

    private bindCallbacks() {
        this.onSceneLoaded = this.onSceneLoaded.bind(this);
    }

    private onSceneLoaded() {
        console.log("a-frame scene loaded!");

        this.gatherSceneEntities();

        this.bindClickCallbacksToBottles();
    }

    private gatherSceneEntities() {
        if (!this.entitiesGathered) {
            this.scene = <AFrame.Scene>Sizzle("a-scene", this.stepContainer)[0];

            if (this.scene) {
                this.sceneBottles = <AFrame.Entity[]>Sizzle(".bottle", this.scene);

                this.entitiesGathered = true;
            }
        }
    }

    private bindClickCallbacksToBottles() {
        const bottlesArr = this.sceneBottles;

        console.log("bindClickCallbacksToBottles");

        if (bottlesArr && bottlesArr.length) {
            //box.addEventListener('click', function (evt) { // ... });
            bottlesArr.forEach((bottle) => {
                bottle.addEventListener('click', function (evt) {
                    console.log("bottle clicked! ", evt);
                });
            })
        }
    }

    private setupSynth() {
        this.synthTone = new Tone.Synth({
            oscillator : {
                type : 'triangle8'
            },
            envelope : {
                attack : 2,
                decay : 1,
                sustain: 0.4,
                release: 4
            }
        }).toMaster();
    }

    private playNoteforBottle(bottle: AFrame.Entity): void {
        const noteVal: string = this.notes[(<AFrame.Entity[]>this.sceneBottles).lastIndexOf(bottle)];

        this.playNote(noteVal);
    }

    private playNote(note: string) : void {
        (<Tone.Synth>this.synthTone).triggerAttackRelease(note, "2n")
    }

    protected scene?: AFrame.Scene;
    protected sceneBottles?: AFrame.Entity[];
    protected synthTone?: Tone.Synth;
    protected entitiesGathered: boolean = false;

    private notes: string[]= ["C4", "E4", "G4"];
}