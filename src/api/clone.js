const clone = {
  deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  },
  transObjectToList(obj) {
    if(obj === null){
      return [];
    }
    else if(obj.length === undefined){
      return [obj];
    }
    else{
      return obj;
    }
  }
};
export { clone }

