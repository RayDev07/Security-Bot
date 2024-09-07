/** @format */

const bcrypt = require('bcrypt');

module.exports = {
  name: 'gen',
  aliases: [],
  description: '',
  category: 'developer',
  args: true,
  usage: '',
  userPerms: [],
  botPerms: [],
  cooldown: 0,
  owner: true,

  execute: async (client, message, args, prefix) => {
    // Code

    if (args[0] == 'user') {
      return message.reply({
        embeds: [
          new client.emb().desc(
            `${
              client.emoji.premium
            }** | Your generated code is: ||${bcrypt.hashSync(
              'USER_PREMIUM',
              bcrypt.genSaltSync(5),
            )}||**`,
          ),
        ],
      });
    }
    if (args[0] == 'guild') {
      return message.reply({
        embeds: [
          new client.emb().desc(
            `${
              client.emoji.premium
            }** | Your generated code is: ||${bcrypt.hashSync(
              'GUILD_PREMIUM',
              bcrypt.genSaltSync(5),
            )}||**`,
          ),
        ],
      });
    }
  },
};
