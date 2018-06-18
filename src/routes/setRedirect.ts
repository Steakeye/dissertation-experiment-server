import express from 'express';
import * as Express from "express-serve-static-core";

const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('set redirect to...');
});

export default router;
