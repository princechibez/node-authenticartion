const jwt = require("jsonwebtoken");
require("dotenv/config");

const jwtSecret = process.env.JWT_SECRET;

module.exports = isAuth = (req, res, next) => {
        const token = req.headers['authorization'];
        if (!token) return res.status(401).json({ message: 'No token provided' });
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) return res.status(401).json({ message: 'Invalid token', error: err });
            console.log(decoded._id)
            next();
        });
    // valid token middleware
};
