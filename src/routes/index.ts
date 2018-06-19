import express from 'express';
import * as Express from "express-serve-static-core";

const router: Express.Router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express test 123' });
});

export default router;
