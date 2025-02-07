const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authMiddleware");
const Transaction = require("../model/transactionModel");

// Get all 
router.get("/transactions", authenticateUser, async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Add new transaction
router.post('/transactions', authenticateUser, async (req, res) => {
    try {
        const { date, description, amount, category } = req.body;
        const newTransaction = new Transaction({
            user: req.user.id,  
            date,
            description,
            amount,
            category
        });
        await newTransaction.save();
        res.status(201).json(newTransaction);
    } catch (error) {
        res.status(500).json({ error: "Server error while adding transaction" });
    }
});

// Delete transaction
router.delete("/transactions/:id", authenticateUser, async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction || transaction.user.toString() !== req.user.id) {
            return res.status(404).json({ message: "Transaction not found or unauthorized" });
        }

        await transaction.deleteOne();  
        res.json({ message: "Transaction deleted successfully" });
    } catch (error) {
        console.error("Error deleting transaction:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
