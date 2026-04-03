function SummaryCard({ title, amount, color }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-lg hover:scale-105 transition">
      <h2 className="text-gray-500 dark:text-gray-300 text-sm">{title}</h2>
      <p className={`text-2xl font-bold mt-2 ${color}`}>₹{amount}</p>
    </div>
  );
}

export default SummaryCard;
