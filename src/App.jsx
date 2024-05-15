import React, { useState, useEffect } from "react";
import AddEmployeeForm from "./components/AddEmployeeForm";
import EmployeeList from "./components/EmployeeList";
import EditEmployeeForm from "./components/EditEmployeeForm";
import axios from "axios";
import "./App.css"
const App = () => {
  const [employees, setEmployees] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios
      .get("http://localhost:3001/employees")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees: ", error);
      });
  };

  const addEmployee = (employee) => {
    axios
      .post("http://localhost:3001/employees", employee)
      .then((response) => {
        setEmployees((prevEmployees) => [...prevEmployees, response.data]);
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error adding employee: ", error);
      });
  };

  const editEmployee = (id, updatedEmployee) => {
    axios
      .put(`http://localhost:3001/employees/${id}`, updatedEmployee)
      .then((response) => {
        setEmployees((prevEmployees) =>
          prevEmployees.map((employee) =>
            employee.id === id ? response.data : employee
          )
        );
        setIsEditing(false);
        setEditingEmployee(null);
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error editing employee: ", error);
      });
  };

  const deleteEmployee = (id) => {
    axios
      .delete(`http://localhost:3001/employees/${id}`)
      .then(() => {
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting employee: ", error);
      });
  };

  const startEditing = (employee) => {
    setIsEditing(true);
    setEditingEmployee(employee);
    setShowModal(true);
  };

  const stopEditing = () => {
    setIsEditing(false);
    setEditingEmployee(null);
    setShowModal(false);
  };

  const handleAddEmployeeClick = () => {
    setIsEditing(false); // Set to false to show AddEmployeeForm
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h1>Employee Management App</h1>
      <button onClick={handleAddEmployeeClick}>Add Employee</button>
      <EmployeeList
        employees={employees}
        deleteEmployee={deleteEmployee}
        startEditing={startEditing}
      />
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            {isEditing ? (
              <EditEmployeeForm
                employee={editingEmployee}
                editEmployee={editEmployee}
                stopEditing={stopEditing}
              />
            ) : (
              <AddEmployeeForm addEmployee={addEmployee} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
