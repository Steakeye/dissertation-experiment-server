import express from 'express';
import * as Express from "express-serve-static-core";

const router = express.Router();

let redirectVal: number | null = null;
let userVal: string | null = null;

function handleUpdateVal(req : Express.Request, res : Express.Response, valUnWrapper: (req : Express.Request) => number | null, allowNull: boolean = false) {
    const updateVal = valUnWrapper(req);

    if (updateVal || allowNull) {
        const user: string = <string>req.headers.user;
        let userMsg: string = '';

        if (user) {
            userVal = user;
            userMsg = ` - user set to: ${user}`;
        } else if (allowNull) {
            userVal = null;
            userMsg = ` - user has been unset`;
        }

        res.send(`Set redirect to ${updateVal}${userMsg}`);
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

router.delete('/', function(req, res, next) {
    handleUpdateVal(req, res, (req: Express.Request) => { return null; }, true);
});

export function getRedirectVal() {
    return redirectVal;
}

export function getUserVal() {
    return userVal;
}

export default router;
