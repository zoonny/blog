const Router = require('koa-router');
const typesCheck = require('common/types.check');
const authCheck = require('common/auth.check');
const postsCtrl = require('./posts.ctrl');

const posts = new Router();

posts.get('/', postsCtrl.list); // 포스트 목록 조회
posts.get('/:id', typesCheck.checkObjectId, postsCtrl.read); // 특정 포스트 조회
posts.post('/', authCheck.checkLogin, postsCtrl.write); // 포스트 작성
posts.delete(
  '/:id',
  authCheck.checkLogin,
  typesCheck.checkObjectId,
  postsCtrl.remove,
); // 특정 포스트 삭제
// posts.put('/:id', authCheck.checkLogin, typesCheck.checkObjectId, postsCtrl.replace); // 특정 포스트 업데이트 (교체)
posts.patch(
  '/:id',
  authCheck.checkLogin,
  typesCheck.checkObjectId,
  postsCtrl.update,
); // 특정 포스트 업데이트 (특정 필드 변경)

module.exports = posts;
