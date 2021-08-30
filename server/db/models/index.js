const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");

// associations

User.hasMany(Conversation);
// We keep the following two now temporarily for transition period
// TODO: must be removed once transitioned to conversation_users table
Conversation.belongsTo(User, { as: "user1" });
Conversation.belongsTo(User, { as: "user2" });
Conversation.belongsToMany(User, { through: 'conversation_users' });
User.belongsToMany(Conversation, { through: 'conversation_users' });
Message.belongsTo(Conversation);
Conversation.hasMany(Message);

module.exports = {
  User,
  Conversation,
  Message
};
