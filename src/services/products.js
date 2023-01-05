import Product from "../dao/mongoose/models/products.model.js";
import GenericRepository from "../services/genericRepository.js";

export default class ProductRepository extends GenericRepository {
    constructor(dao){
        super(dao,Product.model);
    }

    async getByName(name){
        return this.dao.getByName(name,this.entity);
    }
    
    async getByCategory(category){
        return this.dao.getByCategory(category,this.entity);
    }
    
    async getBySubCategory(subCategory){
        return this.dao.getBySubCategory(subCategory,this.entity);
    }
    
    async getAvailable(){
        return this.dao.getAvailable(this.entity);
    }
    
    async getBetween(min,max){
        return this.dao.getBetween(min,max,this.entity);
    }

    async getProducts(list){
        console.log(list)
        return this.dao.getInfo(list,this.entity)
    }

    async updateOne(product){
        return this.dao.updateProduct(product,this.entity)
    }
    //all
    async get(){
        return this.dao.getAll(this.entity)
    }

    async saveOne(user){
        return this.dao.save(user,this.entity)
    }

    async getID(id){
        return this.dao.getByID(id,this.entity)
    }

    async deleteOne(id){
        return this.dao.delete(id,this.entity)
    }
}

