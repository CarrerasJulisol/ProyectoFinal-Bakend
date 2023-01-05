import jwt from 'jsonwebtoken';
import services from '../services/services.js';
import config from '../config/config.js';

async function getCategory(req,res){
    try {
        if (req.cookies) {
            const user = jwt.verify(req.cookies[config.jwt.COOKIE],config.jwt.SECRET);
            const { category } = req.params
            const products = await services.productService.getByCategory(category)
            res.render('home',{
                user,
                hasProducts:products.length>0,
                allProducts:products
            })
        }else{
            res.redirect('/account/login')
        }
    } catch (error) {
        console.log(error)
    }
    
}

async function getProducts(req,res){
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

async function getProductByID(req, res){
    try {
        if (req.cookies) {
            const user = jwt.verify(req.cookies[config.jwt.COOKIE],config.jwt.SECRET);
            const { productID } = req.params
            const product = await services.productService.getID(productID)
            res.render('productDetail',{product,user})
        }else{
            res.redirect('/account/login')
        }
        
    } catch (error) {
        console.log(error)
    }
}

async function getSubcategory(req,res){
    try {
        if (req.cookies) {
            const user = jwt.verify(req.cookies[config.jwt.COOKIE],config.jwt.SECRET);
            const { subcategory } = req.params
            const products = await services.productService.getBySubCategory(subcategory)
            res.render('home',{
                user,
                hasProducts:products.length>0,
                allProducts:products
            })
        }else{
            res.redirect('/account/login')
        }
    } catch (error) {
        console.log(error)
    }
    
}

export default {
    getCategory,
    getProducts,
    getProductByID,
    getSubcategory
}