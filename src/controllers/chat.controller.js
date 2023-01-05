import jwt from 'jsonwebtoken';
import services from '../services/services.js';
import config from '../config/config.js';

const getChat = async(req,res)=>{
    try {
        if (req.cookies) {
            const user = jwt.verify(req.cookies[config.jwt.COOKIE],config.jwt.SECRET);
            const all = await services.chatService.get()
            console.log(user)
            res.render('chat',{user,all})
        }else{
            res.redirect('/account/login')
        }
    } catch(error) {
        console.log(error)
    }
}

const postNewMessage = async(req,res)=>{
    try {
        if (req.cookies) {
            const user = jwt.verify(req.cookies[config.jwt.COOKIE],config.jwt.SECRET);
            res.send({message:"mensajes"})
        }else{
            res.redirect('/account/login')
        }
        res.status(200).send(all)
    } catch(error) {
        console.log(error)
    }
}

export default {
    getChat,
    postNewMessage
}

