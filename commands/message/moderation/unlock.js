/** @format */

module.exports = {
  name: 'unlock',
  category: 'moderation',
  description: 'unlocks provided channel',
  args: false,
  usage: 'unlock [channel]',
  userPerms: ['ManageChannels'],
  botPerms: ['Administrator'],
  owner: false,

  execute: async (client, message, args, prefix) => {
    // Code


    let id =
      message.mentions.channels.first()?.id ||
      args[0]?.replace(/[^0-9]/g, '') ||
      message.channel.id;

    let channel = await message.guild.channels.cache.get(id);
    if (!channel) {     
      return client.emit(`invalidChannel`, message)
    }

    await channel.permissionOverwrites
      .edit(message.guild.id, { SendMessages: true })
      .then((ch) => {
        ch.send({
          embeds: [
            new client.emb().desc(
              `${client.emoji.tick} ${message.author}: ${channel} is now unlocked for \`@everyone\``,
            ),
          ],
        });
      })
      .catch(() => {});
  },
};