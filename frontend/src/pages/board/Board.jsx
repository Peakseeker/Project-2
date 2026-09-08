import KanbanBoard from "../../components/kanban/KanbanBoard";

const Board = () => {
  const boardId = "YOUR_BOARD_ID";

  return (
    <div>
      <KanbanBoard boardId={boardId} />
    </div>
  );
};

export default Board;