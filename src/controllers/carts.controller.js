import mailer from 'nodemailer';
import jwt from "jsonwebtoken";
import services from '../services/services.js';
import config from "../config/config.js";
import MailingService from '../services/mailing.js';

const myCart = async(req,res)=>{
    const user = jwt.verify(req.cookies[config.jwt.COOKIE],config.jwt.SECRET);
    if(!user){
        return res.render('pleaseLogin');
    }else{
        const cart = await services.cartService.getID(user.id)
        const newList = [];
        if(cart[0].cart.length>=1){
            cart[0].cart.forEach(element => {
                newList.push(element.product)
            });
        }
        const addedProducts = await services.productService.getProducts(newList);
        addedProducts.forEach(element => {
            element.quantity = 0
            cart[0].cart.forEach(e => {
                if (element._id == e.product){
                    element.quantity++
                }  
            });
        });
        let total = 0
        addedProducts.forEach(product => {
            total = total + (product.price * product.quantity)
        });
        res.render('myCart',{
            addedProducts,
            total,
            user
        })
    }
};

const saveAtCart = async(req,res)=>{
    const user = jwt.verify(req.cookies[config.jwt.COOKIE],config.jwt.SECRET);
    // data
    let data = req.body
    services.cartService.addOne(data,user.id)
    res.send({message:"guardado"})
}

const removeFromCart = async(req,res)=>{
    const user = jwt.verify(req.cookies[config.jwt.COOKIE],config.jwt.SECRET);
    const {id}=req.params
    // data
    let data = 0
    data = await services.cartService.deleteOneinCart(user.id,id)
    res.send({message:"eliminado", data})
}

const makeOrder = async(req,res)=>{
    const user = jwt.verify(req.cookies[config.jwt.COOKIE],config.jwt.SECRET);
    if(!user){
        return res.render('pleaseLogin');
    }else{
        const {idUser} =req.body
        const userDetails = await services.usersService.getID(idUser)
        const orderDetails = await services.cartService.getID(idUser)
        const mailer = new MailingService()
        let result = await mailer.changePassword({
            from:"Zero web. Nuevo pedido",
            to:`${config.gmail.MAILING_EMAIL}`,
            subject:"Nuevo pedido",
            html:`<div>
                    <h1>Pedido nuevo.</h1>
                    <p>Pedido del siguiente usuario:</p>
                    <ul>
                        <li>${user.fullName}</li>
                        <li>${user.email}</li>
                    </ul>
                    <p>Detalles del pedido:</p>
                    <ul>
                    ${orderDetails[0].cart.forEach(element => {
                        return `
                        <li>${element.product}</li>
                        <li>${element.quantity}</li>
                        `
                    })}
                    </ul>
                    <p>Detalles del envio:</p>
                    <ul>
                    <li>Direccion: ${userDetails.address.street} ${userDetails.address.houseAdd} ${userDetails.address.city}</li>
                    <li>Telefono: ${userDetails.phone}</li>
                    </ul>
                    <a href="http://localhost:8080/home">Click aquí para ir a la web</a>
                </div>`
        })
    //res.send({succes:"se envio el correo de reestablecimiento"})
        res.send(idUser)
    }
}

export default {
    myCart,
    saveAtCart,
    removeFromCart,
    makeOrder
}