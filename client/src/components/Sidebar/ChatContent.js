import React from 'react';
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { UnreadCounter } from "./index";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  unreadCounter: {
    alignItems: "flex-end",
    padding: "10px",
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation } = props;
  const { latestMessageText, otherUser } = conversation;
  // finds the length of unread messages sent by the other user
  const unreadMessagesCount = conversation.messages.filter(message => message.read === false 
    && message.senderId === otherUser.id).length;
  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={classes.previewText}>
          {latestMessageText}
        </Typography>
      </Box>
      {unreadMessagesCount !==0 && <Typography className={classes.unreadCounter}>
          <UnreadCounter counter={unreadMessagesCount} />
      </Typography>}
    </Box>
  );
};

export default ChatContent;