import React from 'react'
import { StrictMode } from 'react'
// import styled from 'styled-components'
import './../styles/Button.css'

const Button = ({ onClick, text }) => {
  return (
    <StrictMode>
      <>
        <button onClick={onClick}>{text}</button>
      </>
    </StrictMode>
  )
}

export default Button
