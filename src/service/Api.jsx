// import axios from "axios";
// import React from "react";

// const API_BASE_URL = "http://localhost:8890";

// const [name, setName] = React.useState('');
// const [gender, setGender] = React.useState('');
// const [role, setRole] = React.useState('');
// const [numberEmployee, setNumberEmployee] = React.useState('');
// const [email, setEmail] = React.useState('');

// export const fetchData = async () => {
//     try{
//       const response = await axios.get(`${API_BASE_URL}/api/v1/employee/get-all`)
//       return response.data;
//     } catch(error){
//       console.log(error);
//     }
// };

// export const handleSubmit = (event, employeeData, form, setVisible, toast, fetchData) => {
//   event.preventDefault();

//   employeeData = {
//     name,
//     gender,
//     role,
//     numberEmployee,
//     email
//   }

//   axios.post('http://localhost:8890/api/v1/employee/create', employeeData)
//     .then((response) => {
//       console.log(response);
//       form.resetFields();
//       setVisible(false);
//       toast.success("New record has been added!", {
//         position: "top-center",
//         autoClose: 2000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//       fetchData();
//     })
//     .catch((error) => {
//       console.log(error);
//       notification.error({
//         message: "error",
//         description: "An error occurred while pushing data, check the server side."
//       });
//     });
// };
