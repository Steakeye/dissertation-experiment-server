///<reference path="lib.ts"/>


/*/*
TODO: get a query selector loaded, use it to navigate to the next steps
* */
document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");

    const stepsHandler: StepsLib = new StepsLib();
    //const allSteps: Element[] = Sizzle("#ad-steps section[data-order]");

    //stepsHandler.loadSteps(allSteps);

    const body = Sizzle('body')[0];

    let currentEl: Udefable<Element> = stepsHandler.currentStepEl;

    body.classList.add('loaded');

    Sizzle('#bg-sunburst .inner')[0].classList.toggle("animated");

    const secondStep: Promise<Element> = animateThankYouStep().then((val: undefined) => {
        console.log('we animated then came back to exp1');
        return <Promise<Element>>stepsHandler.animateToNextStep();
    });

    secondStep.then((el: Element) => {
       console.log("we've got our next el!", el);
    });
});