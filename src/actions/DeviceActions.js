import Constant from '../constants/constant.js';
import { CALL_API } from 'redux-api-middleware';

export function getDevices() {
  return {
    [CALL_API]: {
      endpoint: 'http://localhost:8080/api/devices',
      method: 'GET',
      types: [
        Constant.ActionTypes.GET_DEVICES_REQUEST,
        Constant.ActionTypes.GET_DEVICES_SUCCESS,
        Constant.ActionTypes.GET_DEVICES_FAILURE,
      ]
    }
  };
}
