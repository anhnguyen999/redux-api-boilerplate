const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

export function createObjectType(base) {
  const obj = {};
  [REQUEST, SUCCESS, FAILURE]
    .forEach(type => { obj[type] = `${base}_${type}`; });
  return obj;
};

export function createArrayType(base) {
  return [REQUEST, SUCCESS, FAILURE]
    .map(type => `${base}_${type}`);
};
