export default class Cart {
    static get model(){
        return 'Carts';
    }
    static get schema(){
        return {
            cart:Array,
            userID:String
        }
    }
}