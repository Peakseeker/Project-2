import Card from "./Card";

const BoardList = ({ list }) => {
  return (
    <div className="w-72 shrink-0 rounded-lg bg-gray-100 p-3">
      
      {/* List Header */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">
          {list.title}
        </h3>

        <span className="rounded bg-gray-200 px-2 py-1 text-xs">
          {list.cards?.length || 0}
        </span>
      </div>

      {/* Cards */}
      <div className="space-y-3">
        {list.cards?.map((card, index) => (
          <Card
            key={card._id}
            card={card}
            index={index}
          />
        ))}
      </div>

      {/* Empty State */}
      {list.cards?.length === 0 && (
        <div className="rounded border border-dashed border-gray-300 p-4 text-center text-sm text-gray-500">
          No cards yet
        </div>
      )}

    </div>
  );
};

export default BoardList;