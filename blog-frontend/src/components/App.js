import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ListPage, PostPage, EditorPage, NotFoundPage } from 'pages';
import BaseContainer from 'containers/common/BaseContainer';

const App = () => {
  console.log(`process.env.NODE_ENV=${process.env.NODE_ENV}`);
  console.log(`process.env.NODE_PATH=${process.env.NODE_PATH}`);
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ListPage} />
        <Route path="/page/:page" component={ListPage} />
        <Route path="/tag/:tag/:page?" component={ListPage} />
        <Route path="/post/:id" component={PostPage} />
        <Route path="/editor" component={EditorPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <BaseContainer />
    </div>
  );
};

export default App;
