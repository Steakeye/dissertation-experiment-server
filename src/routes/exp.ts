import express from 'express';

function expRouter(userValueGetter : () => string | null) {
    const router = express.Router();

    /* GET exp page. */
    router.get('/:exp', function(req, res, next) {
        const expVal: number | null = req.params.exp;

        res.render(`exp/${expVal}`, { title: `Fave Exp ${expVal}`, user: userValueGetter() || '' });
    });

    return router;
}

export default expRouter;