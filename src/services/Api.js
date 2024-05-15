import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const fetchEmployees = () => {
    return axios.get(`${BASE_URL}/employees`);
};

export const addEmployee = (employee) => {
    return axios.post(`${BASE_URL}/employees`, employee);
};

export const editEmployee = (id, updatedEmployee) => {
    return axios.put(`${BASE_URL}/employees/${id}`, updatedEmployee);
};

export const deleteEmployee = (id) => {
    return axios.delete(`${BASE_URL}/employees/${id}`);
};
