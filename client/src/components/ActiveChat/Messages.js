import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";


const Messages = (props) => {
  const { otherUser, userId, conversation } = props;
  const { messages } = conversation;

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} 
          lastReadMessageId= {conversation.lastReadMessageId} messageId={message.id} otherUser={otherUser}/>
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser}
          conversation={conversation} userId={userId} isMessageRead = {message.read}/>
        );
      })}
    </Box>
  );
};

export default Messages;
