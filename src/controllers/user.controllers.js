import UserDatabase from "../models/user.models.js";
import bcrypt from "bcrypt"
import { generateReferralCode, isValidEmail } from "../utils.js";


export const createNewUser = async (req, res) => {
    try {
        const {
            oauthProvider,
            password,
            email,
        } = req.body;

        console.log(req.body);

        if(!isValidEmail(email)) { 
            return res.status(400).json({ ok: false, error: "please put a valid email address" })
        }

        if(oauthProvider === "default" && password.length < 8) { 
            return res.status(400).json({ ok: false, error: "password must be greater than 8 characters" })
        }

        const existingUser = await UserDatabase.findOne({ email });

        if (existingUser) {
            console.log("User already exists. Will not create a new record.");
            return res.status(301).json({ ok: false, message: "A user already exists with that email. Try logging in instead." });
        }

        let salt, passwordHash
        if(oauthProvider === "default") {
            salt = await bcrypt.genSalt();
            passwordHash = await bcrypt.hash(password, salt);
        }

        // Create a new user record
        const newUser = new UserDatabase({
            email,
            password: oauthProvider === "default" ? passwordHash : "",
            accountStatus: "active",
            referralCode: generateReferralCode()
        });

        await newUser.save();

        console.log('New user added successfully');
        return res.status(201).json({ exists: false, body: newUser });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const loginUser = async(req, res) => {
    try {
      const { oauthProvider, email, password } = req.body
      console.log(req.body)
      if(!isValidEmail(email)) { 
        return res.status(400).json({ ok: false, error: "please put a valid email address" })
      }

       
      const user = await UserDatabase.findOne({ email }, { __v: 0 })
      if(!user) {
        return res.status(400).json({ok: false, msg: "No account exists with that email. Try creating an account" })
      }
  
      if(oauthProvider === "default") {
          //Check if password is correct
          const isMatch = await bcrypt.compare(password, user.password)
          if(!isMatch) return res.status(400).json({ok: false, msg: "Incorrect Password" })
      }
      
      return res.status(200).json({ ok: true, body: user })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

export const getUser = async (req, res) => {
    try {
        const { userId } = req.params
        const user = await UserDatabase.findById(userId, { __v: 0 })
        return res.status(200).json({ ok: true, body: user })
    } catch (error) {
        return res.status(404).json({ok: false, error: error.message})
    }
}

export const editUserMainDetails = async(req, res) => {
    try {
        const { userId, updates } = req.body
        const allowedFields = ["name", "telephone", "accountStatus"]
        const user = await UserDatabase.findById(userId)

        const unallowedField = updates.find(update => !allowedFields.includes(update.field))?.field

        if(unallowedField) {
            return res.status(403).json({ ok: false, error: `Invalid Field`, message: "the field could not exist or it's unchangeable or this is the wrong way to change it." })
        }
        updates.forEach(({ field, value }) => {
            user[field] = value
        })

        await user.save()

        const updatedUser = await UserDatabase.findById(userId, { __v: 0 })
        return res.status(200).json({ ok: true, body: updatedUser })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false, error: "Internal server error" })
    }
}

export const changeUserPassword = async(req, res) => {
    try {
        const { userId, currentPassword, newPassword, newPasswordConfirmation } = req.body

        if(newPassword !== newPasswordConfirmation) {
            return res.status(400).json({ ok: false, error: "Your new password isn't confirmed properly" })
        }
        const user = await UserDatabase.findById(userId)

        if(user.oauthProvider !== "default") {
            return res.status(400).json({ ok: false, error: `User signed in with ${user.oauthProvider}. Password can't be changed.` })
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password)
        if(!isMatch) return res.status(400).json({ ok: false, msg: "Old password is incorrect." })
        
        const salt = await bcrypt.genSalt();
        const newPasswordHash = await bcrypt.hash(newPassword, salt);

        user.password = newPasswordHash
        await user.save()

        return res.status(201).send("Password was successfully changed.")
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false, error: "Internal server error" })
    }
}