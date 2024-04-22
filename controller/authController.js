
const signup = (req, res,next) => {
    res.json({
        status : "success",
        message : "user created successfully"
    })
}

module.exports = {signup}

