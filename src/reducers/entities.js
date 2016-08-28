import Immutable from 'immutable';

function devices(state = Immutable.Map({}), action) {
  const { payload } = action;
  if (payload && payload.entities && payload.entities.device) {
    return state.merge(payload.entities.device);
  }
}

export default function entities(state = {}, action) {
  return {
    devices: devices(state.devices, action),
  };
}
