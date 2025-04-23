import jwt from 'jsonwebtoken';

const jwtAuth = (req, res, next) => {

    const jwtSecret = process.env.JWT_SECRET;

    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).send('Access Denied');
    }

    const token = authHeader.split(' ')[1]; // Extract token
    try {
        const payload = jwt.verify(token, jwtSecret);
        req.userId = payload.userId; // Attach userId to req
    } catch (err) {
        console.error("Invalid Token:", err.message);
        return res.status(401).send('Invalid Token');
    }
    next();
};

export default jwtAuth;