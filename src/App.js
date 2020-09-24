import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import useForm from './hooks/useForm'
import schema from './config/schema'
import Field from './components/Field'
import Form from './components/Form'
import Submit from './components/Submit'

function App() {
  const [result, setResult] = useState('')
  const onSubmit = isValid => {
    setResult(isValid ? 'Your data is valid' : 'Your data is not valid')
  }
  const { handleChange, handleSubmit } = useForm({
    schema,
    onSubmit,
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main>
        <Form onSubmit={handleSubmit}>
          <Field name="name" onChange={handleChange} />
          <Field name="email" onChange={handleChange} />
          <Field name="url" onChange={handleChange} />
          <Field name="phone" onChange={handleChange} />
          <Submit />
        </Form>
      </main>
      <h2>{result}</h2>
    </div>
  )
}

export default App
