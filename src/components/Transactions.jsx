import { useState } from "react";

function Transactions({ data, role, setTransactions }) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sort, setSort] = useState("");
  const [form, setForm] = useState({ date: "", amount: "", category: "", type: "income" });

  let filtered = data.filter((t) =>
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  if (filterType) {
    filtered = filtered.filter((t) => t.type === filterType);
  }

  if (sort === "high") {
    filtered.sort((a, b) => b.amount - a.amount);
  }

  const addTransaction = () => {
    const newTx = {
      ...form,
      id: Date.now(),
      amount: Number(form.amount),
    };
    setTransactions([...data, newTx]);
  };

  const deleteTx = (id) => {
    setTransactions(data.filter((t) => t.id !== id));
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-lg mt-6">

      {/* Header */}
      <div className="flex justify-between mb-4 flex-wrap gap-3">
        <h2 className="text-xl font-semibold">Transactions</h2>

        <div className="flex gap-2 flex-wrap">
          <input
            placeholder="Search"
            className="border p-2 rounded"
            onChange={(e) => setSearch(e.target.value)}
          />

          <select onChange={(e) => setFilterType(e.target.value)} className="border p-2 rounded">
            <option value="">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <select onChange={(e) => setSort(e.target.value)} className="border p-2 rounded">
            <option value="">Sort</option>
            <option value="high">Amount High → Low</option>
          </select>
        </div>
      </div>

      {/* Add Form (Admin only) */}
      {role === "admin" && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
          <input type="date" onChange={(e) => setForm({ ...form, date: e.target.value })} className="border p-2 rounded" />
          <input placeholder="Amount" onChange={(e) => setForm({ ...form, amount: e.target.value })} className="border p-2 rounded" />
          <input placeholder="Category" onChange={(e) => setForm({ ...form, category: e.target.value })} className="border p-2 rounded" />
          <select onChange={(e) => setForm({ ...form, type: e.target.value })} className="border p-2 rounded">
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <button onClick={addTransaction} className="bg-green-500 text-white rounded px-3">+ Add</button>
        </div>
      )}

      {/* Empty State */}
      {filtered.length === 0 ? (
        <p className="text-gray-500">No transactions found</p>
      ) : (
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Type</th>
              {role === "admin" && <th>Action</th>}
            </tr>
          </thead>

          <tbody>
            {filtered.map((t) => (
              <tr key={t.id} className="border-t hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="py-2">{t.date}</td>
                <td>{t.category}</td>
                <td>₹{t.amount}</td>
                <td className={t.type === "income" ? "text-green-600" : "text-red-600"}>
                  {t.type}
                </td>
                {role === "admin" && (
                  <td>
                    <button onClick={() => deleteTx(t.id)} className="text-red-500">Delete</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Transactions;
