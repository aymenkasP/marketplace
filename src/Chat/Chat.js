import React, { useState, useRef, useEffect , useMemo } from 'react'


import { ChatEngineWrapper, Socket, ChatFeed } from 'react-chat-engine'
import { getOrCreateChat } from '../helper/ChatHalper'
import { supabase } from '../supabase/supabaseClient'

const Chat = ({sellerUsername}) => {
    const didMountRef = useRef(false)
    const [chat, setChat] = useState(null)
    const user = supabase.auth.user()
    const headers =useMemo(()=> ( {
        'Project-ID': process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID,
        'User-Name': user.email,
        'User-Secret': user.id,
    }),[user])

    

    useEffect(() => {
        if (!didMountRef.current) {
             didMountRef.current = true
            const data = {
                "usernames": [user.email, sellerUsername],
                "is_direct_chat": true
            }

         getOrCreateChat(headers, data, chat => setChat(chat) )
        
        }
    }, [headers , sellerUsername ,user ])

    
    if (chat) return <p>loding</p>
    
    return (
        <div >
             
            <ChatEngineWrapper >
                <Socket 
                    projectID={headers['Project-ID']}
                    userName={headers['User-Name']}
                    userSecret={headers['User-Secret']}
                />
                <ChatFeed activeChat={chat?.id} />
            </ChatEngineWrapper>
        </div>
    )
}

export default Chat