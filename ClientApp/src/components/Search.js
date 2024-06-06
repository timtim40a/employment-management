import React, { useState } from 'react'

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = (event) => {
    setSearchTerm(event.target.value)
    onSearch(event.target.value) // Pass the search query to the parent component
  }

  return (
    <input
      type="text"
      placeholder="Search employees..."
      value={searchTerm}
      onChange={handleChange}
    />
  )
}

export default Search
