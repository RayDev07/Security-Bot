/** @format */

module.exports = (client) => {
  client.on('messageDelete', (message) => {
   //if (!message.author.id == client.user.id) 
      client.snipes.set(message.channel.id, {
        content: `**Content : **${message.content}`,
        author: message.author,
        createdAt: message.createdAt,
        deletedAt: message.deletedAt,
        type: 'delete',
      });
  });

  // Handle message edit event
  client.on('messageUpdate', (oldMessage, newMessage) => {
    //if (!oldMessage.author.id === client.user.id && oldMessage.content !== newMessage.content) 
      client.snipes.set(oldMessage.channel.id, {
        content: `**Old : **${oldMessage.content}\n**New : **${newMessage.content}`,
        author: oldMessage.author,
        createdAt: oldMessage.createdAt,
        updatedAt: oldMessage.updatedAt,
        type: 'edit',
      });
  });
};