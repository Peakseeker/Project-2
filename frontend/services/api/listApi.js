import api from "./axios";

export const createList = (data) => {
  return api.post("/lists", data);
};

export const getListsByBoard = (boardId) => {
  return api.get(`/lists/board/${boardId}`);
};

export const updateList = (listId, data) => {
  return api.patch(`/lists/${listId}`, data);
};

export const deleteList = (listId) => {
  return api.delete(`/lists/${listId}`);
};

export const moveList = (listId, data) => {
  return api.patch(`/lists/${listId}/move`, data);
};