const jwt = require("jsonwebtoken");
require("dotenv/config");

const jwtSecret = process.env.JWT_SECRET;

const isAuth = (req, res, next) => {
        const token = req.headers['authorization'] || req.headers["x-access-token"];
        if (!token) return res.status(401).json({ message: 'No token provided' });
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) return res.status(401).json({ message: 'Invalid token', error: err });
            console.log(decoded);
            req.userId = decoded._id
            next();
        });
        console.log(token)
    // valid token middleware
};

module.exports = isAuth;