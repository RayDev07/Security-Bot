/** @format */

module.exports = {
  name: 'hide',
  category: 'moderation',
  description: 'hides provided channel',
  args: false,
  usage: 'hide [channel]',
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
      .edit(message.guild.id, { ViewChannel: false })
      .then((ch) => {
        ch.send({
          embeds: [
            new client.emb().desc(
              `${client.emoji.tick} ${message.author}: ${channel} is now hidden for \`@everyone\``,
            ),
          ],
        });
      })
      .catch(() => {});
  },
};