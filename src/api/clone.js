const clone = {
  deepClone(obj) {
    const _obj = JSON.stringify(obj);
    return JSON.parse(_obj);
  },

};
export { clone}

