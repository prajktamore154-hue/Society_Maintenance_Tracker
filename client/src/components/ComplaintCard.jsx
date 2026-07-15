export default function ComplaintCard({
  title,
  description,
  resident,
  flat,
  status,
  priority,
  assignedTo,
  overdue,
  children,
}) {
  const statusColor =
    status === "Resolved"
      ? "bg-green-500"
      : status === "In Progress"
      ? "bg-blue-500"
      : "bg-yellow-500";

  const priorityColor =
  priority === "High"
    ? "bg-red-500"
    : priority === "Medium"
    ? "bg-yellow-500"
    : priority === "Low"
    ? "bg-green-500"
    : "bg-gray-500";

  return (
    <div className="bg-white rounded-xl shadow-md p-6">

      <div className="flex justify-between items-start">

        <div className="flex-1">

          <h2 className="text-2xl font-bold text-gray-800">
            {title}
          </h2>

          <p className="mt-2 text-gray-600">
            {description}
          </p>

          {resident && (
            <p className="mt-4">
              <strong>Resident:</strong> {resident}
            </p>
          )}

          {flat && (
            <p>
              <strong>Flat:</strong> {flat}
            </p>
          )}

          {assignedTo && (
            <p className="mt-2">
                <strong>Assigned To:</strong> {assignedTo}
            </p>
            )}

        </div>
<div className="flex flex-col gap-3">

  <span
    className={`px-4 py-2 rounded-full text-white font-semibold text-center ${statusColor}`}
  >
    {status}
  </span>

  <span
    className={`px-4 py-2 rounded-full text-white font-semibold text-center ${priorityColor}`}
  >
    {priority} Priority
  </span>

  {overdue && (
    <span className="px-4 py-2 rounded-full bg-red-600 text-white font-bold text-center">
      ⚠ OVERDUE
    </span>
  )}

</div>

      </div>

      {children}

    </div>
  );
}