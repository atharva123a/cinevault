import axios from 'axios';

const BASE_URL = 'http://localhost:8080/movie'; // Replace with your API URL

const getCreatedMovies = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BASE_URL}`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    };

    const response = await axios.request(config);

    // Check if the request was successful
    if (response.data.success == true) {
      return {
        success: true,
        data: response.data.data
      };
    }
  } catch (error) {
    return { success: false, message: error.response.data.error };
  }
};

const updateMovies = async (data) => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    let postData = JSON.stringify({
      name: data.name,
      rating: parseInt(data.rating),
      cast: data.cast.split(','),
      genre: data.genre,
      releaseDate: data.releaseDate
    });

    let config = {
      method: 'patch',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/${data.id}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      data: postData
    };

    const response = await axios.request(config);

    // Check if the request was successful
    if (response.data.success == true) {
      return {
        success: true,
        data: response.data.data
      };
    }
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};

const deleteMovie = async (id) => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/${id}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.request(config);

    // Check if the request was successful
    if (response.data.success == true) {
      return {
        success: true,
        message: 'Deleted movie successfully!'
      };
    }
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};

export default { getCreatedMovies, updateMovies, deleteMovie };
