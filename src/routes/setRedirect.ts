import express from 'express';
import * as Express from "express-serve-static-core";

const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  const queryObj: { exp: number } = req.query;
  const updateVal: number | null = queryObj !== undefined ? queryObj.exp : null;

  if (updateVal) {
      res.send(`Set redirect to ${updateVal}`);
  } else {
      res.send('Set redirect to not passed valid value');
  }
});

export default router;
