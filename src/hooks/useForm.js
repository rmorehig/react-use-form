import { useCallback, useRef } from 'react'
import { getSchemaProperty, checkForm } from '../utils/form'

function useForm({ schema = {}, onSubmit = () => {} }) {
  const valuesRef = useRef(getSchemaProperty('initialValue', schema))
  const validateRef = useRef(getSchemaProperty('validate', schema))
  const requiredRef = useRef(getSchemaProperty('required', schema))

  const handleChange = useCallback(
    event => {
      const { name, value } = event.target
      valuesRef.current[name] = value
    },
    [valuesRef]
  )

  const handleSubmit = useCallback(
    event => {
      event.preventDefault()
      const isValid = checkForm({
        validations: validateRef.current,
        required: requiredRef.current,
        values: valuesRef.current,
      })
      onSubmit(isValid)
    },
    [valuesRef, onSubmit]
  )

  return { values: valuesRef.current, handleChange, handleSubmit }
}

export default useForm
