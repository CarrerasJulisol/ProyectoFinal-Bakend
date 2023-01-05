import services from '../services/services.js';
import config from '../config/config.js';
import jwt from 'jsonwebtoken';

const formAddProducts = async(req,res)=>{
    try {
        if (req.cookies) {
            const user = jwt.verify(req.cookies[config.jwt.COOKIE],config.jwt.SECRET);
            res.render('formAddProduct',{user})
        }else{
            res.redirect('/account/login')
        }
    } catch(error) {
        console.log(error)
    }
}

const getAllProducts = async(req,res)=>{
    try {
        if (req.cookies) {
            const user = jwt.verify(req.cookies[config.jwt.COOKIE],config.jwt.SECRET);
            const all = await services.productService.get()
            res.render('products',{
                user,
                hasProducts:all.length>0,
                all})
            }
        else{
            res.redirect('/account/login')
        }
    } catch(error) {
        console.log(error)
    }
}


const addProduct = async (req, res)=>{
    try {
        const {name,price,stock,category,subCategory} = req.body
        console.log(name,price,stock,category,subCategory)
        if(!name||!price||!stock||!category||!subCategory) {
            return res.send({status:"error",error:"campos incompetos"})
        }
        const newProduct = {
            name,
            price,
            stock,
            image:"http://localhost:8080/img/imagen.png",
            category,
            subCategory
        }
        return services.productService.saveOne(newProduct)
    } catch (error) {
        console.log(error)
    }

}

const formUpdateProduct = async (req, res)=>{
    try {
        if (req.cookies) {
            const { pID } = req.query
            const user = jwt.verify(req.cookies[config.jwt.COOKIE],config.jwt.SECRET);
            const product = await services.productService.getID(pID)
            console.log("product DE FORM UPDATE")
            console.log(product)
            res.render('update',{
                user,
                product
            })
        }else{
            res.redirect('/account/login')
        }
    } catch (error) {
        console.log(error)
    }
}

const updateProduct = async (req, res)=>{
    try {
        if (req.cookies) {
            const { name, price, stock, category, subCategory, id } = req.body
            const user = jwt.verify(req.cookies[config.jwt.COOKIE],config.jwt.SECRET);
            const modifications = {
                name,
                price:parseInt(price),
                stock:parseInt(stock),
                category,
                subCategory,
                id
            }
            await services.productService.updateOne(modifications)
            res.send({message:"okey"})
        }else{
            res.redirect('/account/login')
        }
    } catch (error) {
        console.log(error)
    }
}

const deleteProduct = async (req, res)=>{
    try {
        if (req.cookies) {
            console.log("delete function controler prod")
            const id = req.body
            const user = jwt.verify(req.cookies[config.jwt.COOKIE],config.jwt.SECRET);
            await services.productService.deleteOne(id.productID)
            res.send({message:"producto eliminado"})
        }else{
            res.redirect('/account/login')
        }
    } catch (error) {
        console.log(error)
    }
}
const formDeleteProduct = async (req, res)=>{
    try {
        if (req.cookies) {
            const user = jwt.verify(req.cookies[config.jwt.COOKIE],config.jwt.SECRET);
            res.render('delete',{user})
        }else{
            res.redirect('/account/login')
        }
    } catch (error) {
        console.log(error)
    }
}


export default {
    formAddProducts,
    getAllProducts,
    addProduct,
    formUpdateProduct,
    updateProduct,
    deleteProduct,
    formDeleteProduct
}