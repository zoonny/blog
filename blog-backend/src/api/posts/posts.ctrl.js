const Post = require('models/post');
const Joi = require('joi');

// 포스트 작성
// POST /api/posts
// { title, body }
exports.write = async (ctx) => {
  // 객체가 지닌 값들을 검증
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(), // 문자열 배열
  });

  // 파라미터: 검증할 객체, 스키마
  const result = Joi.validate(ctx.request.body, schema);

  // 오류가 발생하면 오류 내용 응답
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { title, body, tags } = ctx.request.body;

  // 새 Post 인스턴스 생성
  const post = new Post({
    title, body, tags,
  });

  try {
    await post.save(); // 데이터베이스에 등록
    ctx.body = post; // 저장된 결과 반환
  } catch (e) {
    // 데이터베이스의 오류 발생
    ctx.throw(e, 500);
  }
};

// 포스트 목록 조회
// GET /api/posts
exports.list = async (ctx) => {
  // page가 주어지지 않았다면 1로 간주
  // query는 문자열 형태로 받아 오므로 숫자로 변환
  const page = parseInt(ctx.query.page || 1, 10);
  const { tag } = ctx.query;

  const query = tag ? {
    tags: tag, // tags 배열에 tag를 가진 포스트 찾기
  } : {};

  // 잘못된 페이지가 주어졌다면 오류
  if (page < 1) {
    ctx.status = 400;
    return;
  }

  try {
    const posts = await Post.find(query)
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10) // (현재페이지 - 1) * row수(10) 만큼 skip
      .lean() // 조회 시 처음부터 JSON으로 조회, 아니면 Mongoose 문서 인스턴스로 조회
      .exec();
    const postCount = await Post.countDocuments().exec();
    const limitBodyLength = post => ({
      ...post,
      body: post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}`,
    });
    ctx.body = posts.map(limitBodyLength); // limitBodyLength 함수 수행
    // 마지막 페이지 알려 주기
    // ctx.set은 response header를 설정
    ctx.set('Last-Page', Math.ceil(postCount / 10));
  } catch (e) {
    ctx.throw(e, 500);
  }
};

// 특정 포스트 조회
// GET /api/posts/:id
exports.read = async (ctx) => {
  const { id } = ctx.params;

  try {
    const post = await Post.findById(id).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

// 특정 포스트 제거
// DELETE /api/posts/:id
exports.remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

// 포스트 수정(특정 필드 변경)
// PATCH /api/posts/:id
// { title, body }
exports.update = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true,
      // 이 값을 설정해야 업데이트된 객체를 반환
      // 설정하지 않으면 업데이트 되기 전의 객체를 반환
    }).exec();
    // 포스트가 존재하지 않을 때
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(e, 500);
  }
};