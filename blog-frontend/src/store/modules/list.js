import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';

// action types
const GET_POST_LIST = 'list/GET_POST_LIST';

// action creators
export const getPostList = createAction(GET_POST_LIST, api.getPostList, meta => meta);

// initial state
const initialState = Map({
  posts: List(),
  lastPage: null
});

// reducer
export default handleActions(
  {
    ...pender({
      type: GET_POST_LIST,
      onSuccess: (state, action) => {
        const { data: posts } = action.payload;
        console.table(posts);
        let temp = action.payload.headers['Last-Page'];
        const lastPage = temp ? temp : '5';
        if (!lastPage) {
          console.error(action.payload.headers);
        }
        return state.set('posts', fromJS(posts)).set('lastPage', parseInt(lastPage, 10));
      }
    })
  },
  initialState
);
