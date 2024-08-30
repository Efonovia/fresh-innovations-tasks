import UserDatabase from "../models/user.mongo.js";
import bcrypt from "bcrypt"
import { isValidEmail } from "../utils.js";


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
            password: oauthProvider === "default" ? passwordHash : ""
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

       
      const user = await UserDatabase.findOne({ email })
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
        const user = await UserDatabase.findById(userId)
        return res.status(200).json(user)
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
}