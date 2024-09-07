/** @format */

module.exports = {
  name: 'unhide',
  category: 'moderation',
  description: 'unhides provided channel',
  args: false,
  usage: 'unhide [channel]',
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
      .edit(message.guild.id, { ViewChannel: true })
      .then((ch) => {
        ch.send({
          embeds: [
            new client.emb().desc(
              `${client.emoji.tick} ${message.author}: ${channel} is now unhidden for \`@everyone\``,
            ),
          ],
        });
      })
      .catch(() => {});
  },
};