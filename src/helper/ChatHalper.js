import axios from "axios";





export const createUserChatAccount = (email,password) => {
    axios
      .post(
        `https://api.chatengine.io/users/`,
        {
          "username": email,
          "secret": password,
        },
        {
          headers: {
            "Private-Key": process.env.REACT_APP_CHAT_ENGINE_PRIVATE_KEY,
          },
        }
      )
  
      .then((response) => {
        return {response };
      })
  
      .catch((error) => {
        console.log("Create chat user", error.response);
      });
  };
  

  export const getOrCreateChat = (headers, data) => {
    axios.put(
        `https://api.chatengine.io/chats/`,
        data,
        { headers }
    )

    .then((response) => {
       return {response}
    })

    .catch((error) => {
        console.log('Get or create chat error', error.response)
    })
}