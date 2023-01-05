import passport from "passport";
import local from 'passport-local';
import mailer from 'nodemailer';
import { createHash, isValidPassword, uploader } from "../utils.js";
import services from "../services/services.js";
import config from "./config.js";
import MailingService from "../services/mailing.js";

const LocalStrategy = local.Strategy;
//const Uploader = uploader

const initializePassport = () =>{
    passport.use('register',new LocalStrategy({passReqToCallback:true,usernameField:"email"},
    async (req, email, password, done)=>{
        try{
            const { name, lastName, street, houseAdd, city, birthday, phone } = req.body;
            const address = {
                street:street,
                houseAdd:houseAdd,
                city:city
            }
            if(!name||!lastName||!email||!password||!street||!houseAdd||!city||!birthday||!phone){
                return done(null,false,{message:"Valores incompletos"})
            };
            //verificamos si el usuario existe
            const exists = await services.usersService.getEmail(email);
            if(exists){
                return done(null,false,{message:"Ya existe un usuario registrado con este e-mail."})
            };
            //lo guardamos en la base
            const newUser = {
                name,
                lastName,
                email,
                password:createHash(password),
                address:address,
                birthday,
                phone,
                //image:req.file.filename,
                role:'user'
            }
            let result = await services.usersService.saveOne(newUser);
            // agregar id de su carrito al usuario
            let user = await services.usersService.getEmail(email);
            let cart = await services.cartService.addCart(user._id);
            await services.usersService.addIdCart(user._id,cart._id);
            //enviar mail nuevo usuario
            const mailer = new MailingService()
            let newUserMail = await mailer.newClient({
                from:"Zero web",
                to:`${config.gmail.MAILING_EMAIL}`,
                subject:"Nuevo usuario registrado",
                html:`<div>
                        <h1>Nuevo usuario registrado en la web!</h1>
                        <p>Conoce al nuevo usuario:</p>
                        <ul>
                            <li>${newUser.name}</li>
                            <li>${newUser.email}</li>
                        </ul>
                        <a href="http://localhost:8080/home">Click aquí para ir a la web</a>
                    </div>`
            })
            return done(null,result)
        }catch(error){
            done(error)
        }
    }))

    passport.use('login',new LocalStrategy({usernameField:'email'},async(email, password, done)=>{
        try {
            console.log('login passport')
            if(!email||!password){
                return done(null,false,{message:"Valores incompletos"});
            }
            if((email===config.session.ADMIN_EMAIL)&(password===config.session.ADMIN_PWD)){
                const adminUser = {
                    name:"Admin",
                    role:'admin',
                    id:0
                }
                return done(null,adminUser);
            }else{
                let user = await services.usersService.getEmail(email);
                console.log(user)
                if(!user){
                    return done(null,false,{message:"No existe un usuario con esa direccion de correo."});
                }
                if(!isValidPassword(user,password)){
                    return done(null,false,{message:"La contraseña es incorrecta."});
                }
                return done(null,user);
            }
        } catch (error) {
            return done(error)
        }
    }))

    passport.serializeUser((user,done)=>{
        done(null,user.id)
    })

    passport.deserializeUser(async(id,done)=>{
        let result = await services.usersService.getID(id);
        return done(null,result);
    })
}

export default initializePassport;