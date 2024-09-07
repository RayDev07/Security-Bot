/** @format */

const { EmbedBuilder, ActionRowBuilder } = require(`discord.js`)

module.exports = {
  name: 'hideall',
  category: 'moderation',
  description: 'hides all channels',
  args: false,
  usage: 'hideall',
  userPerms: ['ManageChannels'],
  botPerms: ['Administrator'],
  owner: false,
  vote: true,

  execute: async (client, message, args, prefix) => {
    // Code



       const yes = new client.button().secondary(`h_yes`, `Yes`, `${client.emoji.tick}`)

    const no = new client.button().secondary(`h_no`, `No`, `${client.emoji.cross}`)

    row = new ActionRowBuilder().addComponents(yes, no)

    
    let hd = await message.channel.send({embeds: [new EmbedBuilder().setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})}).setTimestamp().setColor(client.color).setDescription(`**Are You Sure You Want to Hide All The Channels ?**`)], components: [row]})



        const collector = await hd.createMessageComponentCollector({
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
    
    if (interaction.customId === `h_yes`) {
      interaction.update({
          embeds: [
            new client.emb().desc(
              `${client.emoji.tick} Hiding all the channels for \`@everyone\``).setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})}).setTimestamp()], components: []})
      await message.guild.channels.cache.forEach(async (channel) => {
        await channel.permissionOverwrites
          .edit(message.guild.id, { ViewChannel: false })
          .catch(() => {});
    })
      }

    if (interaction.customId === `h_no`) {
      return interaction.update({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`**Operation Cancelled**`)], components: []})
    }

    
  } 

}) 


    collector.on('end', async () => {
      if(hd) {
        hd.edit({components: []}).catch(() => { })
      }
    });
            
      
    }
                }