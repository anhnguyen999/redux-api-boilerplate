/**
 * Constants are important - they describe what type of action is performed
 * within your app. Combined with the DevTools/logger, you can see how state and subsequently
 * your UI is being affected.
 */
import keyMirror from 'keyMirror';

export default keyMirror({
  GET_DEVICES_REQUEST: null,
  GET_DEVICES_SUCCESS: null,
  GET_DEVICES_FAILURE: null,
});
