const express = require('express');
const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI');
const path = require('path')
const Chat = require('./models/Chat');


const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const app = express();


const server = http.createServer(app);
const io = socketio(server, {
    cors:{
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

//bodyParser middleware
app.use(express.json());
app.use(cors());

//Mongoose Connection
// mongoose
//     .connect(db,{ useNewUrlParser: true ,useCreateIndex:true, useUnifiedTopology: true})
//     .then( console.log('Connected to Mongoose') )
//     .catch(err=> console.log(err))

(async () => {
    try {
        await mongoose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true})
        console.log('Connected to Mongoose')
    } catch (err) {
        console.log('error: ' + err)
    }
})()

// require("./models/User")
// require("./models/Post")

//routes
app.use('/api/signup',require('./routes/api/signup'));
app.use('/api/login',require('./routes/api/login'));
app.use('/api/fetchPosts',require('./routes/fetchPosts'));
// app.use('/api/addPost',require('./routes/addPost'));
app.use('/api/addFPost',require('./routes/addFPost'));
app.use('/api/addComment',require('./routes/addComment'));
app.use('/api/addLike',require('./routes/addNewLike'));
//profile routes
app.use('/api/fetchProfileUser',require('./routes/fetchProfileUser'));
app.use('/api/fetchProfilePost',require('./routes/fetchProfilePost'));
app.use('/api/updateUserImage',require('./routes/updateUserImage'));
app.use('/api/updateUserDetails',require('./routes/updateUserDetails'));
app.use('/api/fetchUsers',require('./routes/fetchUsers'));
//news routes
app.use('/api/fetchNews',require('./routes/fetchNews'));
app.use('/api/addNews',require('./routes/addNews'));
//nfts
app.use('/api/fetchNfts',require('./routes/fetchNfts'));
app.use('/api/mintNft',require('./routes/mintNft'));

// //Serve static asserts if in production
// if(process.env.NODE_ENV === 'production' || true){
//     //Set static folder
//     app.use(express.static('client/build'));

//     app.get('*', (req,res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//     })
// }

io.on("connect",(socket) => {
    console.log("Socket connected")
    socket.on('join', ({ name, room }) => {
        // console.log(name)
    console.log("room joined")
    // Show saved chats
    Chat.find()
    // .sort({ date: -1 })
    .sort({ _id: -1 })
    .limit(400)
    .sort({ _id: 1 })
    .then(chatarr => {
        // res.json(chats)
        // console.log(chatarr)
        socket.emit("chatarr", chatarr) //to a particular user.
    })
    if(name != "undefined undefined"){
        io.emit("has_join", {id:-1,name,message:" has joined the chat."}) //broadcasting using io.
    }
    socket.on("chat", (payload) => {
        // console.log("Payload:",payload)
        const { id, name, message } = payload;

        const newChat = new Chat({
            id,
            name,
            message
        })
        newChat.save()
        .then(chat => {
            io.emit("chat", chat)
        })
        // io.emit("chat", payload)
    })

    socket.on('forceDisconnect', function({ name,room }){
        try{
            console.log('[socket]','leave room :', room);
            socket.leave(room);
            if(name != "undefined undefined"){
                io.emit("has_join", {id:-1,name,message:" has left the chat."})
            }
            socket.disconnect();
            // socket.to(room).emit('user left', socket.id);
          }catch(e){
            console.log('[error]','leave room :', e);
            socket.emit('error','couldnt perform requested action');
          }
        // socket.disconnect();
    });


    socket.on('disconnect', () => {
        console.log('disconnected')
        try{
            console.log('[socket]','leave room :', room);
            socket.leave(1);
            // socket.to(room).emit('user left', socket.id);
          }catch(e){
            console.log('[error]','leave room :', e);
            socket.emit('error','couldnt perform requested action');
          }
        // if(name != "undefined undefined"){
        //     io.emit("has_join", {id:-1,name,message:" has left the chat."})
        // }
      // const user = removeUser(socket.id);
  
      // if(user) {
      //   io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      //   io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
      // }
    })
    })


})


const port = process.env.PORT || 5000 ;
server.listen(port, ()=>{console.log(`server running on port ${port}`)});
// app.listen(5000);