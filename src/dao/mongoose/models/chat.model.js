export default class Chat {
    static get model(){
        return 'Chat';
    }
    static get schema(){
        return {
            author:String,
            email:String,
            message:String,
            date:String
        }
    }
}