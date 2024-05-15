import React, { useState, useEffect } from "react";
import AddEmployeeForm from "./components/AddEmployeeForm";
import EmployeeList from "./components/EmployeeList";
import EditEmployeeForm from "./components/EditEmployeeForm";
import "./App.css"
import {
  fetchEmployees,
  addEmployee,
  editEmployee,
  deleteEmployee,
} from "./services/Api";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees: ", error);
      });
  }, []);

  const handleAddEmployee = (employee) => {
    addEmployee(employee)
      .then((response) => {
        setEmployees((prevEmployees) => [...prevEmployees, response.data]);
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error adding employee: ", error);
      });
  };

  const handleEditEmployee = (id, updatedEmployee) => {
    editEmployee(id, updatedEmployee)
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

  const handleDeleteEmployee = (id) => {
    deleteEmployee(id)
      .then(() => {
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting employee: ", error);
      });
  };

  const handleAddEmployeeClick = () => {
    setIsEditing(false);
    setShowModal(true);
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

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h1>Employee Management App</h1>
      <button onClick={handleAddEmployeeClick}>Add Employee</button>
      <EmployeeList
        employees={employees}
        deleteEmployee={handleDeleteEmployee}
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
                editEmployee={handleEditEmployee}
                stopEditing={stopEditing}
              />
            ) : (
              <AddEmployeeForm addEmployee={handleAddEmployee} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default App;
