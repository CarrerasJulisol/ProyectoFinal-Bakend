import express from "express";
import passport from 'passport';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { Server } from "socket.io";
import __dirname from "./utils.js";
import config from "./config/config.js";
import initializePassport from "./config/passport.config.js";
import services from "./services/services.js";
import viewHome from "./routes/home.router.js";
import viewSignIn from "./routes/signin.router.js";
import myCartRouter from "./routes/myCart.router.js";
import apiRouter from "./routes/api.router.js"
import productsRouter from "./routes/products.router.js"
import chatRouter from "./routes/chat.router.js"
import filterRouter from "./routes/filter.router.js"
import pruebaRouter from "./routes/prueba.router.js"

const app = express();
let PORT = config.app.PORT
const server = app.listen(PORT, ()=> console.log(`Server listening on ${PORT}`));
const io = new Server(server)
app.set('views',__dirname+'/views');
app.set('view engine','ejs');

app.use(express.json());
app.use(express.static(__dirname+'/public'))
app.use(express.urlencoded({extended: true}))

app.use(cors())
app.use(cookieParser())
initializePassport();
app.use(passport.initialize());

app.use('/',viewHome);
app.use('/account',viewSignIn);
app.use('/my-cart',myCartRouter);
app.use('/api',apiRouter)
app.use('/form',productsRouter)
app.use('/products',filterRouter)
app.use('/chat',chatRouter)
app.use('/prueba',pruebaRouter)

io.on('connection',async (socket) => {
    const chat = await services.chatService.get()
    io.emit('connectionChat',chat)
    socket.on('messages',async data => {
        const user = await services.usersService.getID(data.idUser)
        data.author = `${user.name} ${user.lastName}`
        data.email = user.email
        await services.chatService.saveOne(data)
        const readChat = await services.chatService.get()
        io.emit("newMessage",readChat)
    })
    socket.on('adminMessages',async data => {
        console.log(data)
        await services.chatService.saveOne(data)
        const readChat = await services.chatService.get()
        io.emit("newMessage",readChat)
    })
    socket.on('myMessages',async data => {
        const user = await services.usersService.getID(data)
        const messages = await services.chatService.getManyById(user.email)
        io.emit("myListMessages",messages)
    })
})