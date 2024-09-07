const { EmbedBuilder, ActionRowBuilder } = require('discord.js')
module.exports = {
  name: 'restart',
  aliases: [],
  description: '',
  category: 'developer',
  args: false,
  usage: '',
  userPerms: [],
  botPerms: [],
  cooldown: 0,
  owner: ['1131432005796642888'],

  execute: async (client, message, args, prefix) => {

    const yes = new client.button().secondary(`re_yes`, ``, `${client.emoji.tick}`)

    const no = new client.button().secondary(`re_no`, ``, `${client.emoji.cross}`)

    row = new ActionRowBuilder().addComponents(yes, no)
    

    re = await message.channel.send({embeds: [ new client.emb().desc(`**Are you sure you want to restart The bot ?**`).setTimestamp().setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()})], components: [row]})

            const collector = await re.createMessageComponentCollector({
      filter: (interaction) => {
        if (message.author.id === interaction.user.id) return true;
        else {
          interaction.reply({ content: `${client.emoji.cross} Owner commands can't be used by you`, ephemeral: true })
        }
      },
      time: 100000,
      idle: 100000 / 2
    });

    collector.on('collect', async (interaction) => {

  if (interaction.isButton()) {

    if (interaction.customId === `re_yes`) {
      await interaction.update({embeds: [ new client.emb().desc(
          `Client Restarting...`,
        ).setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()}).setTimestamp()], components: []})
      client.cluster.respawnAll();     
    }

    if (interaction.customId === `re_no`) {
      interaction.update({embeds: [ new client.emb().desc(`**The Operation was Cancelled**`)], components: []})
    }

    
  }
    })

    

    collector.on('end', async () => {
      if(re) {
        re.delete().catch(() => { })
      }
    });

    
    
    /**  await message.channel.send({
      embeds: [
        new EmbedBuilder().setColor(client.color).setDescription(
          `Client Restarting...`,
        ).setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()}),
      ],
    })*/
    
  },
};
