function Insights({ data }) {
  const income = data.filter(t => t.type === "income").reduce((a, b) => a + b.amount, 0);
  const expense = data.filter(t => t.type === "expense").reduce((a, b) => a + b.amount, 0);

  const expenses = data.filter(t => t.type === "expense");

  const categoryMap = {};
  expenses.forEach((t) => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
  });

  const highest = Object.keys(categoryMap).reduce((a, b) =>
    categoryMap[a] > categoryMap[b] ? a : b
  );

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-lg mt-6">
      <h2 className="text-xl font-semibold mb-3">Insights</h2>

      <p>💰 Savings: ₹{income - expense}</p>
      <p>📊 Total Transactions: {data.length}</p>
      <p>🔥 Highest Spending: {highest}</p>
    </div>
  );
}

export default Insights;
