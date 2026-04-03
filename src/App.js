import { useState, useEffect } from "react";
import SummaryCard from "./components/SummaryCard";
import Transactions from "./components/Transactions";
import Insights from "./components/Insights";
import RoleSwitcher from "./components/RoleSwitcher";
import Charts from "./components/Charts";
import { transactionsData } from "./data/data";

function App() {
  const [role, setRole] = useState("viewer");
  const [dark, setDark] = useState(false);

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : transactionsData;
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const income = transactions.filter(t => t.type === "income").reduce((a, b) => a + b.amount, 0);
  const expense = transactions.filter(t => t.type === "expense").reduce((a, b) => a + b.amount, 0);

  return (
    <div className={dark ? "bg-gray-900 text-white min-h-screen p-6" : "bg-gray-100 min-h-screen p-6"}>

      {/* Header */}
      <div className="flex justify-between items-center mb-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <h1 className="text-2xl font-semibold">Finance Dashboard</h1>

        <div className="flex gap-3">
          <button onClick={() => setDark(!dark)} className="px-3 py-1 border rounded">
            {dark ? "Light" : "Dark"}
          </button>

          <RoleSwitcher role={role} setRole={setRole} />
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard title="Total Balance" amount={income - expense} color="text-black dark:text-white" />
        <SummaryCard title="Income" amount={income} color="text-green-600" />
        <SummaryCard title="Expenses" amount={expense} color="text-red-600" />
      </div>

      <Charts data={transactions} />

      <Transactions data={transactions} role={role} setTransactions={setTransactions} />

      <Insights data={transactions} />

    </div>
  );
}

export default App;
