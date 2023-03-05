import axios from "axios";

const API_BASE_URL = "http://localhost:8890";
const headers ={
    'X-Client-Port': '3001'
}

export const getAllDataEmployee = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/employee/get-all`, { headers });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteEmployee = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/api/v1/employee/delete/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createEmployee = async (employeeData) => {
  try {
    await axios.post(`${API_BASE_URL}/api/v1/employee/create`, employeeData);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
