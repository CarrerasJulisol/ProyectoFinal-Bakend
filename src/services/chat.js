import Chat from "../dao/mongoose/models/chat.model.js";
import GenericRepository from "../services/genericRepository.js";

export default class ChatRepository extends GenericRepository {
    constructor(dao){
        super(dao,Chat.model);
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

    async getManyById(id){
        return this.dao.getManyById(id,this.entity)
    }

    async deleteOne(id){
        return this.dao.delete(id,this.entity)
    }
}

