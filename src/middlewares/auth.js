import jwt from 'jsonwebtoken';
import config from '../config/config.js';

export const publicValidation = (req,res,next) =>{
    try{
        const token = req.cookies[config.jwt.COOKIE];
        if(token) return res.redirect('/home');
        else next();
    }catch(error){
        next();
    }
}

export const privateValidation =(req,res,next)=>{
    try{
        const token = req.cookies[config.jwt.COOKIE];
        if(!token) return res.redirect('/account/login');
        const user = jwt.verify(token,config.jwt.SECRET);
        req.user = user;
        next();
    }catch(error){
        if(error.expiredAt){
            res.redirect('/account/login')
        }
    }
}

export const executePolicies = (policies) =>{
    return (req,res,next) =>{
        if(policies[0].toUpperCase()==="PUBLIC") return next();
        if(policies.includes(req.user.role.toUpperCase())) return next();
        res.redirect('/');
    }
}