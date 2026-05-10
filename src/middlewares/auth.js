const adminAuth = (req, res, next) => {
    console.log("Admin auth middleware called");
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if (!isAdminAuthorized) {
        console.log("Admin not authorized");
        res.status(401).send("Access denied. Admin privileges required.");
    } else {
        console.log("Admin authorized");
        next();
    }
};

const userAuth = (req, res, next) => {
    console.log("User auth middleware called");
    const token = "abc";
    const isUserAuthorized = token === "abc";
    if (!isUserAuthorized) {
        console.log("User not authorized");
        res.status(401).send("Access denied. User privileges required.");
    } else {
        console.log("User authorized");
        next();
    }
};

module.exports = {
    adminAuth,
    userAuth
};