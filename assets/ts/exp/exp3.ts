///<reference path="../defs.d.ts"/>
///<reference path="../steps-lib.ts"/>
///<reference path="../steps/thank-you.ts"/>
///<reference path="../steps/sign-up.ts"/>
///<reference path="../steps/thank-you.ts"/>
///<reference path="../steps/get-fave-coin.ts"/>
///<reference path="../steps/amazing.ts"/>

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");

    const stepsHandler: StepsLib = new StepsLib();
    const backgroundController: BGController = new BGController();
    const thankyouController: ThankYou = new ThankYou();
    const getCoinController: GetFaveCoin = new GetFaveCoin();
    const amazingController: Amazing = new Amazing();

    backgroundController.animateBG();

    const secondStep: Promise<Element> = thankyouController.animateThankYouStep().then(() => {
        console.log('we animated then came back to exp1');
        backgroundController.animateBG(false);
        getCoinController.spinCoin();
        backgroundController.raiseBG();
        return <Promise<Element>>stepsHandler.animateToNextStep();
    });

    secondStep.then(() => {
        getCoinController.bounceTitle();
    });

    const signUpSubmitPromise: Promise<void> = getCoinController.createSignUpButtonBinding();

    const thirdStep: Promise<Element> = signUpSubmitPromise.then(() => {
        getCoinController.doExitAnimation();
        amazingController.doIntroAnimation();
        return <Promise<Element>>stepsHandler.animateToNextStep();
    });

    thirdStep.then(() => {
        amazingController.doExitAnimation()
    });
});