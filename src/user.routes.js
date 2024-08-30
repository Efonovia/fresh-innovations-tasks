import express from "express"
import { 
    getUser,
    loginUser,
    createNewUser,
    changeUserPassword,
    editUserMainDetails,
} from "./controllers/user.controllers.js"


const UsersRouter = express.Router()


UsersRouter.post("/signup", createNewUser)
UsersRouter.post("/login", loginUser)
UsersRouter.patch("/edit/main-details", editUserMainDetails)
UsersRouter.patch("/edit/password", changeUserPassword)
UsersRouter.get("/user/id/:userId", getUser)


export default UsersRouter