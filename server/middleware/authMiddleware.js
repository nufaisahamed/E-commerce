const jwt = require("jsonwebtoken");

module.exports.verifyToken = (req, res, next) => {
    const token = req.cookies.authToken;

    console.log(token);

    if (!token) {
        return res.status(401).json({ message: "No token provide!" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Token verification failed!" });
        }
        req.user = decoded;
        next();
    });
};

module.exports.verifyRole = (roles) => {
    return (req, res, next) => {
        if (roles.includes(req.user.role)) {
            return next();
        }

        res.status(401).json({ message: "Access denied!" });
    };
};