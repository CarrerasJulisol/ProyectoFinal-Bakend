import mongoose from "mongoose";
import MongooseDao from "../mongoose/mongoose.dao.js";
import Cart from "../mongoose/models/carts.model.js";
import Product from "./models/products.model.js";

export default class Carts extends MongooseDao {
    constructor(){
        super(Cart)
        const cartsSchema = mongoose.Schema(Cart.schema);
        this.models = {
            [Cart.model] : mongoose.model(Cart.model,cartsSchema),
        }
    }

    async newCart(userID,entity){
        //this.isValidModel(entity)
        const cart = {
            cart:[],
            userID
        }
        return this.models[entity].create(cart);
    }

    async addOnetoCart(product,cartID,entity){
        //this.isValidModel(entity)
        const cart = await this.getCartID(cartID,entity)
        let exist = cart[0].cart.indexOf(product.product)
        if(exist!=-1){
            cart[0][exist].quantity++
        }else{
            cart[0].cart.push(product[0])
        }
        const getStock = await mongoose.model(Product.model).find({_id:product[0].product})
        let newStock = getStock[0].stock - product[0].quantity
        await mongoose.model(Product.model).findByIdAndUpdate({_id:product[0].product},{$set:{stock:newStock}})
        return this.models[entity].findByIdAndUpdate({_id:cart[0]._id},{$set:{cart:cart[0].cart}})
    }

    async deleteAllinCart(cartId,entity){
        //this.isValidModel(entity)
        return this.models[entity].findByIdAndUpdate({_id:cartId},{$set:{cart:[]}})
    }

    async deleteOneinCart(user,productId,entity){
        //this.isValidModel(entity)
        const cart = await this.getCartID(user,entity)
        const allinCart = cart[0].cart
        const newList = allinCart.filter(element => element.product != productId);
        const products = allinCart.filter(element => element.product == productId);
        let quantity = 0
        products.forEach(element => {
            quantity += element.quantity
        });
        const getStock = await mongoose.model(Product.model).find({_id:productId})
        let newStock = getStock[0].stock + quantity
        await mongoose.model(Product.model).findByIdAndUpdate({_id:productId},{$set:{stock:newStock}})
        return this.models[entity].findByIdAndUpdate({_id:cart[0]._id},{$set:{cart:newList}});
    }

    //all
    async getAll(entity){
        //this.isValidModel(entity)
        return this.models[entity].find()
    }

    async save(element,entity){
        //this.isValidModel(entity)
        return this.models[entity].create(element);
    }

    async getCartID(id,entity){
        //this.isValidModel(entity)
        return this.models[entity].find({userID:id})
    }

    async delete(id,entity){
        return this.models[entity].findByIdAndRemove({_id:id});
    }
}