const User = require('../models/User');

const signup = (req, res,next) => {

    const body = req.body;

    const newUser = User.create({
        fullname : body.fullname,

    })

}

module.exports = {signup}

