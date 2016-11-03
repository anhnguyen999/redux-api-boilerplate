const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

export default function createRequestType(base) {
  const obj = {};
  [REQUEST, SUCCESS, FAILURE].forEach(type => {
    obj[type] = `${base}_${type}`;
  });
  return obj;
};
