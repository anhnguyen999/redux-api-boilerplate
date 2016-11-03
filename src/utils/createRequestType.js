const SAGA = 'SAGA';
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

export default function createRequestType(base) {
  const obj = {};
  [SAGA, REQUEST, SUCCESS, FAILURE].forEach(type => {
    obj[type] = `${base}_${type}`;
  });
  return obj;
};
