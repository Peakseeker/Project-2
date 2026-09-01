import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import BoardList from "./BoardList";

import {
  getListsByBoard,
  getCardsByList,
  moveCard,
} from "../../services/api/kanbanApi";

const KanbanBoard = ({ boardId }) => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==============================
  // FETCH BOARD DATA
  // ==============================
  useEffect(() => {
    if (!boardId) return;

    fetchBoardData();
  }, [boardId]);

  const fetchBoardData = async () => {
    try {
      setLoading(true);

      // Fetch lists
      const listsResponse = await getListsByBoard(boardId);

      const fetchedLists = listsResponse.data || [];

      // Fetch cards for every list
      const listsWithCards = await Promise.all(
        fetchedLists.map(async (list) => {
          const cardsResponse = await getCardsByList(list._id);

          return {
            ...list,
            cards: cardsResponse.data || [],
          };
        })
      );

      setLists(listsWithCards);
    } catch (error) {
      console.error("Failed to fetch board:", error);
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // DRAG END
  // ==============================
  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    // Dropped outside board
    if (!destination) return;

    // Same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Save previous state for rollback
    const previousLists = structuredClone(lists);

    // Optimistic UI Update
    const updatedLists = [...lists];

    const sourceListIndex = updatedLists.findIndex(
      (list) => list._id === source.droppableId
    );

    const destinationListIndex = updatedLists.findIndex(
      (list) => list._id === destination.droppableId
    );

    const sourceCards = [...updatedLists[sourceListIndex].cards];
    const [movedCard] = sourceCards.splice(source.index, 1);

    // Same list
    if (sourceListIndex === destinationListIndex) {
      sourceCards.splice(destination.index, 0, movedCard);

      updatedLists[sourceListIndex] = {
        ...updatedLists[sourceListIndex],
        cards: sourceCards,
      };
    } else {
      const destinationCards = [
        ...updatedLists[destinationListIndex].cards,
      ];

      destinationCards.splice(destination.index, 0, movedCard);

      updatedLists[sourceListIndex] = {
        ...updatedLists[sourceListIndex],
        cards: sourceCards,
      };

      updatedLists[destinationListIndex] = {
        ...updatedLists[destinationListIndex],
        cards: destinationCards,
      };
    }

    // Update UI immediately
    setLists(updatedLists);

    try {
      // Update backend
      await moveCard(
        draggableId,
        destination.droppableId,
        destination.index
      );
    } catch (error) {
      console.error("Failed to move card:", error);

      // Rollback if API fails
      setLists(previousLists);
    }
  };

  if (loading) {
    return <div>Loading board...</div>;
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto p-4">
        {lists.map((list) => (
          <Droppable
            key={list._id}
            droppableId={list._id}
          >
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <BoardList list={list} />

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;