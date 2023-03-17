var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const UserRouter = require('./routes/front/UserRouter');
const JWT = require('./util/JWT');
const TxtRouter = require('./routes/front/TxtRouter');
const ProRouter = require('./routes/front/ProRouter');
const webTxtRouter = require('./routes/web/TxtRouter');
const webProRouter = require('./routes/web/ProRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(
	express.urlencoded({
		extended: false,
	})
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(webTxtRouter);
app.use(webProRouter);

/*
  /frontapi/*  后台系统用
  /webapi/*  企业官网用
 */

//中间件
app.use((req, res, next) => {
	// 如果token有效，next（）
	// next();
	//返回401
	if (req.url === '/frontapi/user/login') {
		next();
		return;
	}

	const token = req.headers['authorization'].split(' ')[1];
	if (token) {
		var payload = JWT.verify(token);
		// console.log(payload);
		if (payload) {
			const newToken = JWT.generate(
				{
					_id: payload._id,
					username: payload.username,
				},
				'2h'
			);
			res.header('Authorization', newToken);
			next();
		} else {
			res.status(401).send({
				errCode: '-1',
				errorInfo: 'token过期了！',
			});
		}
	}
});

app.use(UserRouter);
app.use(TxtRouter);
app.use(ProRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app; //这是 4.x 默认的配置，分离了 app 模块,将它注释即可，上线时可以重新改回来
