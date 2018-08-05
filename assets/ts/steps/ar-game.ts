class ARGame extends BaseStep {
    constructor() {
        super('#ar-game');

        this.gatherSceneEntities();

        this.bindCallbacks();

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

        if (bottlesArr && bottlesArr.length) {
            //box.addEventListener('click', function (evt) { // ... });
            bottlesArr.forEach((bottle) => {
                bottle.addEventListener('click', function (evt) {
                    console.log("bottle clicked! ", evt);
                });
            })
        }
    }

    protected scene?: AFrame.Scene;
    protected sceneBottles?: AFrame.Entity[];
    protected entitiesGathered: boolean = false;
}