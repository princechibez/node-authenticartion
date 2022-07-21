const grantAccess = (roles) => {
    return (req, res, next) => {
        try {
            if (!req.user) {
                let error = new Error("Not authenticated");
                error.httpStatusCode = 401
                throw error
            }
            let permitted = false;
        for (let role in roles) {
            if (roles[role] === req.user.roles[role]) {
                permitted = true
                console.log("Truish")
                break
            };
        }
        if (!permitted) {
            return res.status(401).json("You have no access to this route")
        }
        next()
        } catch (err) {
            err.httpStatusCode = 500;
            next(err)
        }
    }
}

module.exports = grantAccess;