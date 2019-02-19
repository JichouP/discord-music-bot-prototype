const mapToArray = (any: any) => (any instanceof Map ? Array.from(any) : any);

export default (any: any) => {
  var cache: any = [];
  return JSON.stringify(any, function(key, value) {
    if (typeof value === 'object' && value !== null) {
      if (cache.indexOf(value) !== -1) {
        // Circular reference found, discard key
        return;
      }
      // Store value in our collection
      cache.push(value);
    }
    return mapToArray(value);
  });
};
