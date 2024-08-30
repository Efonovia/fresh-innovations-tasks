import mongoose from "mongoose";


const UserSchema = mongoose.Schema({
    name: {
        type: String,
        default: "",
        min: 2,
        max: 70,
        trim: true
    },
    email: {
        type: String,
        required: true,
        min: 8,
        max: 50,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        default: "",
        min: 8,
        max: 70,
    },
    phoneNumber: {
        type: String,
        default: "",
        min: 11,
        max: 11,
        trim: true
    },
    oauthProvider: {
        type: String,
        default: null,
        required: true,
    },
    profilePicturePath: {
        type: String,
        default: "",
    },
    accountStatus: {
        type: String,
        default: "",
        required: true
    },
    referralCode: {
        type: String,
        default: "",
    },
    walletBalance: {
        type: Number,
        default: 0,
    },
    referralsMade: {
        type: Number,
        default: 0,
    },
}, { timestamps: true })


const User = mongoose.model("User", UserSchema)
export default User