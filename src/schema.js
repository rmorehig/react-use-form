export default {
  name: {
    initialValue: '',
    required: true,
    requiredMessage: 'Name is required',
    validate: value => !value.includes('orange'),
    validateMessage: 'Invalid name'
  },
  email: {
    initialValue: '',
    validate: () => true,
    validateMessage: 'Invalid email'
  },
  url: {
    initialValue: '',
    validate: () => true
  },
  phone: {
    initialValue: '',
    errorMessage: 'Invalid phone'
  }
}
