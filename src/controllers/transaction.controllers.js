import TransactionDatabase from "../models/transaction.models.js";
import { generateTransactionNumber } from "../utils.js";


export const createNewTransaction = async (req, res) => {
    try {
        const {
            userId,
            network,
            phoneNumber,
            amount,
            airtimeSharePin,
        } = req.body;

        console.log(req.body)

        // Create a new transaction record
        const newTransaction = new TransactionDatabase({
            user: userId,
            network,
            phoneNumber,
            amount,
            airtimeSharePin,
            status: "Initiated",
            transactionNo: generateTransactionNumber()
        });

        await newTransaction.save();

        console.log('New transaction added successfully');
        return res.status(201).json({ ok: true, body: newTransaction });

    } catch (error) {
        return res.status(500).json({ ok: false, error: error.message });
    }
}

export const getUserTransactionByNo = async(req, res) => {
    try {
        const { transactionNo } = req.params
        const transaction = await TransactionDatabase.findOne({ transactionNo }, { __v: 0 })

        if(transaction) {
            return res.status(200).json({ ok: true, body: transaction })
        }

        return res.status(404).json({ ok: false, error: "That transaction does not exist" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false, error: "Internal server error" })
    }
}

export const getAllUserTransactions = async(req, res) => {
    try {
        const { userId } = req.params

        const transactions = await TransactionDatabase.find({ user: userId }, { __v: 0 })

        return res.status(200).json({
            ok: true,
            body: transactions,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false, error: "Internal server error" })
    }
}

export const getAllTransactions = async(req, res) => {
    try {

        const transactions = await TransactionDatabase.find({ }, { __v: 0 })

        return res.status(200).json({
            ok: true,
            body: transactions,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false, error: "Internal server error" })
    }
}