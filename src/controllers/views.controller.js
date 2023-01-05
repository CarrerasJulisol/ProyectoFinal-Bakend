import jwt from 'jsonwebtoken';
import services from "../services/services.js";
import config from "../config/config.js";

async function viewHome(req, res){
    try {
        if (req.cookies) {
            res.redirect('/')
        }else{
            res.redirect('/account/login')
        }
        
    } catch (error) {
        console.log(error)
    }
}

const viewProducts = async(req,res)=>{
    //hay una sesion iniciada?
    if (req.cookies) {
        const user = jwt.verify(req.cookies[config.jwt.COOKIE],config.jwt.SECRET);
        const allProducts = await services.productService.get()
        res.render('home',{
            user,
            hasProducts:allProducts.length>0,
            allProducts
        })
    }else{
        res.redirect('/account/login')
    }
}

const viewRegister = (req, res)=> {
    res.render('register')
};

const viewLogin = (req, res)=> {
    res.render('login')
};

const forgotPassword = (req, res)=> {
    res.render('recover')
};

const changePass = (req, res)=> {
    res.render('newPassword')
};


export default {
    viewHome,
    viewProducts,
    viewLogin,
    viewRegister,
    forgotPassword,
    changePass
}