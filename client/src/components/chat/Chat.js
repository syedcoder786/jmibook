import React, { useEffect, useState, useRef } from 'react';
import '../../styles/chatstyle.css';
import io from 'socket.io-client'
import { connect } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';

import { Link } from 'react-router-dom'

import { socketProxy } from "../../config/default"


function Chat(props) {

    const [message,setMessage] = useState('')
    const [chat,setChat] = useState([])
    const [messagesEndRef,setMessagesEndRef] = useState(React.createRef())
    const socket = useRef(null)

    useEffect(() => {
        return () => {
            console.log(`You changed the page`)
            const room = 1
            const name = props.user.fname + ' ' + props.user.lname;
            socket.current.emit('forceDisconnect', { name, room });
        }
    },[])

    useEffect(()=> {
        socket.current = io.connect(socketProxy)
        const room = 1;
        const name = props.user.fname + ' ' + props.user.lname;
        console.log(name)

        socket.current.emit('join', { name, room }, (error) => {
            if(error) {
                console.log(error)
                alert(error);
            }
            else{
                console.log("client con")
            }
        });
    },[])


    useEffect(() => {

        console.log("Running")
        socket.current.on("chatarr", (payloadarr) => {
            setChat(payloadarr)  // This code will change chat only one time.
            // setChat((chat) => [payloadarr,...chat]) // Changing using function becoz it ll render one time only.
            scrollToBottom()
        })

        socket.current.on("has_join", (joindata) => {
            setChat((chat) => [...chat,joindata])  // This code will change chat only one time.
            // setChat((chat) => [payloadarr,...chat]) // Changing using function becoz it ll render one time only.
            scrollToBottom()
        })

        socket.current.on("chat", (payload) => {
        // setChat([payload,...chat])  // This code will change chat only one time.
        setChat((chat) => [...chat,payload]) // Changing using function becoz it ll render one time only.
        scrollToBottom()
        })

    },[])
  
    const onClick = (e) => {
      e.preventDefault();
      const newmsg = {
          id:props.user._id,
          name:props.user.fname+' '+props.user.lname,
          message
      }
      if(message.trim().length > 0 && props.user){
        socket.current.emit("chat",newmsg)
        setMessage("")
      }
    }

    const onChange = (e) => {
        setMessage(e.target.value);
    }

    const onKeyPress = (e) => {
        // e.preventDefault();
        const newmsg = {
            id:props.user._id,
            name:props.user.fname+' '+props.user.lname,
            message
        }
        if (e.key === 'Enter') {
            if(message.trim().length > 0){
                socket.current.emit("chat",newmsg)
                setMessage("")
            }
        }
    }

    const chatarr = chat.map((payload) => 
    (
        // <h1 key={uuidv4()}>{payload.message}</h1>
        // props.user._id === payload.id
        <div class="chatmsg" key={uuidv4()} style={{left: props.user._id === payload.id ? "38%": "",
            color: props.user._id === payload.id ? "white": "black",
            backgroundColor: props.user._id === payload.id ? "#446078": "white"
        }}>
            {payload.id === -1?(<center><h6 style={{color:payload.message===" has left the chat."?"red":"#50C878"}}><b>{payload.name}{payload.message}</b></h6></center>):(<h6><span style={{color:""}}><Link to={"profile/"+payload.id} style={{textDecoration:"none", color:"#5688EE"}}>{props.user._id === payload.id?"You":payload.name}:</Link></span>  {payload.message}</h6>)}
        </div>
      ))


    const scrollToBottom = () => {
        const newmessagesEndRef = messagesEndRef;
        if(newmessagesEndRef.current)
            newmessagesEndRef.current.scrollIntoView()
    }

    return (
        <div>
            <div class="containerchat">
                <div class="chatshow">
                    {chatarr}
                    <div ref={messagesEndRef} />
                </div>
                <center>
                <div class="chatarea">
                    <input 
                        type="text" 
                        name="chat" 
                        class="chattext" 
                        placeholder="Chat here..."
                        onChange={onChange}
                        value={message}
                        onKeyPress={onKeyPress}
                    />
                    <button class="sendmsg" onClick={onClick}>Send</button>
                </div>
                </center>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    user:state.auth.user,
});

export default connect(mapStateToProps,{})(Chat);
// export default Chat;