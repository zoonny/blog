const mongoose = require('mongoose');

const { Schema } = mongoose;

const Post = new Schema({
  title: String,
  body: String,
  tags: [String], // 문자열 배열
  publishedDate: {
    type: Date,
    default: new Date(), // 현재 날짜를 기본 값으로 지정
  },
});

module.exports = mongoose.model('Post', Post); // 파라미터: 스키마이름, 스키마객체
// 데이터베이스는 스키마 이름을 정해 주면 이 이름의 복수 형태로 데이터 베이스 스키마 생성
// post => posts, BookInfo => bookinfos
// 커스텀 생성 시: mongoose.model('Post', Post, 'custom_posts');