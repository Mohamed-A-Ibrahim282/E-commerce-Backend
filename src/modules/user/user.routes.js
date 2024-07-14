import { Router } from "express";
import { checkEmailExist, checkUpdateDateExist } from './../../middleware/checkEmailExist.js';
import { deleteUser, forgetPassword, getUserAccountData, resetPassword, signin, signup, updatePassword, updateUser } from "./user.controller.js";
import { verifyToken } from './../../middleware/verifyToken.js';
import { signinValidation, signupValidation, updateUserValidation } from "./user.validation.js";
import { validate } from './../../middleware/validate.js';


const userRouter = Router()

// 1-signup
userRouter.post('/signup', validate(signupValidation), checkEmailExist, signup)

// 2-signin
userRouter.post('/signin', validate(signinValidation), signin)

// 3-update account
userRouter.put('/:id', checkUpdateDateExist, verifyToken, validate(updateUserValidation), updateUser)

// 4-delete user
userRouter.delete('/:id', verifyToken, deleteUser)

// 5-Get user account data 
userRouter.get('/', verifyToken, getUserAccountData)

// 6-Update password 
userRouter.post('/:id', verifyToken, updatePassword)

// 7-Forget password
userRouter.post('/password/forgetPassword', forgetPassword)
userRouter.post('/password/resetPassword', resetPassword)


export default userRouter