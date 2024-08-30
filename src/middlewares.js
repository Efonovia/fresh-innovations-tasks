import UserDatabase from "./models/user.models.js"


export const checkUserExistence = async(req, res, next) => {
    try {
        const userId = req.params?.userId || req.body?.userId
        const user = await UserDatabase.findById(userId)

        if(!user) {
            return res.status(404).json({ ok: false, error: "That user does not exist" })
        }
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false, error: "Internal server error" })
    }
}
