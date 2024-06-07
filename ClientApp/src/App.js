import React, { StrictMode, useState, useEffect } from 'react'
import Button from './components/Button'
import Input from './components/Input'
import EmployeesList from './components/EmployeesList'
import Search from './components/Search'
import './styles/App.css'

export default function () {
  const [employees, setEmployees] = useState([])
  const [filteredEmployees, setFilteredEmployees] = useState([])
  const [add, setAdd] = useState('')
  const [newName, setNewName] = useState('')
  const [newValue, setNewValue] = useState('')
  const [update, setUpdate] = useState('')
  const [updateValue, setUpdateValue] = useState('')
  const [employeeToUpdate, setEmployeeToUpdate] = useState(null) // Add state for employee to update

  async function fetchEmployees() {
    const data = await getEmployees()
    setEmployees(data)
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  async function getEmployees() {
    return fetch('/employees').then((response) => response.json())
  }

  async function createEmployee(name, value) {
    await fetch('/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, value: value }),
    })
    fetchEmployees()
  }

  async function updateEmployee(name, value) {
    await fetch('/employees', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        value: value,
      }),
    })
    fetchEmployees()
  }
  const handleCreate = () => {
    createEmployee(newName, newValue)
    setNewName('')
    setNewValue('')
  }

  const handleUpdate = () => {
    if (employeeToUpdate) {
      updateEmployee(employeeToUpdate.name, updateValue)
      setUpdateValue('')
      setEmployeeToUpdate(null)
    }
  }

  const handleEmployeeUpdateClick = (employee) => {
    setEmployeeToUpdate(employee)
    setUpdateValue(employee.value)
  }

  const handleSearch = (searchTerm) => {
    const filtered = searchTerm
      ? employees.filter((employee) =>
          employee.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : employees
    setFilteredEmployees(filtered)
  }

  useEffect(() => {
    handleSearch('')
  }, [employees])

  return (
    <StrictMode>
      <div className="background">
        <>
          <h1 id="title">Employee Management</h1>
          <button
            id="btn_add"
            className="btn_toggle"
            onClick={(e) => setAdd(!add)}
          >
            Toggle Add
          </button>
          {add ? (
            <div id="div_add" className="div_dialogue">
              <Input
                placeholder={'Enter new name here...'}
                value={newName}
                onInputChange={(e) => setNewName(e.target.value)}
              />
              <Input
                placeholder={'Enter new number here...'}
                value={newValue}
                onInputChange={(e) => setNewValue(e.target.value)}
              />
              <button className="btn_submit" onClick={handleCreate}>
                Save
              </button>
            </div>
          ) : (
            <div></div>
          )}
          <button
            id="btn_update"
            className="btn_toggle"
            onClick={(e) => setUpdate(!update)}
          >
            Toggle Update
          </button>
          {employeeToUpdate && update ? (
            <div id="div_update" className="div_dialogue">
              <p className="label">{employeeToUpdate.name}</p>
              <Input
                placeholder={'Enter the number to update...'}
                value={updateValue}
                onInputChange={(e) => setUpdateValue(e.target.value)}
              />
              <button className="btn_submit" onClick={handleUpdate}>
                Update
              </button>
            </div>
          ) : (
            <div></div>
          )}
          <div className="table_container">
            <Search onSearch={handleSearch} />
            <EmployeesList
              id="main"
              employees={filteredEmployees}
              columns={['Name', 'Number']}
              update={update}
              onUpdateClick={handleEmployeeUpdateClick}
            />
          </div>
        </>
      </div>
    </StrictMode>
  )
}
