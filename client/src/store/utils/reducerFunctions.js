const calculateUnreadMessageCount = (convo) => {
  return convo.messages.filter(message => message.read === false 
    && message.senderId === convo.otherUser.id).length;
}

export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
    };
    newConvo.latestMessageText = message.text;
    return [newConvo, ...state];
  }
  

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const convoCopy = { ...convo };
      convoCopy.messages.push(message);
      convoCopy.latestMessageText = message.text;
      convoCopy.unreadMessagesCount = calculateUnreadMessageCount(convoCopy);
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const updateMessageReadInStore = (state, senderId, conversationId) => {
  const conversation = state.filter(conversation=> conversation.id === conversationId)[0];
  const messages = conversation.messages.map((message) => {
    if (message.read === false && message.senderId !== senderId) {
      const messageCopy = {...message}
      messageCopy.read = true;
      return messageCopy;
    } else {
      return message;
    }
  });

  return state.map((conversation)=>{
    if (conversation.id == conversationId){
      const newConvo = {...conversation}
      newConvo.messages = messages;
      return newConvo;
    } else {
      return conversation
    }
    });
}

export const markMessageReadInStore= (state, conversationId, senderId) => {
  const conversation = state.filter(conversation=> conversation.id === conversationId)[0];
  const messages = conversation.messages.map((message) => {
    if (message.read === false) {
      const messageCopy = {...message}
      messageCopy.read = true;
      return messageCopy;
    } else {
      return message;
    }
  });

  return state.map((conversation)=>{
    if (conversation.id == conversationId){
      const newConvo = {...conversation};
      newConvo.messages = messages;
      newConvo.messages.forEach(message=>{
        if (senderId){
          if (message.id > newConvo.lastReadMessageId && message.read === true && message.senderId !== senderId)
            {
              newConvo.lastReadMessageId = message.id
            }
          }
        newConvo.unreadMessagesCount = calculateUnreadMessageCount(newConvo);
      });
      return newConvo;
    } else {
      return conversation
    }
    });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      convo.id = message.conversationId;
      convo.messages.push(message);
      convo.latestMessageText = message.text;
      return convo;
    } else {
      return convo;
    }
  });
};
