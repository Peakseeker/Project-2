import { useEffect, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";

import BoardList from "./BoardList";

import {
  getListsByBoard,
  createList,
} from "../../services/api/listApi";

import {
  getCardsByList,
  moveCard,
} from "../../services/api/cardApi";

const KanbanBoard = ({ boardId }) => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showAddList, setShowAddList] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");
  const [creatingList, setCreatingList] = useState(false);

  // Fetch Lists + Cards
  const fetchBoardData = async () => {
    try {
      setLoading(true);
      setError("");

      const listsResponse = await getListsByBoard(boardId);
      const boardLists = listsResponse.data || listsResponse;

      const listsWithCards = await Promise.all(
        boardLists.map(async (list) => {
          const cardsResponse = await getCardsByList(list._id);
          const cards = cardsResponse.data || cardsResponse;

          return {
            ...list,
            cards,
          };
        })
      );

      setLists(listsWithCards);
    } catch (error) {
      console.error("Error fetching board:", error);
      setError("Failed to load board data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (boardId) {
      fetchBoardData();
    }
  }, [boardId]);

  // Create List
  const handleCreateList = async () => {
    if (!newListTitle.trim()) return;

    try {
      setCreatingList(true);

      await createList({
        title: newListTitle.trim(),
        board: boardId,
      });

      setNewListTitle("");
      setShowAddList(false);

      fetchBoardData();
    } catch (error) {
      console.error("Error creating list:", error);
      alert("Failed to create list");
    } finally {
      setCreatingList(false);
    }
  };

  // Drag & Drop Handler
  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    // Dropped outside board
    if (!destination) return;

    // No position change
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceListId = source.droppableId;
    const destinationListId = destination.droppableId;

    // Optimistic UI Update
    const updatedLists = [...lists];

    const sourceList = updatedLists.find(
      (list) => list._id === sourceListId
    );

    const destinationList = updatedLists.find(
      (list) => list._id === destinationListId
    );

    if (!sourceList || !destinationList) return;

    // Remove card from source
    const [movedCard] = sourceList.cards.splice(
      source.index,
      1
    );

    // Add card to destination
    destinationList.cards.splice(
      destination.index,
      0,
      movedCard
    );

    setLists(updatedLists);

    try {
      // Update Backend
      await moveCard(draggableId, {
        listId: destinationListId,
        position: destination.index,
      });
    } catch (error) {
      console.error("Error moving card:", error);

      // Restore correct state if API fails
      fetchBoardData();
      alert("Failed to move card");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-gray-500">
          Loading board...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="w-full overflow-x-auto">
        <div className="flex gap-4 p-4 min-h-[70vh] items-start">

          {/* Lists */}
          {lists.map((list) => (
            <BoardList
              key={list._id}
              list={list}
              cards={list.cards || []}
              refreshBoard={fetchBoardData}
            />
          ))}

          {/* Add New List */}
          <div className="w-72 min-w-72">
            {showAddList ? (
              <div className="bg-gray-100 rounded-xl p-3">
                <input
                  type="text"
                  value={newListTitle}
                  onChange={(e) =>
                    setNewListTitle(e.target.value)
                  }
                  placeholder="Enter list title..."
                  autoFocus
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCreateList();
                    }

                    if (e.key === "Escape") {
                      setShowAddList(false);
                      setNewListTitle("");
                    }
                  }}
                />

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={handleCreateList}
                    disabled={creatingList}
                    className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50"
                  >
                    {creatingList
                      ? "Creating..."
                      : "Add List"}
                  </button>

                  <button
                    onClick={() => {
                      setShowAddList(false);
                      setNewListTitle("");
                    }}
                    className="text-gray-500 px-2 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowAddList(true)}
                className="w-full bg-gray-100 hover:bg-gray-200 rounded-xl p-3 text-left text-gray-600 font-medium transition"
              >
                + Add another list
              </button>
            )}
          </div>

        </div>
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;