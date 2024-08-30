import UserDatabase from "../models/user.models.js"
import TransactionDatabase from "../models/transaction.models.js"


export const checkUserExistence = async(req, res, next) => {
    try {
        const userId = req.params?.userId || req.body?.userId
        const user = await UserDatabase.findById(userId)

        if(!user) {
            return res.status(404).json({ ok: false, error: "User does not exist" })
        }
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false, error: "Internal server error" })
    }
}

export const checkTransactionExistence = async(req, res, next) => {
    try {
        const transactionId = req.params?.transactionId || req.body?.transactionId
        const transaction = await TransactionDatabase.findById(transactionId)

        if(!transaction) {
            return res.status(404).json({ ok: false, error: "Transaction does not exist" })
        }
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false, error: "Internal server error" })
    }
}