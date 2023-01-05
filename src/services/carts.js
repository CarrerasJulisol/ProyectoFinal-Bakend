import Cart from "../dao/mongoose/models/carts.model.js";
import GenericRepository from "../services/genericRepository.js";

export default class CartsRepository extends GenericRepository {
    constructor(dao){
        super(dao,Cart.model);
    }

    async addCart(userID){
        return this.dao.newCart(userID, this.entity);
    }

    async addOne(product,cartID){
        return this.dao.addOnetoCart(product,cartID,this.entity);
    }

    async deleteAllinCart(cartId){
        return this.dao.deleteAllinCart(cartId,this.entity);
    }

    async deleteOneinCart(user,productId){
        return this.dao.deleteOneinCart(user,productId,this.entity);
    }

    //all
    async get(){
        return this.dao.getAll(this.entity)
    }

    async saveOne(user){
        return this.dao.save(user,this.entity)
    }

    async getID(id){
        return this.dao.getCartID(id,this.entity)
    }

    async deleteOne(id){
        return this.dao.delete(id,this.entity)
    }
}

