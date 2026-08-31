import axios from "axios";

const API_URL = "http://localhost:5000/api/cards";

export const getCardsByList = async (listId) => {
  const response = await axios.get(`${API_URL}/list/${listId}`);
  return response.data;
};

export const createCard = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const updateCard = async (cardId, data) => {
  const response = await axios.patch(`${API_URL}/${cardId}`, data);
  return response.data;
};

export const deleteCard = async (cardId) => {
  const response = await axios.delete(`${API_URL}/${cardId}`);
  return response.data;
};

export const moveCard = async (cardId, data) => {
  const response = await axios.patch(
    `${API_URL}/${cardId}/move`,
    data
  );

  return response.data;
};

export const assignMember = async (cardId, data) => {
  const response = await axios.patch(
    `${API_URL}/${cardId}/assign`,
    data
  );

  return response.data;
};