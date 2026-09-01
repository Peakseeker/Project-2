import api from "./axios";

export const createCard = (data) => {
  return api.post("/cards", data);
};

export const getCardsByList = (listId) => {
  return api.get(`/cards/list/${listId}`);
};

export const getCardById = (cardId) => {
  return api.get(`/cards/${cardId}`);
};

export const updateCard = (cardId, data) => {
  return api.patch(`/cards/${cardId}`, data);
};

export const deleteCard = (cardId) => {
  return api.delete(`/cards/${cardId}`);
};

export const moveCard = (cardId, data) => {
  return api.patch(`/cards/${cardId}/move`, data);
};

export const assignMember = (cardId, data) => {
  return api.patch(`/cards/${cardId}/assign`, data);
};