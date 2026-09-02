import api from "./axios";

//create a new card
export const createCard = (data) => {
  return api.post("/cards", data);
};
//get all cards by list id
export const getCardsByList = (listId) => {
  return api.get(`/cards/list/${listId}`);
};
//get all cards by board id
export const getCardById = (cardId) => {
  return api.get(`/cards/${cardId}`);
};
//update a card by id
export const updateCard = (cardId, data) => {
  return api.patch(`/cards/${cardId}`, data);
};
//delete a card by id
export const deleteCard = (cardId) => {
  return api.delete(`/cards/${cardId}`);
};
//move a card to another list
export const moveCard = (cardId, data) => {
  return api.patch(`/cards/${cardId}/move`, data);
};
//assign a member to a card
export const assignMember = (cardId, data) => {
  return api.patch(`/cards/${cardId}/assign`, data);
};