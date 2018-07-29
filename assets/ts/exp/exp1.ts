///<reference path="../defs.d.ts"/>
///<reference path="../steps-lib.ts"/>
///<reference path="../steps/thank-you.ts"/>
///<reference path="../steps/sign-up.ts"/>

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");

    const stepsHandler: StepsLib = new StepsLib();
    const backgroundController: BGController = new BGController();
    const thankyouController: ThankYou = new ThankYou();
    const signUpController: SignUp = new SignUp();
    const amazingController: Amazing = new Amazing();

    backgroundController.animateBG();

    const secondStep: Promise<Element> = thankyouController.animateThankYouStep().then(() => {
        //console.log('we animated then came back to exp1');
        backgroundController.animateBG(false);
        signUpController.bounceBottle();
        return <Promise<Element>>stepsHandler.animateToNextStep();
    });

    const signUpSubmitPromise: Promise<void> = signUpController.createSignUpButtonBinding();

    const thirdStep: Promise<Element> = signUpSubmitPromise.then(() => {
        signUpController.doExitAnimation();
        amazingController.doIntroAnimation();
        return <Promise<Element>>stepsHandler.animateToNextStep();
    });

    thirdStep.then(() => {
        amazingController.doExitAnimation()
    });
});