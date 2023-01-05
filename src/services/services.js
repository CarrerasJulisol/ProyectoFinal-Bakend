import PersistenceFactory from '../dao/factory.js';
import UserRepository from './users.js';
import ProductRepository from './products.js';
import CartsRepository from './carts.js'
import ChatRepository from './chat.js';

const dao = await PersistenceFactory.getPersistence();

const usersService =  new UserRepository(dao.users);
const productService =  new ProductRepository(dao.products);
const cartService =  new CartsRepository(dao.carts);
const chatService =  new ChatRepository(dao.chat);

const services = {
    usersService,
    productService,
    cartService,
    chatService
}

export default services;