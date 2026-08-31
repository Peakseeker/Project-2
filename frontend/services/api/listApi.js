import axios from "axios";

const API_URL = "http://localhost:5000/api/lists";

export const getListsByBoard = async (boardId) => {
  const response = await axios.get(`${API_URL}/board/${boardId}`);
  return response.data;
};

export const createList = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const updateList = async (listId, data) => {
  const response = await axios.patch(`${API_URL}/${listId}`, data);
  return response.data;
};

export const deleteList = async (listId) => {
  const response = await axios.delete(`${API_URL}/${listId}`);
  return response.data;
};