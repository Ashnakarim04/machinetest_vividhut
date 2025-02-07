const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; 

    if (!token) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        
        console.log("Decoded JWT:", decoded); 
        req.user = { id: decoded.userId };
        if (!req.user.id) {
            return res.status(400).json({ message: "User ID is missing from token!" });
        }

        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

module.exports = authenticateUser;

