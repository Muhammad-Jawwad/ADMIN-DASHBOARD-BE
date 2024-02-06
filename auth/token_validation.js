const jwt = require("jsonwebtoken");

// Authentication middleware
const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.get("Authorization");
        if (!authHeader) {
            return res.status(401).json({
                code: 401,
                message: "Unauthenticated User!",
            });
        }
        const token = authHeader.split(" ")[1];
        console.log("token",token)
        const decodedToken = jwt.verify(token, "qwe1234");
        console.log("decodedToken", decodedToken)
        if (!decodedToken) {
            return res.status(401).json({
                code: 498,
                message: "Invalid Token!",
            });
        }
        req.token = token;
        req.id = decodedToken.id;
        req.email_id = decodedToken.email_id;
        req.role = decodedToken.role;
        req.type = decodedToken.type;
        next();
    } catch (err) {
        return res.status(401).json({
            code: 401,
            message: "Unauthenticated User!",
        });
    }
};
module.exports = authenticateToken;
