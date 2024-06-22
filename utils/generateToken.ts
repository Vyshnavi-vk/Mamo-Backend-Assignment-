import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const jwtSecret = process.env.JWT_SECRET

if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined");
}

export const generateToken = (id: any) => {
    return jwt.sign({ id }, jwtSecret, { expiresIn: '24h' })
}