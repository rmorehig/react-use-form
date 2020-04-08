import { useEffect, useReducer } from 'react'

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
    default:
      return state
  }
}

const useForm = ({ initialValues, validation }) => {
  const [state, dispatch] = useReducer(reducer, {
    values: initialValues,
    errors: {},
  })

  const { values, errors } = state

  useEffect(() => {
    const validateField = (field) => validation[field]?.validate(values[field])
    Object.keys(values).forEach((name) => {
      dispatch({
        type: 'VALIDATE_FIELD',
        payload: {
          field: name,
          error: !validateField(name) && validation[name]?.message,
        },
      })
    })
  }, [values, validation])

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
    alert(JSON.stringify(state.values))
  }

  return {
    values,
    handleChange,
    handleSubmit,
    errors,
  }
}

export default useForm
