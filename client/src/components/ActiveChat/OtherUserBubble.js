import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Avatar } from "@material-ui/core";
import { updateReadMessages } from "../../store/utils/thunkCreators";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex"
  },
  avatar: {
    height: 30,
    width: 30,
    marginRight: 11,
    marginTop: 6
  },
  usernameDate: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5
  },
  bubble: {
    backgroundImage: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)",
    borderRadius: "0 10px 10px 10px"
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: -0.2,
    padding: 8
  }
}));

const OtherUserBubble = (props) => {
  const classes = useStyles();
  const { text, time, otherUser, conversation, userId, isMessageRead } = props;
  // This is to update the read status everytime a message is received
  useEffect(() => {
    if (!isMessageRead){
      props.updateReadMessages(conversation, userId);
    }
  },[]);
  return (
    <Box className={classes.root}>
      <Avatar alt={otherUser.username} src={otherUser.photoUrl} className={classes.avatar}></Avatar>
      <Box>
        <Typography className={classes.usernameDate}>
          {otherUser.username} {time}
        </Typography>
        <Box className={classes.bubble}>
          <Typography className={classes.text}>{text}</Typography>
        </Box>
      </Box>
    </Box>
  );
};


const mapDispatchToProps = (dispatch) => {
  return {
    updateReadMessages: (conversation, userId) => {
      dispatch(updateReadMessages(conversation, userId));
    }
  };
};

export default connect(null, mapDispatchToProps)(OtherUserBubble);
