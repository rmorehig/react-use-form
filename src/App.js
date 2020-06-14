import React from 'react'
import logo from './logo.svg'
import './App.css'
import useForm from './useForm'
import styles from './styles'
import schema from './schema'

function App() {
  const onSubmit = values => {
    alert(JSON.stringify(values))
  }
  const { handleChange, handleSubmit } = useForm({
    schema,
    onSubmit
  })

  console.log('rendered')
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
            onChange={handleChange}
            placeholder="Enter your name"
            style={styles.input}
          />

          <input
            name="email"
            onChange={handleChange}
            placeholder="Enter your email"
            style={styles.input}
          />

          <input
            name="url"
            onChange={handleChange}
            placeholder="Enter your URL"
            style={styles.input}
          />

          <input
            name="phone"
            placeholder="Enter your phone"
            onChange={handleChange}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Submit
          </button>
        </form>
      </main>
    </div>
  )
}

export default App
