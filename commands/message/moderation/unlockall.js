/** @format */

const { EmbedBuilder, ActionRowBuilder } = require(`discord.js`)

module.exports = {
  name: 'unlockall',
  category: 'moderation',
  description: 'unlocks all channels',
  args: false,
  usage: 'unlockall',
  userPerms: ['ManageChannels'],
  botPerms: ['Administrator'],
  owner: false,
  vote: true,

  execute: async (client, message, args, prefix) => {
    // Code



       const yes = new client.button().secondary(`ul_yes`, `Yes`, `${client.emoji.tick}`)

    const no = new client.button().secondary(`ul_no`, `No`, `${client.emoji.cross}`)

    row = new ActionRowBuilder().addComponents(yes, no)

    
    let msg = await message.channel.send({embeds: [new EmbedBuilder().setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})}).setTimestamp().setColor(client.color).setDescription(`**Are You Sure You Want to Unlock All The Channels ?**`)], components: [row]})



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
    
    if (interaction.customId === `ul_yes`) {
      interaction.update({
          embeds: [
            new client.emb().desc(
              `${client.emoji.tick} Unlocking all the channels for \`@everyone\``).setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})}).setTimestamp()], components: []})
      await message.guild.channels.cache.forEach(async (channel) => {
        await channel.permissionOverwrites
          .edit(message.guild.id, { SendMessages: true })
          .catch(() => {});
    })
      }

    if (interaction.customId === `ul_no`) {
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