import mongoose from "mongoose";
import MongooseDao from "../mongoose/mongoose.dao.js";
import User from "../mongoose/models/users.model.js";

export default class Users extends MongooseDao {
    constructor(){
        super()
        const userSchema = mongoose.Schema(User.schema);
        this.models = {
            [User.model] : mongoose.model(User.model,userSchema),
        }
    }

    async getByEmail(email,entity) {
        //this.isValidModel(entity)
        return this.models[entity].findOne({email:email})
    }

    async addCartID(userID,cartID,entity){
        //this.isValidModel(entity)
        return this.models[entity].findByIdAndUpdate({_id:userID},{$set:{cartID:cartID}})
    }

    async changePassword(userID,newPassword,entity){
        return this.models[entity].findByIdAndUpdate({_id:userID},{$set:{password:newPassword}})
    }

    // all
    isValidModel(entity){
        if (!this.models[entity]) {
            throw new Error('Entity not defined on Mongoose DAOS')
        }
    }

    async getAll(entity){
        //this.isValidModel(entity)
        return this.models[entity].find()
    }

    async save(element,entity){
        //this.isValidModel(entity)
        return this.models[entity].create(element);
    }

    async getByID(id,entity){
        //this.isValidModel(entity)
        return this.models[entity].findOne({_id:id}).lean();
    }

    async delete(id,entity){
        return this.models[entity].findByIdAndRemove({_id:id});
    }
}