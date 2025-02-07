
import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

const Dashboard = () => {
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:5000/transactions/transactions", {
                headers: { Authorization: `Bearer ${token}` },
            });

            setTransactions(response.data);

            const total = response.data.reduce((acc, txn) => acc + txn.amount, 0);
            setBalance(total);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        } finally {
            setLoading(false);
        }
    };

    const getCategoryData = () => {
        const categoryTotals = {};
        transactions.forEach((txn) => {
            if (txn.amount < 0) {
                categoryTotals[txn.category] = (categoryTotals[txn.category] || 0) + Math.abs(txn.amount);
            }
        });

        return Object.keys(categoryTotals).map((category) => ({
            name: category,
            value: categoryTotals[category],
        }));
    };

    const getIncomeExpenseData = () => {
        const income = transactions.filter((txn) => txn.amount > 0).reduce((sum, txn) => sum + txn.amount, 0);
        const expenses = transactions.filter((txn) => txn.amount < 0).reduce((sum, txn) => sum + Math.abs(txn.amount), 0);

        return [
            { name: "Income", amount: income },
            { name: "Expenses", amount: expenses },
        ];
    };

    if (loading) {
        return <h2 className="text-center mt-4">Loading...</h2>;
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center">Finance Dashboard</h2>

            {/* Total Balance */}
            <div className="card p-3 text-center">
                <h4>Total Balance</h4>
                <h2 className={balance >= 0 ? "text-success" : "text-danger"}>${balance.toFixed(2)}</h2>
            </div>

            {/* Charts Section */}
            <div className="row mt-4">
                <div className="col-md-6">
                    <h4 className="text-center">Expense Categories</h4>
                    <PieChart width={350} height={300}>
                        <Pie data={getCategoryData()} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value">
                            {getCategoryData().map((_, index) => (
                                <Cell key={`cell-${index}`} fill={["#0088FE", "#FF8042", "#00C49F", "#FFBB28"][index % 4]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </div>

                <div className="col-md-6">
                    <h4 className="text-center">Income vs Expenses</h4>
                    <BarChart width={350} height={300} data={getIncomeExpenseData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="amount" fill="#82ca9d" />
                    </BarChart>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="mt-4">
                <h4>Recent Transactions</h4>
                <ul className="list-group">
                    {transactions.slice(0, 5).map((txn) => (
                        <li key={txn._id} className="list-group-item d-flex justify-content-between">
                            <span>{txn.description} ({new Date(txn.date).toLocaleDateString()})</span>
                            <span className={txn.amount >= 0 ? "text-success" : "text-danger"}>
                                {txn.amount >= 0 ? `+${txn.amount}` : txn.amount}$
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* All Transactions Table */}
            <div className="mt-4">
                <h4>All Transactions</h4>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((txn) => (
                            <tr key={txn._id}>
                                <td>{new Date(txn.date).toLocaleDateString()}</td>
                                <td>{txn.description}</td>
                                <td className={txn.amount >= 0 ? "text-success" : "text-danger"}>${txn.amount}</td>
                                <td>{txn.category}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
