import { Draggable } from "react-beautiful-dnd";

const Card = ({ card, index }) => {
  const priorityStyles = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };

  return (
    <Draggable
      draggableId={card._id}
      index={index}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`rounded-lg border bg-white p-3 shadow-sm transition ${
            snapshot.isDragging
              ? "rotate-2 shadow-lg"
              : "hover:shadow-md"
          }`}
        >
          {/* Priority */}
          <div className="mb-2 flex items-center justify-between">
            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${
                priorityStyles[card.priority] ||
                priorityStyles.medium
              }`}
            >
              {card.priority || "medium"}
            </span>
          </div>

          {/* Title */}
          <h4 className="mb-2 text-sm font-semibold text-gray-800">
            {card.title}
          </h4>

          {/* Description */}
          {card.description && (
            <p className="mb-3 line-clamp-2 text-xs text-gray-500">
              {card.description}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between">
            {/* Assigned Members */}
            <div className="flex -space-x-2">
              {card.assignedTo?.slice(0, 3).map((member) => (
                <div
                  key={member._id}
                  title={member.name}
                  className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-blue-500 text-xs font-medium text-white"
                >
                  {member.name?.charAt(0).toUpperCase()}
                </div>
              ))}

              {card.assignedTo?.length > 3 && (
                <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-gray-500 text-xs text-white">
                  +{card.assignedTo.length - 3}
                </div>
              )}
            </div>

            {/* Due Date */}
            {card.dueDate && (
              <span className="text-xs text-gray-500">
                {new Date(card.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;