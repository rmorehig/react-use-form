export default {
  name: {
    initialValue: '',
    required: true,
    requiredMessage: 'Name is required',
    validate: value => !value.includes('orange'),
    validateMessage: 'Invalid name',
    placeholder: 'Enter your name',
  },
  email: {
    initialValue: '',
    required: true,
    validateMessage: 'Invalid email',
    placeholder: 'Enter your email',
  },
  url: {
    initialValue: '',
    required: true,
    placeholder: 'Enter your URL',
  },
  phone: {
    initialValue: '',
    required: true,
    errorMessage: 'Invalid phone',
    placeholder: 'Enter your phone',
  },
}
