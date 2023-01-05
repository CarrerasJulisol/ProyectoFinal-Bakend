import User from "../dao/mongoose/models/users.model.js";
import GenericRepository from "../services/genericRepository.js";

export default class UserRepository extends GenericRepository {
    constructor(dao){
        super(dao,User.model);
    }

    async getEmail(email){
        return this.dao.getByEmail(email,this.entity)
    }

    async addIdCart(userID,CartID){
        return this.dao.addCartID(userID,CartID,this.entity)
    }

    async changePassword(user) {
        return this.dao.changePassword(user._id,user.password,this.entity)
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

