import mongoose from "mongoose";


const TransactionSchema = mongoose.Schema({
    service: {
        type: String,
        default: "",
        min: 2,
        max: 70,
        trim: true,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
        required: true
    },
    amount: {
        type: Number,
        default: 0,
        required: true
    },
    status: {
        type: String,
        default: "",
        min: 2,
        max: 20,
        trim: true,
        required: true
    },
    paymentMethod: {
        type: String,
        default: "",
        min: 2,
        max: 20,
        trim: true,
        required: true
    },
    transactionNo: {
        type: String,
        default: "",
        min: 2,
        max: 30,
        trim: true,
        required: true
    },

}, { timestamps: true })


const Transaction = mongoose.model("Transaction", TransactionSchema)
export default Transaction