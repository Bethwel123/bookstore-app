import axios from 'axios';

const API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
const BASE_URL = 'https://www.googleapis.com/books/v1';

export const fetchBooks = async (query, startIndex = 0, maxResults = 40) => {
  try {
    const response = await axios.get(`${BASE_URL}/volumes`, {
      params: {
        q: query,
        startIndex,
        maxResults,
        key: API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const fetchBookById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/volumes/${id}`, {
      params: {
        key: API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching book details:', error);
    throw error;
  }
};

export const searchBooksByCategory = async (category) => {
  try {
    const response = await axios.get(`${BASE_URL}/volumes`, {
      params: {
        q: `subject:${category}`,
        key: API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching books by category:', error);
    throw error;
  }
};

export const fetchNewReleases = async () => {
  const currentYear = new Date().getFullYear();
  try {
    const response = await axios.get(`${BASE_URL}/volumes`, {
      params: {
        q: `year:${currentYear}`,
        orderBy: 'newest',
        key: API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching new releases:', error);
    throw error;
  }
};