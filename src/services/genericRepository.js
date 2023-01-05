export default class GenericRepository {
    constructor(dao,entity) {
        this.dao = dao;
        this.entity = entity;
    }

    /*async get(){
        return this.dao.users.getAll(this.entity)
    }

    async saveOne(user){
        return this.dao.users.save(user,this.entity)
    }

    async getID(id){
        return this.dao.users.getByID(id,this.entity)
    }

    async deleteOne(id){
        return this.dao.users.delete(id,this.entity)
    }*/
}