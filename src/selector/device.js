export function getAllDevices(state) {
  if (!state.entities.devices) {
    return [];
  }
  return state.entities.devices
    .toArray()
    .map(obj => obj.toObject());
}
