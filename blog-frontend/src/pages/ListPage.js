import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import ListWrapper from 'components/list/ListWrapper';
import ListContainer from 'containers/list/ListContainer';
import { Helmet } from 'react-helmet';

const ListPage = ({ match }) => {
  // page의 기본 값을 1로 설정
  const { page = 1, tag } = match.params;

  // title 값을 page 값과 tag 값에 따라 동적으로 설정
  const title = (() => {
    let title = 'reactblog';
    if (tag) {
      title += ` ${tag}`;
    }
    if (page !== 1) {
      title += ` - ${page}`;
    }
    return title;
  })();

  return (
    <PageTemplate>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <ListWrapper>
        <ListContainer page={parseInt(page, 10)} tag={tag} />
      </ListWrapper>
    </PageTemplate>
  );
};

export default ListPage;
