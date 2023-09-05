import React, { useState, useEffect ,useRef} from "react";

import styled from "styled-components";
import axios from "axios";
import {sendMessageRoute,getAllMessageRoute} from '../utils/APIRoutes'
import LogOut from "./LogOut.jsx";
import ChatInput from "./ChatInput.jsx";
import Message from "./Message.jsx";




export default function ChatContainer({currentChat,currentUser,socket}){

    const[messages,setMessage] = useState([]);
    const[arrivalMessage,setArrivalMessage] = useState(null);
    const scrollRef = useRef();


    const call = async () => {
      try {
        if (currentChat && currentChat._id) {
          const response = await axios.post(getAllMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
          });
          setMessage(response.data);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    
    useEffect(()=>{    

       call();
    },[currentChat]);

    const handleSendMsg = async(msg)=>{
     await axios.post(sendMessageRoute,{

      from: currentUser._id,
      to:currentChat._id,
      message:msg,

     });
     socket.current.emit("send-msg",{
      to:currentChat._id,
      from :currentUser._id,
      message:msg,
     });

     const msgs = [...messages];
     msgs.push({fromSelf:true,message:msg});
     setMessage(msgs);



    };

    useEffect(() => {
      arrivalMessage && setMessage((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);
  
    useEffect(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    
    return (
      <>{
        currentChat &&
      (<Container>
       <div className ="chat-header">

         <div className ="user-details">

            <div className ="avatar">

              <img src= {`data:image/svg+xml;base64,${currentChat.avatarImage}`}  alt="avatar" />               
                
            </div>  

            <div className ="username">

                <h3>{currentChat.username}</h3>           
            
            </div>              
        
         </div>  

         <LogOut/>
        
        </div>  
        <div className="chat-messages">

          {
          messages.map((message)=>{
             return(
              <div>

                <div className={`message ${message.fromSelf ? "sended" :"recieved"}`} >

                  <div className="content">
                    <p>
                      {message.message}
                    </p>
                  </div>
                 
                
                </div>
              </div>

             );
          })
          
        }

        </div>
        
       < ChatInput handleSendMsg = {handleSendMsg}/>
       < Message/>
        
        
              
       

      </Container>)
}
      
      </>
       
    );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;