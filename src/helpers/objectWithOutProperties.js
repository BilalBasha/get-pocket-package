const objectWithoutProperties = (object, properties) => {
  var obj = {}
  var keys = Object.keys(object)
  keys.forEach(function(key) {
    if (!~properties.indexOf(key)) {
      obj[key] = object[key]
    }
  })
  return obj;
}

export default objectWithoutProperties;