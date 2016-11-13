const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const CANCEL = 'CANCEL';

export function createObjectType(base) {
  const obj = {};
  [REQUEST, SUCCESS, FAILURE, CANCEL]
    .forEach(type => { obj[type] = `${base}:${type}`; });
  return obj;
};

export function createArrayType(base) {
  return [REQUEST, SUCCESS, FAILURE, CANCEL]
    .map(type => `${base}:${type}`);
};
