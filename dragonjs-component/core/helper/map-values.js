export const mapValues = (obj, f) => Object
  .entries(obj)
  .map(([k, v]) => ({[k]: f(v)}))
  .reduce((acc, obj) => Object.assign(acc, obj));
