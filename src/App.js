import React from 'react'
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
    backgroundColor: 'green',
    color: 'white',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontWeight: 600,
    margin: '1rem 0 1rem',
    padding: '0.5rem 1rem',
    width: '100%',
  },
}

const initialValues = {
  name: '',
  email: '',
  url: '',
  phone: '',
}

function App() {
  const { values, handleChange, handleSubmit, errors } = useForm({
    initialValues,
  })
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
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Enter your name"
            style={styles.input}
          />
          {errors?.name}
          <input
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter your email"
            style={styles.input}
          />
          {errors?.email}
          <input
            name="url"
            value={url}
            onChange={handleChange}
            placeholder="Enter your URL"
            style={styles.input}
          />
          {errors?.url}
          <input
            name="phone"
            placeholder="Enter your phone"
            value={phone}
            onChange={handleChange}
            style={styles.input}
          />
          {errors?.phone}
          <button type="submit" style={styles.button}>
            Submit
          </button>
        </form>
      </main>
    </div>
  )
}

export default App
