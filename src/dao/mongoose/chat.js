import mongoose from "mongoose";
import MongooseDao from "../mongoose/mongoose.dao.js";
import Chat from "../mongoose/models/chat.model.js";

export default class ChatDAO extends MongooseDao {
    constructor(){
        super(Chat)
        const chatSchema = mongoose.Schema(Chat.schema);
        this.models = {
            [Chat.model] : mongoose.model(Chat.model,chatSchema)
        }
    }

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

    async getManyById(id,entity){
        return this.models[entity].find({email:{$in:id}})
    }
}