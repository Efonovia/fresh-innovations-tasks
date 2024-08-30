import express from "express"
import {
    createNewTransaction,
    getAllTransactions,
    getAllUserTransactions,
    getUserTransactionByNo,
} from "../controllers/transaction.controllers.js"


const TransactionsRouter = express.Router()

TransactionsRouter.post("/create", createNewTransaction)
TransactionsRouter.get("/get/:transactionNo", getUserTransactionByNo)
TransactionsRouter.get("/all", getAllTransactions)
TransactionsRouter.get("/all/user/:userId", getAllUserTransactions)

export default TransactionsRouter