import jwt from 'jsonwebtoken';
import services from "../services/services.js";
import config from "../config/config.js";

async function getCategory(req,res){
    res.send({message: "entro a function get category"})
}

export default {
    getCategory
    
}
