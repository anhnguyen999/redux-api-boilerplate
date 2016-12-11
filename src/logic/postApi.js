import { createLogic } from 'redux-logic';
import fetch from 'isomorphic-fetch';
import { normalize, arrayOf } from 'normalizr';
import { GET_POSTS } from '../actions/redditActions';
import PostSchema from '../schemas/post';
import { getPostBySubreddit, getPostBySubredditMeta } from '../redux/postBySubreddit';

const shouldFetchPost = (state, subreddit) => {
  const posts = getPostBySubreddit(state, subreddit);
  const meta = getPostBySubredditMeta(state, subreddit);
  if (posts.length === 0) {
    return true;
  }
  return meta.didInvalidate;
};

const apiGetPost = createLogic({
  type: GET_POSTS.REQUEST,
  cancelType: GET_POSTS.CANCEL,
  latest: true,
  validate({ getState, action }, allow, reject) {
    const state = getState();
    const { meta: { subreddit } } = action;
    if (!shouldFetchPost(state, subreddit)) {
      reject();
      return;
    }
    allow(action);
  },
  process({ getState, action }, dispatch) {
    const { meta: { subreddit } } = action;
    fetch(`http://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then((json) => {
        const posts = json.data.children.map(child => child.data);
        const normalized = normalize(posts, arrayOf(PostSchema));
        dispatch({ type: GET_POSTS.SUCCESS, payload: normalized, meta: { subreddit } });
      })
      .catch(error => (
        dispatch({ type: GET_POSTS.FAILURE, payload: error.message, meta: { subreddit } })
      ));
  }
});

export default [
  apiGetPost
];
