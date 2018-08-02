///<reference path="../defs.d.ts"/>
///<reference path="../steps-lib.ts"/>
///<reference path="../steps/thank-you.ts"/>
///<reference path="../steps/play-ar.ts"/>
///<reference path="../steps/ar-game.ts"/>
///<reference path="../steps/have-fave-coin.ts"/>
///<reference path="../steps/well-done.ts"/>
///<reference path="../steps/amazing.ts"/>

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");

    const stepsHandler: StepsLib = new StepsLib();
    const backgroundController: BGController = new BGController();
    const thankyouController: ThankYou = new ThankYou();
    const playARController: PlayAR = new PlayAR();
    const arGameController: ARGame = new ARGame();
    const wellDoneController: WellDone = new WellDone();
    const haveCoinController: HaveFaveCoin = new HaveFaveCoin();
    const amazingController: Amazing = new Amazing();

    backgroundController.animateBG();

    const secondStep: Promise<Element> = thankyouController.animateThankYouStep().then(() => {
        playARController.bounceButton();
        return <Promise<Element>>stepsHandler.animateToNextStep();
    });

    secondStep.then(() => {
        playARController.doIntroAnimation();
    });

    const thirdStep: Promise<Element> = secondStep.then(() => { return playARController.createPlayButtonBinding(); }).then(() => {
        backgroundController.animateBG(false);
        return <Promise<Element>>stepsHandler.animateToNextStep(2000);
    });

    const fourthStep: Promise<void> = thirdStep.then(() => {
        arGameController.startARGame();
        arGameController.endARGame();
    });

    const fourthStepPause: Promise<void> = fourthStep.then(() => {
        return ARGame.createDelayPromise((resolve: PromiseResolver<void>) => {
            resolve();
        }, 1000);
    });

    const fifthStep: Promise<Element> = fourthStepPause.then(() => {
        arGameController.hideStep();
        backgroundController.animateBG(true);
        return stepsHandler.animateToNextStep();
    });

    const sixthStep: Promise<void> = fifthStep.then(() => {
        return wellDoneController.animateWellDoneStep();
    }).then(() => {
        haveCoinController.doIntroAnimation();
        return stepsHandler.animateToNextStep();
    }).then(() => {
        backgroundController.animateBG(false);
    });

    const signUpSubmitPromise: Promise<void> = sixthStep.then(() => {
        return haveCoinController.createSignUpButtonBinding();
    });

    const seventhStep: Promise<Element> = signUpSubmitPromise.then(() => {
        haveCoinController.doExitAnimation();
        return HaveFaveCoin.createTimewPromise(500);
    }).then(() => {
        amazingController.doIntroAnimation();
        return <Promise<Element>>stepsHandler.animateToNextStep();
    });

    seventhStep.then(() => {
        amazingController.doExitAnimation();
    });
});