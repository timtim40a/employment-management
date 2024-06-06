import React from 'react'
import { StrictMode } from 'react'
import './../styles/EmployeesList.css'
import Button from './Button'

// const StyledList = styled.ul`
//   list-style-type: none;
//   margin: 0 auto;
//   padding: 0;
// `

// const EmployeesList = ({ employees }) => {
//   return (
//     // <StyledList>
//     <div>
//       {employees.map((employee, index) => (
//         <li key={index}>
//           {employee.name}: {employee.value}
//         </li>
//       ))}
//     </div>
//     // </StyledList>
//   )
// }

const EmployeesList = ({
  id = 'main',
  employees,
  columns,
  update = false,
  onUpdateClick = (employee) => console.log(employee.name),
}) => {
  return (
    <StrictMode>
      <table id={id + '_table'}>
        <thead>
          <tr>
            {columns.map((columnName, index) => (
              <th className={id + '_headings'} key={index + 'column'}>
                {columnName}
              </th>
            ))}
            <th className={id + '_headings'} key={'buttons_column'}></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr className={id + '_rows'} key={index + 'employee'}>
              <td className={id + '_names'} key={index + 'name'}>
                {employee.name}
              </td>
              <td className={id + '_numbers'} key={index + 'number'}>
                {employee.value}
              </td>
              {update ? (
                <td>
                  <Button
                    className={id + '_upd_btn'}
                    text="Update"
                    onClick={() => onUpdateClick(employee)}
                  />
                </td>
              ) : (
                <></>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </StrictMode>
  )
}

export default EmployeesList
