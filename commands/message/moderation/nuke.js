/** format */
const { EmbedBuilder, ActionRowBuilder } = require("discord.js")

module.exports = {
  name: 'nuke',
  aliases: ['clone'],
  category: 'Extra',
  description: 'Clone a channel',
  args: true,
  usage: 'nuke [channel]',
  userPerms: ['ManageChannels'],
  botPerms: ['ManageChannels'],
  owner: false,

  execute: async (client, message, args, prefix) => {

let ch = message.mentions.channels.first() || message.channel

   const yes = new client.button().secondary(`nuke_yes`, `Yes`, `${client.emoji.tick}`)

    const no = new client.button().secondary(`nuke_no`, `No`, `${client.emoji.cross}`)

    row = new ActionRowBuilder().addComponents(yes, no)

    
    msg = await message.channel.send({embeds: [new EmbedBuilder().setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})}).setTimestamp().setColor(client.color).setDescription(`**Are You Sure You Want to Clone ${ch} ?**`)], components: [row]})



        const collector = await msg.createMessageComponentCollector({
      filter: (interaction) => {
        if (message.author.id === interaction.user.id) return true;
        else {
          interaction.reply({ content: `${client.emoji.cross} Only **${message.author.tag}** Can Interact`, ephemeral: true })
        }
      },
      time: 100000,
      idle: 100000 / 2
    });
    

collector.on('collect', async (interaction) => {

  if (interaction.isButton()) {

    if (interaction.customId === `nuke_yes`) {
     interaction.update({embeds: [new EmbedBuilder().setColor(client.color).setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})}).setTimestamp().setDescription(`**${client.emoji.tick} ${message.author}:** Successfully Nuked ${ch}`)], components: []})
      ch.clone()
      ch.delete()
    }
    if (interaction.customId === `nuke_no`) {
      return interaction.update({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`**Operation Cancelled**`)], components: []})
    }
    
  }

})


     collector.on('end', async () => {
      if(msg) {
        msg.edit({components: []}).catch(() => { })
      }
    });
    

  }
}