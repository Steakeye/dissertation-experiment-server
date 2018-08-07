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


    public createARGameSuccessBinding(): Promise<void> {
        const successAction: PromiseAction<void> = (resolver: PromiseResolver<void>): void => {
            this.arGameSuccessResolver = resolver;
        };

        return ARGame.createPromise<void>(successAction)
    }

    private init(): void {
        //TODO
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
        this.onBottleClicked = this.onBottleClicked.bind(this);
    }

    private onSceneLoaded() {
        //console.log("a-frame scene loaded!");

        this.gatherSceneEntities();

        this.gatherSceneInternals();

        this.setupMarkerFoundHandler();

        //this.readyBottlesForInteraction();
    }

    private onMarkerFound(evt: MarkerFoundEvent) {
        const markerType: number = evt.data.type;

        //console.log("onMarkerFound!!");

        if (!this.markerFoundFirstTime && markerType == ARGame.TYPE_PATTERN_MARKER) {
            console.log("onMarkerFound out pattern!!");

            this.markerFoundFirstTime = true;

            (<ARJSContrller>this.arController).removeEventListener(ARGame.EVT_KEY_MARKER, this.onMarkerFound);

            this.reconfigureInstructions();
            this.readyBottlesForInteraction();
            this.triggerDemoMode(this.triggerInteractionMode.bind(this));
        }
    }

    private gatherSceneEntities() {
        if (!this.entitiesGathered) {
            this.scene = <AFrame.Scene>Sizzle("a-scene", this.stepContainer)[0];

            if (this.scene) {
                this.sceneBottles = <AFrame.Entity[]>Sizzle(".bottle", this.scene);
                this.sceneBottlesShuffled = this.shuffledBottleOrder();

                this.sceneInstructionsWrapper = <AFrame.Entity>Sizzle("#instruction-container", this.scene)[0];

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

    private reconfigureInstructions(): void {
        const instrutionsWrapper: AFrame.Entity = (<AFrame.Entity>this.sceneInstructionsWrapper);
        instrutionsWrapper.setAttribute("rotation", "-90 0 0");
        instrutionsWrapper.setAttribute("position","0 -.5 -1");

        const bg: AFrame.Entity = <AFrame.Entity>instrutionsWrapper.children["instruction-bg"];

        bg.setAttribute("opacity", .33);
        bg.setAttribute("width", 5);
        bg.setAttribute("height", 3);
        bg.setAttribute("position","0 -1 0");
    }

    private readyBottlesForInteraction() {
        //console.log("readyBottlesForInteraction");

        this.iterateOverBottles((bottle) => {
            bottle.setAttribute("visible", true)
        });
    }

    private triggerDemoMode(callback?: () => void): void {
        const sequencePromise: Promise<void> = ARGame.createTimewPromise(500).then(() => {
            return this.playBottleSequence();
        });

        if (callback) {
            sequencePromise.then(callback);
        }
    }

    private triggerInteractionMode(): void {
        console.log("triggerInteractionMode");
        this.iterateOverBottles((bottle) => {
            bottle.addEventListener('click', this.onBottleClicked);
        });

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

    private onBottleClicked(evt: Event) {
        //const bottle:AFrame.Entity = <AFrame.Entity>evt.target;

        //console.log("bottle clicked! ", bottle);*/
        //alert("bottle clicked! " + bottle.id);

        //TODO: Just change this to play the sequence again! Fake it!
        //this.triggerBottleInteraction(bottle);

        this.iterateOverBottles((bottle: AFrame.Entity) => {
            bottle.removeEventListener('click', this.onBottleClicked)
        });

        this.triggerDemoMode(() => {
            console.log("After the user has invoked the sequence we should be done..!");

            (<AFrame.Entity>this.sceneInstructionsWrapper).children["instruction-text"].setAttribute("value", ARGame.MSG_SUCCESS);

            const successResolver: PromiseResolver<void> = (<PromiseResolver<void>>this.arGameSuccessResolver);

            successResolver && successResolver();
        });
    }

    private triggerBottleInteraction(bottle: AFrame.Entity): Promise<void> {
        this.playNoteforBottle(bottle);
        return this.scaleBottleThenRestore(bottle);
    }

    private scaleBottleThenRestore(bottle: AFrame.Entity): Promise<void> {
        const scaleKey: string = "scale";
        const normalScale: string = "1 1 1";
        const enlargedScale: string = "1.25 1.25 1.25";

        bottle.setAttribute(scaleKey, enlargedScale);

        return ARGame.createTimewPromise(2000).then(() => {
            bottle.setAttribute(scaleKey, normalScale);
        });
    }

    private playNoteforBottle(bottle: AFrame.Entity): void {
        const noteVal: string = this.notes[(<AFrame.Entity[]>this.sceneBottles).lastIndexOf(bottle)];

        this.playNote(noteVal);
    }

    private playNote(note: string) : void {
        (<Tone.Synth>this.synthTone).triggerAttackRelease(note, "2n")
    }

    private playBottleSequence(): Promise<void> {
        const shuffledBottles: AFrame.Entity[] = <AFrame.Entity[]>this.sceneBottlesShuffled;

        let lastPromise: Promise<void>;

        shuffledBottles.forEach((bottle: AFrame.Entity) => {
            if (lastPromise) {
                lastPromise = lastPromise.then(() => { return this.triggerBottleInteraction(bottle); });
            } else {
                lastPromise = this.triggerBottleInteraction(bottle);
            }
        });

        return lastPromise;
    }

    private shuffledBottleOrder(): AFrame.Entity[] {
        function shuffleArr(a) {
            let idx = a.length;

            while(--idx) {
                const replacementValIdx = Math.floor(Math.random() * (idx + 1));
                [a[idx], a[replacementValIdx]] = [a[replacementValIdx], a[idx]];
            }
        }

        const bottlesToShuffle = (<AFrame.Entity[]>this.sceneBottles).slice();

        shuffleArr(bottlesToShuffle);

        return bottlesToShuffle;
    }

    private iterateOverBottles(func: (bottle: AFrame.Entity) => void): void {
        const bottlesArr = this.sceneBottles;

        //console.log("iterateOverBottles");

        if (bottlesArr && bottlesArr.length) {
            bottlesArr.forEach(func);
        }
    }

    private tearDown(): void {
        //TODO:
    }

    protected scene?: AFrame.Scene;
    protected sceneBottles?: AFrame.Entity[];
    protected sceneBottlesShuffled?: AFrame.Entity[];
    protected sceneInstructionsWrapper?: AFrame.Entity;
    protected arController?: ARJSContrller;
    protected synthTone?: Tone.Synth;
    protected entitiesGathered: boolean = false;
    protected markerFoundFirstTime: boolean = false;
    protected arGameSuccessResolver?: PromiseResolver<void>;

    private static readonly EVT_KEY_MARKER: string = "getMarker";
    private static TYPE_PATTERN_MARKER: number = 0;
    private static MSG_SUCCESS: string = "You did it!";

    private notes: string[]= ["C4", "E4", "G4"];
}