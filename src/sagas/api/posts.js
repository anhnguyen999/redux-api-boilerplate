import apiRequest from './apiRequest.js';
import { GET_POSTS } from '../../actions/redditActions.js';
import { PostSchema } from '../../schemas/entities.js';
import { arrayOf, normalize } from 'normalizr';

export function* getPosts(action) {
  const { schema, meta: { subreddit }} = action;
  const res = yield apiRequest({
    endpoint: `http://www.reddit.com/r/${subreddit}.json`,
    method: 'GET',
    transform: json => {
      const posts = json.data.children.map(child => child.data);
      const normalized = normalize(posts, arrayOf(PostSchema));
      return normalized;
    },
    meta: { subreddit },
    types: [GET_POSTS.SUCCESS, GET_POSTS.FAILURE]
  });
}
