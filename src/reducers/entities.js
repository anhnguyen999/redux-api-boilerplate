function posts(state = {}, action) {
  const { payload } = action;
  if (payload && payload.entities && payload.entities.post) {
    return Object.assign({}, state, payload.entities.post);
  }
  return state;
}

export default function entities(state = {}, action) {
  return {
    posts: posts(state.posts, action),
  };
}
