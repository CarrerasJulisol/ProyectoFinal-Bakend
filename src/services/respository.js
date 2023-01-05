
export default class RepositoryFactory {
    static getRepository = async(type) => {
        switch(type){
            case "Users":
                let {default:UsersDao} = await import("../dao/mongoose/users.js")
                return {
                    services: new UsersDao()
                }
            case "Products":
                let {default:ProductsDao} = await import("../dao/mongoose/products.js")
                return {
                    services: new ProductsDao()
                }
            case "Carts":
                let {default:CartsDao} = await import("../dao/mongoose/carts.js")
                return {
                    services: new CartsDao()
                }
            case "Chat":
                let {default:ChatDao} = await import("../dao/mongoose/chat.js")
                return {
                    services: new ChatDao()
                }
        }
    }
}