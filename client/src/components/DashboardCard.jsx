export default function DashboardCard({
  title,
  value,
  bgColor = "bg-white",
  textColor = "text-black",
}) {
  return (
    <div className={`${bgColor} rounded-xl shadow-md p-6`}>
      <h3 className="text-gray-600 font-medium">{title}</h3>

      <p className={`text-4xl font-bold mt-3 ${textColor}`}>
        {value}
      </p>
    </div>
  );
}