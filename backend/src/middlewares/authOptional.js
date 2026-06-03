import { TOKEN_SECRET } from "../config.js";
import jwt from 'jsonwebtoken';

export const authOptional = (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        req.user = null;
        return next();
    }

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) {
            req.user = null;
            return next();
        }

        req.user = user;
        next();
    });
};
