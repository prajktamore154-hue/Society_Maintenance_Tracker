export default function NoticeCard({
  title,
  description,
  date,
  important,
  onDelete,
  showDelete = false,
}) {
  return (
    <div
      className={`rounded-lg shadow p-4 border-l-4 ${
        important
          ? "bg-red-50 border-red-500"
          : "bg-yellow-50 border-yellow-500"
      }`}
    >
      <div className="flex justify-between items-start">

        <div className="flex-1">

          {important && (
            <span className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
              🚨 IMPORTANT
            </span>
          )}

          <h3 className="font-bold text-lg">
            {title}
          </h3>

          <p className="text-gray-700 mt-2">
            {description}
          </p>

          <p className="text-sm text-gray-500 mt-3">
            {date}
          </p>

        </div>

        {showDelete && (
          <button
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Delete
          </button>
        )}

      </div>
    </div>
  );
}