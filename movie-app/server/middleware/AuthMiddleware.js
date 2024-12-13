import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { ApiError } from "../helpers/ApiError1.js";

dotenv.config();

// Create a JWT token
export const createToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "12h" });
}

// Hash a password
export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

// Compare a password with a hashed password
export const comparePasswords = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}

// Authenticate a user
export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return next(new ApiError("Authorization header is missing", 401));
    }

    const token = authHeader.split(" ")[1];

    // Check if the token is valid
    if (isTokenBlacklisted(token)) {
        return next(new ApiError("Invalid token", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
         req.user = decoded;  
        next();
    } catch (error) {
        return next(new ApiError("Invalid token", 403));
    }
};

// Temporary in-memory blacklist
const tokenBlacklist = new Set();

// Blacklist a token
export const blacklistToken = (token) => {
    tokenBlacklist.add(token);
    setTimeout(() => {
        tokenBlacklist.delete(token);
    }, 43200000); // 12 hours
}

// Check if a token is blacklisted
export const isTokenBlacklisted = (token) => {
    return tokenBlacklist.has(token);
}