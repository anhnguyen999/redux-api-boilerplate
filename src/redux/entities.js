import Immutable from 'immutable';

const entitiesInitialState = Immutable.fromJS({});
export default function entities(state = entitiesInitialState, action) {
  const { payload } = action;
  if (payload && payload.entities) {
    return state.mergeDeep(payload.entities);
  }
  return state;
}

export function selectEntities(state) {
  return state.get('entities').toJS();
}

export function selectPost(state, postId) {
  return state.get('entities').get('post').get(postId).toJS() || {};
}
