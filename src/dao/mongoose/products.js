import mongoose from "mongoose";
import MongooseDao from "../mongoose/mongoose.dao.js";
import Product from "../mongoose/models/products.model.js";

export default class Products extends MongooseDao {
    constructor(){
        super(Product)
        const productSchema = mongoose.Schema(Product.schema);
        this.models = {
            [Product.model] : mongoose.model(Product.model,productSchema)
        }
    }

    async getByName(prodName,entity) {
       // this.isValidModel(entity)
        return this.models[entity].find({name:prodName})
    }

    async getByCategory(category,entity) {
       // this.isValidModel(entity)
       console.log(category)
        return this.models[entity].find({category:{$in:category}})
    }

    async getBySubCategory(subCategory,entity) {
       // this.isValidModel(entity)
        return this.models[entity].find({subCategory:{$in:subCategory}})
    }

    async getAvailable(entity){
       // this.isValidModel(entity)
        return this.models[entity].find({stock:{$gte:1}})
    }

    async getBetween(min,max,entity){
       // this.isValidModel(entity)
        return this.models[entity].find({price:{$and:[{$lte:max},{$gte:min}]}})
    }

    async getInfo(list,entity){
        return this.models[entity].find({_id:{$in:list}})
    }
    
    async updateProduct(product,entity){
        const oldProduct = await this.getByID(product.id,entity)
        if (oldProduct.name != product.name){
            return this.models[entity].findByIdAndUpdate({_id:product.id},{$set:{name:product.name}})
        }
        if (oldProduct.price != product.price){
            return this.models[entity].findByIdAndUpdate({_id:product.id},{$set:{price:product.price}})
        }
        if (oldProduct.stock != product.stock){
            return this.models[entity].findByIdAndUpdate({_id:product.id},{$set:{stock:product.stock}})
        }
        if (oldProduct.category != product.category){
            return this.models[entity].findByIdAndUpdate({_id:product.id},{$set:{category:product.category}})
        }
        if (oldProduct.subCategory != product.subCategory){
            return this.models[entity].findByIdAndUpdate({_id:product.id},{$set:{subCategory:product.subCategory}})
        }
        return "Producto modificado"
    }

    //all
    async getAll(entity){
       // this.isValidModel(entity)
        return this.models[entity].find()
    }

    async save(element,entity){
       // this.isValidModel(entity)
        return this.models[entity].create(element);
    }

    async getByID(id,entity){
       // this.isValidModel(entity)
        return this.models[entity].findOne({_id:id}).lean();
    }

    async delete(id,entity){
        return this.models[entity].findByIdAndRemove({_id:id});
    }
}