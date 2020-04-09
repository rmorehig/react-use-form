import React, { useRef, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import useForm from './useForm'

const styles = {
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '800px',
  },
  input: {
    borderWidth: 0,
    borderRadius: 3,
    fontFamily: 'inherit',
    margin: '1rem 0 1rem',
    padding: '0.5rem 1rem',
  },
  button: {
    borderWidth: 0,
    borderRadius: 3,
    backgroundColor: '#31C48D',
    color: 'white',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontWeight: 600,
    margin: '1rem 0 1rem',
    padding: '0.5rem 1rem',
    width: '100%',
  },
  error: {
    color: '#F98080',
  },
}

const initialValues = {
  name: '',
  email: '',
  url: '',
  phone: '',
}

const validation = {
  name: {
    required: true,
    validate: (value) => value,
    message: 'Invalid name',
  },
  email: {
    required: false,
    validate: (value) => value,
    message: 'Invalid email',
  },
  url: {
    required: false,
    validate: (value) => value,
  },
  phone: {
    required: true,
    message: 'Invalid phone',
  },
}

function App() {
  const onSubmit = (values) => {
    alert(JSON.stringify(values))
  }
  const { values, handleChange, handleSubmit, errors, isValid, refs } = useForm(
    {
      initialValues,
      onSubmit,
      validation,
    }
  )
  const { name, email, url, phone } = values

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>React useForm</p>
      </header>
      <main style={styles.main}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            ref={refs}
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Enter your name"
            style={styles.input}
          />
          <span style={styles.error}>{errors?.name}</span>
          <input
            ref={refs}
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter your email"
            style={styles.input}
          />
          <span style={styles.error}>{errors?.email}</span>
          <input
            name="url"
            value={url}
            onChange={handleChange}
            placeholder="Enter your URL"
            style={styles.input}
          />
          <span style={styles.error}>{errors?.url}</span>
          <input
            name="phone"
            placeholder="Enter your phone"
            value={phone}
            onChange={handleChange}
            style={styles.input}
          />
          <span style={styles.error}>{errors?.phone}</span>
          <button type="submit" style={styles.button} disabled={!isValid}>
            Submit
          </button>
        </form>
      </main>
    </div>
  )
}

export default App
