import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

type DecodedToken = { id: string; email: string; isAdmin?: boolean };

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization || "";
        const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : undefined;

        if (!token) {
            res.status(401).json({
                message: "authorization token missing",
                success: false
            })
            return
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

        if (!decoded?.isAdmin) {
            res.status(403).json({
                message: "admin access required",
                success: false
            })
            return
        }

        ;(req as any).user = decoded
        next()

    } catch (error) {
        res.status(401).json({
            message: "invalid or expired token",
            success: false
        })
    }
}

const isLoggedin = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization || "";
        const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : undefined;

        if (!token) {
            res.status(401).json({
                message: "authorization token missing",
                success: false
            })
            return
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
        ;(req as any).user = decoded
        next()

    } catch (error) {
        res.status(401).json({
            message: "invalid or expired token",
            success: false
        })
    }
}

export { isLoggedin }
export default isAdmin



