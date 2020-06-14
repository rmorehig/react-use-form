import { useCallback, useMemo, useRef, useEffect } from 'react'

function useForm({ schema = {}, onSubmit = () => {} }) {
  const valuesRef = useRef({})
  const validateRef = useRef({})
  const requiredRef = useRef({})
  const errorRef = useRef({})

  useEffect(() => {
    Object.keys(schema).forEach(
      property => (valuesRef.current[property] = schema[property].initialValue)
    )
  }, [schema])

  useEffect(() => {
    Object.keys(schema).forEach(property => {
      if (schema[property].validate) {
        return (validateRef.current[property] = schema[property].validate)
      }
    })
  }, [schema])

  useEffect(() => {
    Object.keys(schema).forEach(property => {
      if (schema[property].required) {
        return (requiredRef.current[property] = schema[property].required)
      }
    })
  }, [schema])

  const handleChange = useCallback(
    event => {
      event.preventDefault()
      const { name, value } = event.target
      valuesRef.current[name] = value
    },
    [valuesRef]
  )

  const handleSubmit = useCallback(
    event => {
      event.preventDefault()
      const isRequired = Object.keys(requiredRef.current).every(
        property => !!valuesRef.current[property]
      )
      const isValidated = Object.keys(validateRef.current).every(property =>
        validateRef.current[property](valuesRef.current[property])
      )
      if (isRequired && isValidated) {
        onSubmit(valuesRef.current)
      }
    },
    [valuesRef, onSubmit]
  )

  const values = useMemo(() => valuesRef.current, [valuesRef])

  return { values, handleChange, handleSubmit }
}

export default useForm
