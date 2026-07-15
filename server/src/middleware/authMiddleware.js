const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {

    let token;

    console.log("Authorization Header:", req.headers.authorization);

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {

            token = req.headers.authorization.split(" ")[1];

            console.log("Received Token:", token);
            console.log("JWT Secret:", process.env.JWT_SECRET);

            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            console.log("Decoded Token:", decoded);

            req.user = decoded;

            next();

        } catch (error) {

            console.log("JWT Error:", error);

            return res.status(401).json({
                success: false,
                message: "Invalid Token"
            });

        }
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access Denied. No Token Provided."
        });
    }
};

module.exports = protect;