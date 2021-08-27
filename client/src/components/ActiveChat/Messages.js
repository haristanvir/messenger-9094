import React from "react";
import { Box, useRadioGroup } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const findLastReadMessageId = (messages, userId) => {
  let lastReadMessageId = -1;
  messages.forEach(message=>{
    if (message.id > lastReadMessageId && message.read === true && message.senderId === userId)
      {
        lastReadMessageId = message.id
      }
  })
  return lastReadMessageId === -1 ? undefined: lastReadMessageId;
}

const Messages = (props) => {
  const { otherUser, userId, conversation } = props;
  const { messages } = conversation;
  messages.sort((a, b) => a.createdAt.localeCompare(b.createdAt));

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} 
          lastReadMessageId= {findLastReadMessageId(messages, userId)} messageId={message.id} otherUser={otherUser}/>
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser}
          conversation={conversation} userId={userId} />
        );
      })}
    </Box>
  );
};

export default Messages;
