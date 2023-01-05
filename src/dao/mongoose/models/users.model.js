export default class User {
    static get model(){
        return 'Users';
    }
    static get schema(){
        return {
            name:String,
            lastName:String,
            birthday:String,
            email:String,
            password:String,
            phone:Number,
            address:Object,
            role:String,
            CartID:String
        }
    }
}