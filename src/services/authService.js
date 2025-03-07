import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const authService = {
  login: async (credentials) => {
    const response = await axios.get(`${API_URL}/users`, {
      params: { email: credentials.email }
    });
    const user = response.data[0];
    
    if (user && user.password === credentials.password) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    throw new Error('Invalid credentials');
  },

  register: async (userData) => {
    const response = await axios.post(`${API_URL}/users`, userData);
    const { password, ...userWithoutPassword } = response.data;
    return userWithoutPassword;
  }
};