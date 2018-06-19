import express from 'express';
import * as Express from "express-serve-static-core";
import {IncomingMessage} from "http";

const router = express.Router();

let redirectVal: number | null = null;

function handleUpdateVal(req : Express.Request, res : Express.Response, valUnWrapper: (req : Express.Request) => number | null) {
    const updateVal = valUnWrapper(req);

    if (updateVal) {
        res.send(`Set redirect to ${updateVal}`);
        redirectVal = updateVal;
    } else {
        res.send(`Set redirect to not passed valid value. Redirect value currently ${redirectVal}`);
    }
}

function getValFromQuery (req : Express.Request) {
    const queryObj: { exp: number } = req.query;
    const updateVal: number | null = queryObj !== undefined ? queryObj.exp : null;

    return updateVal;
}

function getValFromParams(req : Express.Request) {
    const paramObj: { exp: number } = req.params;
    const updateVal: number | null = paramObj !== undefined ? paramObj.exp : null;

    return updateVal;
}

/* GET being used to set redirect value. */
router.get('/', function(req, res, next) {
    handleUpdateVal(req, res, getValFromQuery);
});

router.get('/:exp', function(req, res, next) {
    handleUpdateVal(req, res, getValFromParams);
});

export function getRedirectVal() {
    return redirectVal;
}

export default router;
