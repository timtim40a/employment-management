import React from 'react'
import { StrictMode } from 'react'
import './../styles/Input.css'

const Input = ({ type = 'text', placeholder, onInputChange, value }) => {
  return (
    <StrictMode>
      <div id="input_wrapper">
        <input
          type={type}
          placeholder={placeholder}
          onChange={onInputChange}
          value={value}
        />
      </div>
    </StrictMode>
  )
}

export default Input
