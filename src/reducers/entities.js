import Immutable from 'immutable';

function posts(state = Immutable.Map({}), action) {
  const { payload } = action;
  if (payload && payload.entities && payload.entities.post) {
    return state.merge(payload.entities.post);
  }
}

export default function entities(state = {}, action) {
  return {
    posts: posts(state.posts, action),
  };
}
