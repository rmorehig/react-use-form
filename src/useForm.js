import { useEffect, useReducer, useState } from 'react'

const reducer = (state, { payload: { field, value, error }, type }) => {
  switch (type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        values: { ...state.values, [field]: value },
      }
    case 'VALIDATE_FIELD':
      return {
        ...state,
        errors: { ...state.errors, [field]: error },
      }
    case 'TOUCH_FIELD':
      return {
        ...state,
        touched: { ...state.touched, [field]: true },
      }
    default:
      return state
  }
}

const useForm = ({
  initialValues = {},
  validation = {},
  onSubmit = () => {},
}) => {
  const [isValid, setIsValid] = useState(false)
  const [state, dispatch] = useReducer(reducer, {
    values: initialValues,
    errors: {},
    touched: {},
  })

  const { values, errors } = state

  useEffect(() => {
    const validateField = (field) =>
      validation[field]?.required
        ? !!values[field]
        : validation[field]?.validate
        ? validation[field]?.validate(values[field])
        : true
    Object.keys(values).forEach((name) => {
      dispatch({
        type: 'VALIDATE_FIELD',
        payload: {
          field: name,
          error:
            !validateField(name) &&
            (validation[name].message || `Invalid ${name}`),
        },
      })
    })
  }, [values, validation])

  useEffect(() => {
    setIsValid(!Object.keys(errors).find((field) => errors[field]))
  }, [errors])

  const handleChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    dispatch({
      type: 'UPDATE_FIELD',
      payload: {
        field: name,
        value: value,
      },
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    return onSubmit(values)
  }

  return {
    values,
    handleChange,
    handleSubmit,
    errors,
    isValid,
  }
}

export default useForm
