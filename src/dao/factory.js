import config from "../config/config.js";

const PERSISTENCE = config.app.PERSISTENCE

export default class PersistenceFactory {
    static getPersistence = async() => {
        switch(PERSISTENCE){
            case "MONGOOSE":
                let {default:MongooseDao} = await import("../dao/mongoose/mongoose.dao.js")
                let {default:UsersDao} = await import("../dao/mongoose/users.js")
                let {default:ProductsDao} = await import("../dao/mongoose/products.js")
                let {default:CartsDao} = await import("../dao/mongoose/carts.js")
                let {default:ChatDao} = await import("../dao/mongoose/chat.js")
                return {
                    services: new MongooseDao(),
                    users: new UsersDao(),
                    products: new ProductsDao(),
                    carts: new CartsDao(),
                    chat: new ChatDao()
                }
        }
    }
}