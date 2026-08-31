import { useState } from "react";
import { Droppable } from "@hello-pangea/dnd";

import Card from "./Card";

import {
  createCard,
  deleteCard,
} from "../../services/api/cardApi";

import { deleteList } from "../../services/api/listApi";

const BoardList = ({ list, cards, refreshBoard }) => {
  const [newCardTitle, setNewCardTitle] = useState("");
  const [showAddCard, setShowAddCard] = useState(false);
  const [creatingCard, setCreatingCard] = useState(false);

  const handleCreateCard = async () => {
    if (!newCardTitle.trim()) return;

    try {
      setCreatingCard(true);

      await createCard({
        title: newCardTitle.trim(),
        list: list._id,
      });

      setNewCardTitle("");
      setShowAddCard(false);

      refreshBoard();
    } catch (error) {
      console.error("Error creating card:", error);
      alert("Failed to create card");
    } finally {
      setCreatingCard(false);
    }
  };

  const handleDeleteList = async () => {
    const confirmDelete = window.confirm(
      `Delete "${list.title}" list?`
    );

    if (!confirmDelete) return;

    try {
      await deleteList(list._id);
      refreshBoard();
    } catch (error) {
      console.error("Error deleting list:", error);
      alert("Failed to delete list");
    }
  };

  const handleDeleteCard = async (cardId) => {
    try {
      await deleteCard(cardId);
      refreshBoard();
    } catch (error) {
      console.error("Error deleting card:", error);
      alert("Failed to delete card");
    }
  };

  return (
    <div className="w-72 min-w-72 bg-gray-100 rounded-xl p-3 flex flex-col max-h-[75vh]">

      {/* List Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">
          {list.title}
        </h3>

        <button
          onClick={handleDeleteList}
          className="text-red-500 hover:text-red-700 text-sm"
          title="Delete List"
        >
          ✕
        </button>
      </div>

      {/* Droppable Cards Area */}
      <Droppable droppableId={list._id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex flex-col gap-3 overflow-y-auto min-h-[100px] transition ${
              snapshot.isDraggingOver
                ? "bg-blue-50 rounded-lg"
                : ""
            }`}
          >
            {cards.map((card, index) => (
              <Card
                key={card._id}
                card={card}
                index={index}
                onDelete={handleDeleteCard}
              />
            ))}

            {provided.placeholder}

            {cards.length === 0 && !snapshot.isDraggingOver && (
              <p className="text-sm text-gray-400 text-center py-4">
                Drop cards here
              </p>
            )}
          </div>
        )}
      </Droppable>

      {/* Add Card */}
      {showAddCard ? (
        <div className="mt-3">
          <input
            type="text"
            value={newCardTitle}
            onChange={(e) =>
              setNewCardTitle(e.target.value)
            }
            placeholder="Enter card title..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCreateCard();
              }

              if (e.key === "Escape") {
                setShowAddCard(false);
                setNewCardTitle("");
              }
            }}
          />

          <div className="flex gap-2 mt-2">
            <button
              onClick={handleCreateCard}
              disabled={creatingCard}
              className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50"
            >
              {creatingCard ? "Adding..." : "Add"}
            </button>

            <button
              onClick={() => {
                setShowAddCard(false);
                setNewCardTitle("");
              }}
              className="text-gray-500 px-2"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowAddCard(true)}
          className="mt-3 w-full text-left text-sm text-gray-500 hover:bg-gray-200 rounded-lg px-3 py-2 transition"
        >
          + Add Card
        </button>
      )}
    </div>
  );
};

export default BoardList;