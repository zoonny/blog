require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const cors = require('koa-cors');
const session = require('koa-session');

const api = require('./api');

// MONGOOSE
const {
  PORT: port = 4000, // 값이 존재하지 않는다면 4000을 기본 값으로 사용
  MONGO_URI: mongoURI, // process.env의 MONGO_URI 값 => mongoURI에 설정
  COOKIE_SIGN_KEY: signKey,
} = process.env;

mongoose.Promise = global.Promise; // Node의 Promise를 사용하도록 설정
mongoose
  .connect(
    mongoURI,
    { useNewUrlParser: true },
  )
  .then(() => {
    console.log('connected to mongodb');
  })
  .catch((e) => {
    console.error(e);
  });

// KOA & ROUTER
const app = new Koa();
const router = new Router();

// CORS 적용
app.use(
  cors({
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
  }),
);

// 라우터 설정
router.use('/api', api.routes()); // api 라우트 적용

// 라우터 적용 전에 bodyParser 적용
app.use(bodyParser());

// 세션/키 적용
const sessionConfig = {
  maxAge: 86400000, // 1day
  // signed: true  // default
};
app.use(session(sessionConfig, app));
app.keys = [signKey];

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.log('listening to port 4000');
});
