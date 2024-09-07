/** @format */

module.exports = {
  name: 'purge',
  aliases: ["clear"],
  category: 'moderation',
  description: 'Purge a number of messages',
  args: false,
  usage: 'purge [amount/humans/bots/files]',
  userPerms: ['ManageMessages'],
  botPerms: ['Administrator'],
  owner: false,

  execute: async (client, message, args, prefix) => {
    // Code

    await message.delete();

    

    let amount =
      args[0] && /^\d+$/.test(args[0])
        ? args[0]
        : args[1] && /^\d+$/.test(args[1])
        ? args[1]
        : 10;
    amount = Math.min(amount, 100);

    const messages = await message.channel.messages.fetch({ limit: 50 });

     

    if (args[0] === `images` || args[0] === `files`) {
      const del = messages.filter(
          (msg) => msg.attachments.size !== 0
        )     
      const msgs = await message.channel.bulkDelete(del, true)
      message.channel
      .send({
        embeds: [
          new client.emb().desc(
            `${client.emoji.tick} ${message.author}: Purged ${msgs.size} messages`,
          ),
        ],
      }).then((m) => setTimeout(() => m.delete(), 3000))
    
    } else {
      

                if (args[0] === `human` || args[0] === `humans`) {

      const del = messages.filter(
          (msg) => !msg.author.bot
        )     
      const msgs = await message.channel.bulkDelete(del, true)
      message.channel
      .send({
        embeds: [
          new client.emb().desc(
            `${client.emoji.tick} ${message.author}: Purged ${msgs.size} human messages`,
          ),
        ],
      }).then((m) => setTimeout(() => m.delete(), 3000))
      .catch((e) => {});
                } else {

            if (args[0] === `bots` || args[0] === `bot`) {

      const del = messages.filter(
          (msg) => msg.author.bot
        )     
      const msgs = await message.channel.bulkDelete(del, true)
      message.channel
      .send({
        embeds: [
          new client.emb().desc(
            `${client.emoji.tick} ${message.author}: Purged ${msgs.size} bot messages`,
          ),
        ],
      }).then((m) => setTimeout(() => m.delete(), 3000))
      .catch((e) => {});
      
        } else {
              
    

    const toDelete = message.mentions.members.first()
      ? messages.filter(
          (msg) => msg.author.id === message.mentions.members.first()?.user?.id,
        )
      : amount;

    const msgs = await message.channel.bulkDelete(toDelete, true);

    message.channel
      .send({
        embeds: [
          new client.emb().desc(
            `${client.emoji.tick} ${message.author}: Purged ${msgs.size} messages`,
          ),
        ],
      })
      .then((m) => setTimeout(() => m.delete(), 3000))
      .catch((e) => {});

        }
  }
      }
  },
};