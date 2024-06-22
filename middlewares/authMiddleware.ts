import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import User from "../models/userModel";

interface JwtPayload extends jwt.JwtPayload {
    id: string;
    role: 'client' | 'freelancer' | 'all';
}

const jwtSecret = process.env.JWT_SECRET

if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined");
}

export const protect = (role: 'client' | 'freelancer' | 'all' = 'all') => {
    return async (req: Request, res: Response, next: NextFunction) => {

        if (!req.headers.authorization) {
            return res.status(401).json({ msg: "No token, authentication failed" });
        }

        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({ msg: "No token, authentication failed" });
        }

        try {
            const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

            (req as any).user = await User.findById(decoded.id).select("-password");;

            if (role !== 'all' && (req as any).user.role !== role) {
                return res.status(403).json({ message: 'You are not allowed to do this action' });
            }
            next();
        } catch (error) {
            return res.status(401).json({ msg: "Invalid token" });
        }
    };
};
