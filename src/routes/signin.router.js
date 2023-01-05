import { Router } from "express";
import __dirname from "../utils.js";
import passport from 'passport';
import userController from "../controllers/singin.controller.js";
import viewsController from "../controllers/views.controller.js";
import { publicValidation } from "../middlewares/auth.js";


const router = Router();


// LOGIN
router.post('/login',publicValidation,passport.authenticate('login',{failureRedirect:'/account/loginfail',session:false}),userController.login);

router.get('/login',publicValidation,viewsController.viewLogin);

router.get('/loginfail',publicValidation,userController.loginFail);

// LOGOUT
router.get('/logout',userController.logout);

// REGISTER
router.get('/register',viewsController.viewRegister);

router.post('/register',/*uploader.single('image'),*/passport.authenticate('register',{failureRedirect:'/account/registerfail',session:false}),userController.register);

router.get('/registerfail',userController.registerFail);

// RECOVER ACCOUNT
router.get('/recover',viewsController.forgotPassword);

router.post('/recover',userController.recover);

router.get('/restore',viewsController.changePass);

router.put('/restore',userController.changePass);

router.get('/current',userController.current);

export default router;