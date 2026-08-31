import { Draggable } from "@hello-pangea/dnd";

const Card = ({ card, index, onDelete }) => {
  const getPriorityStyle = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-600";

      case "medium":
        return "bg-yellow-100 text-yellow-600";

      case "low":
        return "bg-green-100 text-green-600";

      default:
        return "bg-gray-100 text-gray-600";
    }
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
          className={`bg-white rounded-lg p-3 shadow-sm border border-gray-200 hover:shadow-md transition cursor-grab active:cursor-grabbing group ${
            snapshot.isDragging
              ? "shadow-xl rotate-1"
              : ""
          }`}
        >

          {/* Card Header */}
          <div className="flex justify-between items-start gap-2">
            <h4 className="font-medium text-gray-800 text-sm break-words">
              {card.title}
            </h4>

            <button
              onClick={(e) => {
                e.stopPropagation();

                const confirmDelete = window.confirm(
                  `Delete "${card.title}"?`
                );

                if (confirmDelete) {
                  onDelete(card._id);
                }
              }}
              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
              title="Delete Card"
            >
              ✕
            </button>
          </div>

          {/* Description */}
          {card.description && (
            <p className="text-xs text-gray-500 mt-2 line-clamp-2">
              {card.description}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between mt-3">
            {card.priority && (
              <span
                className={`text-xs px-2 py-1 rounded-full ${getPriorityStyle(
                  card.priority
                )}`}
              >
                {card.priority}
              </span>
            )}

            {card.dueDate && (
              <span className="text-xs text-gray-400">
                📅{" "}
                {new Date(
                  card.dueDate
                ).toLocaleDateString()}
              </span>
            )}
          </div>

          {/* Assigned Members */}
          {card.assignedTo?.length > 0 && (
            <div className="flex -space-x-2 mt-3">
              {card.assignedTo
                .slice(0, 3)
                .map((member, memberIndex) => (
                  <div
                    key={member._id || memberIndex}
                    title={member.name}
                    className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center border-2 border-white"
                  >
                    {member.name
                      ?.charAt(0)
                      ?.toUpperCase() || "U"}
                  </div>
                ))}

              {card.assignedTo.length > 3 && (
                <div className="w-6 h-6 rounded-full bg-gray-500 text-white text-xs flex items-center justify-center border-2 border-white">
                  +{card.assignedTo.length - 3}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Card;