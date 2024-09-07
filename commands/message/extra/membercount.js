const { EmbedBuilder, ActionRowBuilder } = require("discord.js")

module.exports = {
  name: 'membercount',
  aliases: ['mc'],
  category: 'Extra',
  description: 'Shows the servers membercount',
  args: false,
  usage: 'membercount',
  userPerms: [],
  botPerms: [],
  owner: false,
    execute: async (client, message, args, prefix) => {


let a = new EmbedBuilder()

      .setTitle('Members')
      .setColor(client.color)
  .setDescription(`${message.guild.memberCount}`)
      .setTimestamp()
      message.channel.send({embeds: [a]})

    }
}