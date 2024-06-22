import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import User from "../models/userModel"
import { generateToken } from "../utils/generateToken";


export const signUpController = async (req: Request, res: Response) => {
    try {
        const { username, email, password, role } = req.body;

        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(200).json({ msg: "User already exsits" })
        }

        else {
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new User({ username, email, password: hashedPassword, role });
            await user.save();


            res.status(201).json({
                message: 'User created successfully',
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Internal Server Error" })
    }
}



export const signInController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ msg: "Invalid Credentials" })
        }

        const validPassword = await bcrypt.compare(password, user.password)


        if (!validPassword) {
            return res.status(400).json({ msg: "Invaid Credentials" })
        }

        const token = generateToken(user._id)

        res.status(201).json({
            token: token
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Internal Serve Error" })
    }
}