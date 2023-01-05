import config from '../config/config.js';
import jwt from 'jsonwebtoken';
import mailer from 'nodemailer';
import MailingService from '../services/mailing.js';
import services from '../services/services.js';
import { createHash } from '../utils.js';

const login = async(req,res)=>{
    try {
        console.log('login controller')
        const loginUser = {
            fullName:`${req.user.name} ${req.user.lastName}`,
            email:req.user.email,
            cart:req.user.cartID,
            id:req.user._id,
            role:req.user.role
        }
        const token = jwt.sign(loginUser,config.jwt.SECRET,{expiresIn:3600});
        console.log(token)
        res.cookie(config.jwt.COOKIE,token,{maxAge:3600000,httpOnly:true}).redirect('/home')
    } catch (error) {
        console.log(error)
    }
}

const loginFail = (req, res) =>{
    res.status(500).send({status:"error",error:"Error al intentar iniciar sesión."});
}

const logout = (req, res)=> {
    if(req.cookies){
        console.log(req.cookies)
        res.clearCookie(config.jwt.COOKIE).redirect('/account/login');
    }else{
        res.send("hubo un error")
    }
}

const register = async(req,res)=>{
    res.send({status:"success",message:"Usuario creado con exito"}).redirect('/account/login')
}

const registerFail = async(req,res)=>{
    res.status(500).send({status:"error",error:"Algo salió mal."})
}

const current =  async (req, res)=> {
    try {
        const token = req.cookies[config.jwt.COOKIE];
        if(!token) {
            res.send({status:"success",error:"no hay una sesion abierta"})
        }
        const user = jwt.verify(token,config.jwt.SECRET);
        res.send(user);
    } catch (error) {
        if(error.expiresAt){
            res.send({status:"error",error:"token expirado"})
        }
    }
}

const recover = async (req,res) => {
    const { email } = req.body
    const mailer = new MailingService()
    let result = await mailer.changePassword({
        from:"Zero web. Recuperar contraseña",
        to:email,
        subject:"Cambiar contraseña",
        html:`<div>
        <h1>Solicitud de cambio de contraseña</h1>
        <p>Haga click en el siguiente enlace para cambiar su contraseña:</p>
        <a href="http://localhost:8080/account/restore?tkn=${jwt.sign({email},config.jwt.SECRET,{expiresIn:3600})}">Click aquí</a>
        </div>`
    })
    res.send({succes:"se envio el correo de reestablecimiento"})
}

const changePass = async (req, res) => {
    try {
        const { password, newPassword, token } = req.body
        let { email } = jwt.verify(token,config.jwt.SECRET)
        if(!password||!newPassword){
            return res.send({status:"success",message:"Completa los campos"})
        }
        if(password===newPassword){
            const user = await services.usersService.getEmail(email)
            user.password = await createHash(newPassword)
            await services.usersService.changePassword(user)
            return res.send({status:"success",message:"Constraseña cambiada con exito"}).redirect('/account/login')
        }else{
            return res.send({status:"error",message:"Las constraseñas no coinciden"})
        }
    } catch (error) {
        return res.send({status:"error",error})
    }
}


export default {
    login,
    loginFail,
    register,
    registerFail,
    logout,
    current,
    recover,
    changePass
}