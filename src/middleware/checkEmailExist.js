import bcrypt from 'bcrypt'
import { appError } from '../utils/appError.js'
import { User } from '../../dbConnection/models/user.model.js'


export const checkEmailExist = async (req, res, next) => {
    let findEmail = await User.findOne({ email: req.body.email })
    if (findEmail) return next(new appError('email already exists', 409))
    req.body.password = bcrypt.hashSync(req.body.password, 8)
    next()
}

export const checkUpdateDateExist = async (req, res, next) => {
    let user = await User.findById(req.params.id)
    if (user.email !== req.body.email) {
        const emailExists = await User.findOne({ email: req.body.email });
        if (emailExists) return next(new appError("email already exists", 400))
    }

    next()
}