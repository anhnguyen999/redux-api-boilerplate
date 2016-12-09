export function getPost(state, postId) {
  return state.entities.post[postId] || {};
}

function post(state = {}, action) {
  const { payload } = action;
  if (payload && payload.entities && payload.entities.post) {
    return Object.assign({}, state, payload.entities.post);
  }
  return state;
}

export default function entities(state = {}, action) {
  return {
    post: post(state.post, action),
  };
}
