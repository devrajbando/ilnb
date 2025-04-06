import { Router } from "express";
import {registerUser,LoginUser,LogoutUser,CurrentUser} from '../controllers/user.controller.js'
import {verifyJWT} from '../middleware/auth.middleware.js'






const userRouter=Router()

userRouter.route('/signup').post(registerUser)
userRouter.route('/verify').get(verifyJWT, async (req, res) => {
    res.json({ user: req.user })
  })
userRouter.route('/login').post(LoginUser)

userRouter.route('/logout').post(verifyJWT,LogoutUser)



export default userRouter