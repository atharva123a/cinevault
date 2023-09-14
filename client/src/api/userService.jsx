import axios from 'axios';

const BASE_URL = 'http://localhost:8080/user'; // Replace with your API URL

// Function to send a POST request for user registration
const registerUser = async ({ email, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, {
      email: email,
      password: password
    });

    // Check if the request was successful
    if (response.data.success == true) {
      // Registration was successful, handle the response data
      console.log('Registration successful!');
      return { success: true, message: response.data.message }; // You can return data to the caller if needed
    }
  } catch (error) {
    console.log('Registration failed!');
    return { success: false, message: error.response.data.error };
  }
};

const loginUser = async ({ email, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email: email,
      password: password
    });

    // Check if the request was successful
    if (response.data.success == true) {
      // Registration was successful, handle the response data
      return {
        success: true,
        data: response.data.data,
        message: response.data.message
      };
    }

    // Check if the request was successful
    if (response.data.success == true) {
      // Registration was successful, handle the response data

      return {
        success: true,
        data: response.data.data,
        message: response.data.message
      };
    }
  } catch (error) {
    // Handle network errors or other exceptions
    return { success: false, message: error.response.data.error };
  }
};

const getAccessToken = async ({ refreshToken }) => {
  try {
    const response = await axios.post(`${BASE_URL}/access-token`, {
      refreshToken
    });
  } catch (error) {
    return { success: false, message: error.response.data.error };
  }
};

export default { registerUser, loginUser, getAccessToken };
