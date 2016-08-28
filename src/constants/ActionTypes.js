/**
 * Constants are important - they describe what type of action is performed
 * within your app. Combined with the DevTools/logger, you can see how state and subsequently
 * your UI is being affected.
 */
import keyMirror from 'keyMirror';

export default keyMirror({
  SELECT_SUBREDDIT: null,
  INVALIDATE_SUBREDDIT: null,

  GET_POSTS_REQUEST: null,
  GET_POSTS_SUCCESS: null,
  GET_POSTS_FAILURE: null,
});
