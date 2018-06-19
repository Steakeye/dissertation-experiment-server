import express from 'express';
import * as Express from "express-serve-static-core";

const router: Express.Router = express.Router();

/* GET home page. */
router.get('/:exp', function(req, res, next) {
  const expVal: number | null = req.params.exp;

  res.render(`exp/${expVal}`, { title: 'Test runner' });
});

export default router;
