import { ChatEngine } from 'react-chat-engine';
import { supabase } from "../supabase/supabaseClient";

export default function Chat() {
    const projectID = process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID
    const user = supabase.auth.user()

    
  return (
    <div>
        <ChatEngine
        projectID={projectID}
        userName={user.email}
        userSecret={user.id}
		/>
    </div>
  )
}
