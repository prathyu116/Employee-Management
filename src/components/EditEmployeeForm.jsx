import React, { useState } from "react";
import "./EditEmployeeForm.css";

const EditEmployeeForm = ({ employee, editEmployee, stopEditing }) => {
  const [updatedEmployee, setUpdatedEmployee] = useState(employee);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editEmployee(employee.id, updatedEmployee);
    stopEditing();
  };

  return (
    <div className="form-container">
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <label>
          ID:
          <input type="text" name="id" value={updatedEmployee.id} readOnly />
        </label>
        <br />
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={updatedEmployee.username}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={updatedEmployee.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Status:
          <select
            name="status"
            value={updatedEmployee.status}
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>
        <br />
        <button type="submit">Update Employee</button>
        <button type="button" className="cancel-btn" onClick={stopEditing}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditEmployeeForm;
