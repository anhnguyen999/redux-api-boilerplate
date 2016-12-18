import merge from 'lodash/merge';

export function getPost(state, postId) {
  return state.entities.post[postId] || {};
}

export default function entities(state = {}, action) {
  const { payload } = action;
  if (payload && payload.entities) {
    return merge({}, state, payload.entities);
  }
  return state;
}
