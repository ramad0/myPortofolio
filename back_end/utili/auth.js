const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.secretKey;

exports.hashPassword = async (password) => {
    if (!password) {
        throw new Error('Password is required');
    }
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

exports.compare = async (password, savedPassword) => {
    return bcrypt.compare(password, savedPassword);
};

exports.createToken = async (userPayload) => { 
    return jwt.sign(userPayload, secretKey, { expiresIn: '1h' });
};

exports.authMiddleware = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).send('Access denied, token missing');
        }

        const verified = jwt.verify(token, secretKey);
        req.user = verified;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).send('Access denied, token has expired');
        }
        return res.status(401).send(`Access denied, invalid token: ${err.message}`);
    }
};




