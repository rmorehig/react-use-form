export function getSchemaProperty(property, schema) {
  const result = {}
  Object.keys(schema).forEach(key => {
    if (typeof schema[key][property] !== 'undefined') {
      return (result[key] = schema[key][property])
    }
  })
  return result
}

function checkRequiredValues(required, values) {
  return Object.keys(required).every(key => !!values[key])
}

function validateValues(validations, values) {
  Object.keys(validations).every(property =>
    validations[property](values[property])
  )
}

export function checkForm({ required, validations, values }) {
  const areRequiredValid = checkRequiredValues(required, values)
  const areValidationsValid = validateValues(validations, values)
  const isValid = areRequiredValid && areValidationsValid
  return isValid
}
