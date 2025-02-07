import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const Transactions = () => {
    const [show, setShow] = useState(false);
    const [confirmShow, setConfirmShow] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [selectedTransactionId, setSelectedTransactionId] = useState(null);
    
    // Filters
    const [selectedCategory, setSelectedCategory] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [formData, setFormData] = useState({
        date: "",
        description: "",
        amount: "",
        category: "",
    });

    useEffect(() => {
        fetchTransactions();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [selectedCategory, startDate, endDate, transactions]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const fetchTransactions = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:5000/transactions/transactions", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTransactions(response.data);
            setFilteredTransactions(response.data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    const applyFilters = () => {
        let filtered = transactions;

        if (selectedCategory) {
            filtered = filtered.filter(txn => txn.category === selectedCategory);
        }

        if (startDate) {
            filtered = filtered.filter(txn => new Date(txn.date) >= new Date(startDate));
        }

        if (endDate) {
            filtered = filtered.filter(txn => new Date(txn.date) <= new Date(endDate));
        }

        setFilteredTransactions(filtered);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found");
            return;
        }

        try {
            await axios.post("http://localhost:5000/transactions/transactions", formData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast.success("Transaction added successfully!");
            setShow(false);
            setFormData({ date: "", description: "", amount: "", category: "" });
            fetchTransactions();
        } catch (error) {
            console.error("Error adding transaction", error);
            toast.error("Failed to add transaction");
        }
    };

    const handleDeleteClick = (id) => {
        setSelectedTransactionId(id);
        setConfirmShow(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/transactions/transactions/${selectedTransactionId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });

            toast.success("Transaction deleted successfully!");
            fetchTransactions();
            setConfirmShow(false);
        } catch (error) {
            toast.error("Error deleting transaction");
            console.error(error);
        }
    };

    // Function to convert transactions to CSV format and download
    const handleDownloadCSV = () => {
        if (filteredTransactions.length === 0) {
            toast.error("No transactions available to download!");
            return;
        }

        const csvHeader = ["Date,Description,Amount,Category"];
        const csvRows = filteredTransactions.map(txn => 
            `${new Date(txn.date).toLocaleDateString()},${txn.description},${txn.amount},${txn.category}`
        );

        const csvContent = [csvHeader, ...csvRows].join("\n");
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "transactions.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="container my-4">
            <h2 className="text-center bg-dark text-white py-2" style={{ marginTop: "100px" }}>
                Transactions
            </h2>
            <Button className="btn btn-success my-2" onClick={() => setShow(true)}>
                Add New Transaction
            </Button>
            <Button className="btn btn-primary my-2 mx-2" onClick={handleDownloadCSV}>
                Download 
            </Button>

            {/* Filters */}
            <div className="row mb-3">
                <div className="col-md-4">
                    <label>Filter by Category:</label>
                    <select className="form-control" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="">All Categories</option>
                        <option value="Food">Food</option>
                        <option value="Housing">Housing</option>
                        <option value="Transportation">Transportation</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <label>Start Date:</label>
                    <input type="date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className="col-md-3">
                    <label>End Date:</label>
                    <input type="date" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
            </div>

            {/* Transactions Table */}
            <table className="table table-bordered" style={{ marginBottom: "170px" }}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTransactions.map((txn) => (
                        <tr key={txn._id}>
                            <td>{new Date(txn.date).toLocaleDateString()}</td>
                            <td>{txn.description}</td>
                            <td>${txn.amount}</td>
                            <td>{txn.category}</td>
                            <td>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteClick(txn._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add Transaction Modal */}
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Transaction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" name="description" value={formData.description} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="number" name="amount" value={formData.amount} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Control as="select" name="category" value={formData.category} onChange={handleChange} required>
                                <option value="">Select a category</option>
                                <option value="Food">Food</option>
                                <option value="Housing">Housing</option>
                                <option value="Transportation">Transportation</option>
                            </Form.Control>
                        </Form.Group>
                        <Button type="submit" className="mt-3 btn btn-primary">
                            Add Transaction
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Transactions;
