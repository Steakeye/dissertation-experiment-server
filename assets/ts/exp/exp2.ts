///<reference path="../defs.d.ts"/>
///<reference path="../steps-lib.ts"/>
///<reference path="../steps/thank-you.ts"/>
///<reference path="../steps/play-ar.ts"/>
///<reference path="../steps/sign-up.ts"/>
///<reference path="../steps/amazing.ts"/>

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");

    const sunburstAnimateClassname: string = "animated";

    const stepsHandler: StepsLib = new StepsLib();
    const backgroundController: BGController = new BGController();
    const thankyouController: ThankYou = new ThankYou();
    const playARController: PlayAR = new PlayAR();
    //const signUpController: SignUp = new SignUp();
    //const amazingController: Amazing = new Amazing();

    backgroundController.animateBG();

    const secondStep: Promise<Element> = thankyouController.animateThankYouStep().then(() => {
        //backgroundController.animateBG(false);
        playARController.bounceButton();
        return <Promise<Element>>stepsHandler.animateToNextStep();
    });

    secondStep.then(() => {
        playARController.splayBottles();
        playARController.bounceBottle();
    });

    playARController.createPlayButtonBinding().then(() => {
        alert("Play Buttony pressed!");
        //return <Promise<Element>>stepsHandler.animateToNextStep();
    });

    //const signUpSubmitPromise: Promise<undefined> = signUpController.createSignUpButtonBinding();

    /*const thirdStep: Promise<Element> = signUpSubmitPromise.then(() => {
        //signUpController.hideStep();
        //signUpController.tiltBottle();
        //amazingController.tiltBottle();
        return <Promise<Element>>stepsHandler.animateToNextStep();
    });*/

    /*thirdStep.then(() => {
        //amazingController.tiltBottle();
    });*/
});