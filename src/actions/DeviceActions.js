import Constant from '../constants/constant.js';
import { CALL_API, getJSON } from 'redux-api-middleware';
import { DeviceSchema } from '../schemas/entities.js';
import { normalize, arrayOf } from 'normalizr';

export function getDevices() {
  return {
    [CALL_API]: {
      endpoint: 'http://localhost:8080/api/devices',
      method: 'GET',
      types: [
        Constant.ActionTypes.GET_DEVICES_REQUEST,
        {
          type: Constant.ActionTypes.GET_DEVICES_SUCCESS,
          payload: (action, state, res) => {
            return getJSON(res)
              .then(json => normalize(json, arrayOf(DeviceSchema)));
          }
        },
        Constant.ActionTypes.GET_DEVICES_FAILURE,
      ]
    }
  };
}
