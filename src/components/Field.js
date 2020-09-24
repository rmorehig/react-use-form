import React from 'react'
import schema from '../config/schema'

const Field = ({ name, onChange }) => {
  return (
    <label>
      {name}
      <input
        name={name}
        onChange={onChange}
        placeholder={schema[name]?.placeholder}
      />
    </label>
  )
}

export default Field
