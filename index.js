import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet";
import morgan from "morgan";
import UsersRouter from "./src/user.routes.js";
import TransactionsRouter from "./src/transaction.routes.js";


dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())


app.get("/", (req, res) => {
    res.send("Welcome to Fresh Innovations...")
})

app.use("/users", UsersRouter)
app.use("/transactions", TransactionsRouter)

const PORT = process.env.PORT || 6001

const mongooseConnectionOptions = {
    socketTimeoutMS: 45000, 
    serverSelectionTimeoutMS: 50000, 
}


mongoose.connect(process.env.MONGO_URL, mongooseConnectionOptions)

mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB database")
    app.listen(PORT, () => {
        console.log("Server running at PORT: " + PORT)
    })
})

mongoose.connection.on('error', (err) => {
    console.log("\nFAILED TO CONNECT TO DATABASE\n" + err)
})
