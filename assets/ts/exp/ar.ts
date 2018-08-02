///<reference path="../defs.d.ts"/>
///<reference path="../steps-lib.ts"/>
///<reference path="../steps/thank-you.ts"/>
///<reference path="../steps/play-ar.ts"/>
///<reference path="../steps/ar-game.ts"/>
///<reference path="../steps/have-fave-coin.ts"/>
///<reference path="../steps/well-done.ts"/>
///<reference path="../steps/share-with-friends.ts"/>
///<reference path="../steps/social-media.ts"/>
///<reference path="../steps/amazing.ts"/>

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");

    const stepsHandler: StepsLib = new StepsLib();
    const backgroundController: BGController = new BGController();
    const arGameController: ARGame = new ARGame();

    const firstStep: Promise<void> = ARGame.createTimewPromise(1000).then(() => {
        arGameController.startARGame();
        arGameController.endARGame();
    });

    const fourthStepPause: Promise<void> = firstStep.then(() => {
        return ARGame.createDelayPromise((resolve: PromiseResolver<void>) => {
            resolve();
        }, 1000);
    });

    /*const fifthStep: Promise<Element> = fourthStepPause.then(() => {
        arGameController.hideStep();
        backgroundController.animateBG(true);
        return stepsHandler.animateToNextStep();
    });*/

});