import ActiveChat from "./ActiveChat"
import { connect } from "react-redux";

const ActiveChatContainer = (props) => {
    console.log("active chat changed");
    const {user} = props;
    const conversation = props.conversations &&
    props.conversations.find(
      (conversation) => conversation.otherUser.username === props.activeConversation)
    console.log(conversation);
    return (
    <ActiveChat 
        user={user} 
        conversation={conversation}
    />
    )}

const mapStateToProps = (state) => {
    return {
      user: state.user,
      conversations: state.conversations,
      activeConversation: state.activeConversation
    };
  };

  export default connect(mapStateToProps)(ActiveChatContainer);
