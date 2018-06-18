import createError from "http-errors";
import express from 'express';
import * as Express from "express-serve-static-core";
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from "morgan";
import sassMiddleware from 'node-sass-middleware';

import indexRouter from './routes/index';
import setRedirectRoute from './routes/setRedirect';
//import * as redirectRoute from './routes/setRedirect';

const app: Express.Express = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/setredirect', setRedirectRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(<Express.ErrorRequestHandler>function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export = app;