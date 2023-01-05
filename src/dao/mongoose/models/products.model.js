export default class Product {
    static get model(){
        return 'Products';
    }
    static get schema(){
        return {
            name:String,
            price:Number,
            stock:Number,
            image:String,
            category:String,
            subCategory:String
        }
    }
}