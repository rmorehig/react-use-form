import { useReducer } from 'react'

const reducer = (state, { payload: { field, value, error }, type }) => {
  switch (type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        values: { ...state.values, [field]: value },
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

  const validateField = (value) => {}

  const handleChange = (event) => {
    event.preventDefault()
    dispatch({
      type: 'UPDATE_FIELD',
      payload: {
        field: event.target.name,
        value: event.target.value,
        error: validateField(event.target.value),
      },
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    alert(JSON.stringify(state.values))
  }

  return {
    values: state.values,
    handleChange,
    handleSubmit,
    errors: state.errors,
  }
}

export default useForm
