///<reference path="../defs.d.ts"/>
///<reference path="../steps-lib.ts"/>
///<reference path="../steps/thank-you.ts"/>
///<reference path="../steps/sign-up.ts"/>
///<reference path="../steps/thank-you.ts"/>
///<reference path="../steps/get-fave-coin.ts"/>
///<reference path="../steps/have-fave-coin.ts"/>
///<reference path="../steps/amazing.ts"/>

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");

    const stepsHandler: StepsLib = new StepsLib();
    const backgroundController: BGController = new BGController();
    const thankyouController: ThankYou = new ThankYou();
    const getCoinController: GetFaveCoin = new GetFaveCoin();
    const haveCoinController: HaveFaveCoin = new HaveFaveCoin();
    const amazingController: Amazing = new Amazing();

    backgroundController.animateBG();

    const secondStep: Promise<Element> = thankyouController.animateThankYouStep().then(() => {
        //console.log('we animated then came back to exp1');
        getCoinController.spinCoin();
        backgroundController.raiseBG().then(() => {
            backgroundController.setBGPosToRaised();
            backgroundController.raiseBG(false);
        });
        return <Promise<Element>>stepsHandler.animateToNextStep();
    });

    secondStep.then(() => {
        getCoinController.bounceTitle();
        return GetFaveCoin.createDelayPromise((resolver: PromiseResolver<void>) => {
            if (stepsHandler.currentStepEl == getCoinController.stepEl) {
                backgroundController.animateBG(false);
            }
            resolver();
        }, 6000)
    });

    const signUpSubmitPromise: Promise<void> = getCoinController.createSignUpButtonBinding();

    const thirdStep: Promise<Element> = signUpSubmitPromise.then(() => {
        getCoinController.doExitAnimation();
        haveCoinController.doIntroAnimation();
        backgroundController.animateBG();
        return <Promise<Element>>stepsHandler.animateToNextStep();
    });

    const haveCoinHandler = (): Udefable<Promise<Element>> => {
        if (stepsHandler.currentStepEl == getCoinController.stepEl) {
            backgroundController.animateBG(false);
            return <Promise<Element>>stepsHandler.animateToNextStep();
        }
    };

    const thirdStepPause: Promise<Element> = haveCoinController.getInterstitialPromise().then(() => {
        /*if (stepsHandler.currentStepEl == getCoinController.stepEl) {
            backgroundController.animateBG(false);
            return <Promise<Element>>stepsHandler.animateToNextStep();
        }*/
        return haveCoinHandler();
    });

    const haveCoinClickPromise: Promise<void> = haveCoinController.createClickBinding();

    haveCoinClickPromise.then(() => {
        return haveCoinHandler();
    });

    thirdStepPause.then(() => {
        haveCoinController.doExitAnimation();
        amazingController.doIntroAnimation();
        return <Promise<Element>>stepsHandler.animateToNextStep();
    });
});