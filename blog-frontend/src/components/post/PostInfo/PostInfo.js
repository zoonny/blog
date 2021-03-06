import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './PostInfo.scss';

import moment from 'moment';

const cx = classNames.bind(styles);

const PostInfo = ({ publishedDate, title, tags }) => (
  <div className={cx('post-info')}>
    <div className={cx('info')}>
      <h1>{title}</h1>
      <div className={cx('tags')}>
        {// tag가 존재할때만 map을 실행
        tags
          && tags.map(tag => (
            <Link key={tag} to={`/tag/${tag}`}>
              #
              {tag}
            </Link>
          ))}
      </div>
      <div className={cx('date')}>{moment(publishedDate).format('llll')}</div>
    </div>
  </div>
);

export default PostInfo;
