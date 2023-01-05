import jwt from 'jsonwebtoken';
import services from '../services/services.js';
import config from '../config/config.js';

const getChat = async(req,res)=>{
    try {
        if (req.cookies) {
            const user = jwt.verify(req.cookies[config.jwt.COOKIE],config.jwt.SECRET);
            res.render('chatAdmin',{user})
        }else{
            res.redirect('/account/login')
        }
    } catch(error) {
        console.log(error)
    }
}

const getCart = async(req,res)=>{
    try {
        if (req.cookies) {
            const user = jwt.verify(req.cookies[config.jwt.COOKIE],config.jwt.SECRET);
            const { idCart } = req.params
            const cart = await services.cartService.getID(idCart)
            res.render('cartID',{user,cart})
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

const getProduct = async(req,res)=>{
    try {
        if (req.cookies) {
            const id = req.body
            console.log(id)
            const user = jwt.verify(req.cookies[config.jwt.COOKIE],config.jwt.SECRET);
            const product = await services.productService.getID(id)
            res.send(product)
        }else{
            res.redirect('/account/login')
        }
    } catch(error) {
        console.log(error)
    }
}

const getAllCarts = async(req,res)=>{
    try {
        if (req.cookies) {
            const user = jwt.verify(req.cookies[config.jwt.COOKIE],config.jwt.SECRET);
            const all = await services.cartService.get()
            const newList = [];
            all.forEach(element => {
                newList.push(element.cart)
            });
            let products= []
            newList.forEach(async cart=>{
                cart.forEach(e=>products.push(e.product))
                
            })
            const allProducts = await services.productService.getProducts(products)
            res.render('allCarts',{user,all,allProducts})
        }else{
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

const deleteProduct = async (req, res)=>{
    try {
        const {params} = req
        if (req.cookies) {
            const user = jwt.verify(req.cookies[config.jwt.COOKIE],config.jwt.SECRET);
            await services.productService.deleteOne(params.productID)
            res.send({message:"producto eliminado"})
        }else{
            res.redirect('/account/login')
        }
    } catch (error) {
        console.log(error)
    }
}
const deleteOneProduct = async (req, res)=>{
    try {
        const {id} = req.params
        console.log(id)
        if (req.cookies) {
            const user = jwt.verify(req.cookies[config.jwt.COOKIE],config.jwt.SECRET);
            await services.cartService.deleteOneinCart(user.id,params.productID)
            res.send({message:"producto eliminado"})
        }else{
            res.redirect('/account/login')
        }
    } catch (error) {
        console.log(error)
    }
}


export default {
    getProduct,
    getAllProducts,
    getAllCarts,
    addProduct,
    deleteProduct,
    deleteOneProduct,
    getChat,
    getCart
}

/*<!-- <% all.forEach(element => { %>
        <div class="grid-carts-admin">
            <div>Carrito ID: <%= element._id %></div>
            <div>Usuario ID: <%= element.userID %></div>
            <div>Pedido:</div>
            <% if (element.cart.length>0) { %>
                <ul>
                    <% element.cart.forEach(element => { %>
                        <% const prod = allProducts.find(el=>el._id == element.product) %>
                        <li><%= prod.name %></li>
                    <% }) %>
                </ul>
            <% } else { %>
                 <div>Aun no hay un pedido</div>
            <% } %>
        </div>
    <% }) %> --> */