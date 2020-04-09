import React, { useEffect, useReducer, useState, useRef } from 'react'

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
    case 'BLUR_FIELD':
      return {
        ...state,
        touched: { ...state.touched, [field]: false },
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
  let refs = {}

  refs = useRef(
    Object.keys(initialValues).forEach(
      (key) => (refs = { ...refs, [key]: React.createRef() })
    )
  )
  const { values, errors, touched } = state

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

  useEffect(() => {
    const { current } = refs

    const handleFocus = () => {
      console.log('input is focussed', current.name)
      dispatch({
        type: 'TOUCH_FIELD',
        payload: {
          field: current.name,
        },
      })
    }
    const handleBlur = () => {
      console.log('input is blurred', current.name)
      dispatch({
        type: 'BLUR_FIELD',
        payload: {
          field: current.name,
        },
      })
    }
    if (current) {
      current.addEventListener('focus', handleFocus)
      current.addEventListener('blur', handleBlur)
    }
    return () => {
      if (current) {
        current.removeEventListener('focus', handleFocus)
        current.removeEventListener('blur', handleBlur)
      }
    }
  }, [refs])

  return {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
    isValid,
    refs,
  }
}

export default useForm
