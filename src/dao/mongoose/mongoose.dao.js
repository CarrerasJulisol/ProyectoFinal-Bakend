import mongoose from "mongoose";
import User from "../mongoose/models/users.model.js";
import Product from "../mongoose/models/products.model.js";
import Cart from "../mongoose/models/carts.model.js"
import config from "../../config/config.js";

export default class MongooseDao {
    constructor(){
        mongoose.connect(`mongodb+srv://${config.mongo.USER}:${config.mongo.PWD}@proyecto-carreras.appkwcp.mongodb.net/${config.mongo.DB}?retryWrites=true&w=majority`)
        /*const userSchema = mongoose.Schema(User.schema);
        const productSchema = mongoose.Schema(Product.schema);
        const cartSchema = mongoose.Schema(Cart.schema);
        this.models = {
            [User.model] : mongoose.model(User.model,userSchema),
            [Product.model] : mongoose.model(Product.model,productSchema),
            [Cart.model] : mongoose.model(Cart.model,cartSchema)
        }*/
    }
    
    /*isValidModel(entity){
        if (!this.models[entity]) {
            throw new Error('Entity not defined on Mongoose DAOS')
        }
    }

    async getAll(entity){
        this.isValidModel(entity)
        return this.models[entity].find()
    }

    async save(element,entity){
        this.isValidModel(entity)
        return this.models[entity].create(element);
    }

    async getByID(id,entity){
        this.isValidModel(entity)
        return this.models[entity].findOne({_id:id}).lean();
    }

    async delete(id,entity){
        return this.models[entity].findByIdAndRemove({_id:id});
    }*/
}