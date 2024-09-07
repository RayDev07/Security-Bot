/** @format */

module.exports = {
  name: 'reload',
  aliases: ['rl', 'r'],
  description: '',
  category: 'developer',
  args: true,
  usage: '<command to reload>',
  userPerms: [],
  botPerms: [],
  cooldown: 0,
  owner: true,

  execute: async (client, message, args, prefix) => {
    // Code

    try {
      let reload = false;

      for (let i = 0; i < client.categories.length; i += 1) {
        let dir = client.categories[i];

        try {
          delete require.cache[
            require.resolve(`../../../commands/message/${dir}/${args[0]}.js`)
          ];
          client.commands.delete(args[0]);
          const pull = require(`../../../commands/message/${dir}/${args[0]}.js`);
          client.commands.set(args[0], pull);
          reload = true;
        } catch (err) {}
      }

      if (reload) {
        let description = `Reloaded \`${args[0]}\``;
        emb = new client.emb();
        emb.desc(`${client.emoji.tick} ${message.author}: ${description}`);
        return message.reply({ embeds: [emb] });
      }

      let description = `Reloaded \`${args[0]}\``;
      emb = new client.emb();
      emb.desc(`${client.emoji.cross} ${message.author}: ${description}`);
      return message.reply({ embeds: [emb] });
    } catch (error) {
      let description = `Couldn't reload \`${args[0]}\``;
      emb = new client.emb();
      emb.desc(`${client.emoji.cross} ${message.author}: ${description}`);
      console.error(error);
      return message.reply({ embeds: [emb] });
    }
  },
};
