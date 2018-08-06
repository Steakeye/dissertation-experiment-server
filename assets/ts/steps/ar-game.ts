declare module Tone {
    class Synth {
        constructor(thing1: any);
        toMaster(): this;
        triggerAttackRelease(note: string | number, duration: string | number, time?: string | number, velocity?: number): void;
    }
}

interface Eventable {
    addEventListener(name: string, callback: EventListener): void
    removeEventListener(name: string, callback: EventListener): void
}

interface MarkerFoundEvent extends Event {
    data: {
        type: number;
    }
}

interface ARJSContext extends Eventable {
    initialized: boolean
    arController: ARJSContrller;
}

interface ARJSContrller extends Eventable {
}

interface ARJSSystem extends AFrame.System {
    _arSession: {
        arContext: ARJSContext;
    }
}

/*
scene.sceneEl.systems.arjs._arSession.arSource
scene.sceneEl.systems.arjs._arSession.arContext.arController - addEventlisterner('getMarker', ...) - dispose
* */

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

    private setupMarkerFoundHandler(): void {
        this.arController && (<ARJSContrller>this.arController).addEventListener(ARGame.EVT_KEY_MARKER, this.onMarkerFound);
    }

    private bindCallbacks() {
        this.onSceneLoaded = this.onSceneLoaded.bind(this);
        this.onMarkerFound = this.onMarkerFound.bind(this);
    }

    private onSceneLoaded() {
        console.log("a-frame scene loaded!");

        this.gatherSceneEntities();

        this.gatherSceneInternals();

        this.setupMarkerFoundHandler();

        //this.bindClickCallbacksToBottles();
    }

    private onMarkerFound(evt: MarkerFoundEvent) {
        const markerType: number = evt.data.type;

        //console.log("onMarkerFound!!");

        if (!this.markerFoundFirstTime && markerType == ARGame.TYPE_PATTERN_MARKER) {
            console.log("onMarkerFound out pattern!!");

            this.markerFoundFirstTime = true;

            (<ARJSContrller>this.arController).removeEventListener(ARGame.EVT_KEY_MARKER, this.onMarkerFound);

            this.bindClickCallbacksToBottles();
        }
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

    private gatherSceneInternals() {
        //initialized
        const context: ARJSContext = (<ARJSSystem>(<AFrame.Scene>this.scene).systems.arjs)._arSession.arContext;

        if (context.initialized) {
            this.arController = (<ARJSSystem>(<AFrame.Scene>this.scene).systems.arjs)._arSession.arContext.arController;
        } else {
            context.addEventListener("initialized", () => {
                this.arController = (<ARJSSystem>(<AFrame.Scene>this.scene).systems.arjs)._arSession.arContext.arController;

                this.setupMarkerFoundHandler();
            });
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
    protected arController?: ARJSContrller;
    protected synthTone?: Tone.Synth;
    protected entitiesGathered: boolean = false;
    protected markerFoundFirstTime: boolean = false;

    private static readonly EVT_KEY_MARKER: string = "getMarker";
    private static TYPE_PATTERN_MARKER: number = 0;

    private notes: string[]= ["C4", "E4", "G4"];
}