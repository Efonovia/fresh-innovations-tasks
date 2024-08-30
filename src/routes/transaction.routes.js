import express from "express"
import {
    createNewTransaction,
    getAllTransactions,
    getAllUserTransactions,
    getUserTransactionByNo,
} from "../controllers/transaction.controllers.js"
import { checkUserExistence } from "../middlewares.js"


const TransactionsRouter = express.Router()

TransactionsRouter.post("/create", checkUserExistence, createNewTransaction)
TransactionsRouter.get("/get/:transactionNo", getUserTransactionByNo)
TransactionsRouter.get("/all", getAllTransactions)
TransactionsRouter.get("/all/user/:userId", checkUserExistence, getAllUserTransactions)

export default TransactionsRouter