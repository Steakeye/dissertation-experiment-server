///<reference path="defs.d.ts"/>
///<reference path="steps-lib.ts"/>
///<reference path="steps/thank-you.ts"/>
///<reference path="steps/sign-up.ts"/>

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");

    const sunburstAnimateClassname: string = "animated";

    const stepsHandler: StepsLib = new StepsLib();
    const thankyouController: ThankYou = new ThankYou();
    const signUpController: SignUp = new SignUp();

    const body = Sizzle('body')[0];

    const sunBurstInner = Sizzle("#bg-sunburst > .inner", body)[0];

    //let currentEl: Udefable<Element> = stepsHandler.currentStepEl;

    body.classList.add('loaded');

    Sizzle('#bg-sunburst .inner')[0].classList.toggle("animated");

    const secondStep: Promise<Element> = thankyouController.animateThankYouStep().then((val: undefined) => {
        console.log('we animated then came back to exp1');
        sunBurstInner.classList.remove(sunburstAnimateClassname);
        return <Promise<Element>>stepsHandler.animateToNextStep();
    });

    const signUpSubmitPromise: Promise<undefined> = signUpController.createSignUpButtonBinding();

    signUpSubmitPromise.then(() => {
        stepsHandler.animateToNextStep()
    });
});