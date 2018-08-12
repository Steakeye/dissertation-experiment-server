import express from 'express';

function redirectRouter(redirectValueGetter : () => number | null) {
    const router = express.Router();

    /* GET being used to redirect to target experiment. */
    router.get('/', function(req, res, next) {
          //res.send(`Redirect value currently ${redirectValueGetter()}`);
        const rdVal: number | null = redirectValueGetter();
        console.log(`Redirect value currently ${rdVal}`);
        res.redirect(`/exp/${rdVal}`);
    });

    return router;
}

export default redirectRouter;
