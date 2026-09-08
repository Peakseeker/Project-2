const API_URL = "http://localhost:5000/api";

// ==============================
// LIST APIs
// ==============================

export const getListsByBoard = async (boardId) => {
  const response = await fetch(
    `${API_URL}/lists/board/${boardId}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch lists");
  }

  return data;
};

export const createList = async (listData) => {
  const response = await fetch(`${API_URL}/lists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(listData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create list");
  }

  return data;
};

// ==============================
// CARD APIs
// ==============================

export const getCardsByList = async (listId) => {
  const response = await fetch(
    `${API_URL}/cards/list/${listId}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch cards");
  }

  return data;
};

export const createCard = async (cardData) => {
  const response = await fetch(`${API_URL}/cards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cardData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create card");
  }

  return data;
};

export const moveCard = async (
  cardId,
  destinationListId,
  destinationIndex
) => {
  const response = await fetch(
    `${API_URL}/cards/${cardId}/move`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        destinationListId,
        destinationIndex,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to move card");
  }

  return data;
};