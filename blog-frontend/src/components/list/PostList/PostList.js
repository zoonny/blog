import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './PostList.scss';
import moment from 'moment';
import removeMd from 'remove-markdown';

const cx = classNames.bind(styles);

const PostItem = ({
  title, body, publishedDate, tags, id
}) => {
  let index = 0;
  const tagList = tags
    && tags.map(tag => (
      <Link key={++index} to={`/tag/${tag}`}>
        #{tag}
      </Link>
    ));

  return (
    <div className={cx('post-item')}>
      <h2>
        <Link to={`/post/${id}`}>{title}</Link>
      </h2>
      <div className={cx('date')}>{moment(publishedDate).format('ll')}</div>
      <p>{removeMd(body)}</p>
      <div className={cx('tags')}>{tagList}</div>
    </div>
  );
};

const PostList = ({ posts }) => {
  const postList = posts.map((post) => {
    // console.table(post);

    const {
      _id, title, body, publishedDate, tags
    } = post.toJS();

    return (
      <PostItem
        key={_id}
        title={title}
        body={body}
        publishedDate={publishedDate}
        tags={tags}
        id={_id}
      />
    );
  });

  // console.table(postList);

  return <div className={cx('post-list')}>{postList}</div>;
};

export default PostList;
