const { ActionRowBuilder } = require('discord.js');

module.exports = {
  name: 'pruneinvites',
  aliases: ['pruneinv', 'pruneinvite', 'invitesprune'],
  description: `Prune invites from the server`,
  category: `moderation`,
  usage: 'pruneinvites',
  botPerms: ['ManageGuild'],
  userPerms: ['Administrator'],
  vote: true,
  cooldown: 10,
  execute: async (client, message, args, prefix) => {

    const yes = new client.button().secondary(`p_yes`, `Yes`, `${client.emoji.tick}`)

    const no = new client.button().secondary(`p_no`, `No`, `${client.emoji.cross}`)

    row = new ActionRowBuilder().addComponents(yes, no)

    

    let prun = await message.channel.send({embeds: [new client.emb().desc(`${client.emoji.warn} ${message.author}: Are you sure to prune all Server Invites?`)], components: [row]})

    const collector = await prun.createMessageComponentCollector({
      filter: (interaction) => {
        if (message.author.id === interaction.user.id) return true;
        else {
          interaction.reply({ content: `${client.emoji.cross} Only **${message.author.tag}** Can Interact`, ephemeral: true })
        }
      },
      time: 100000,
      idle: 100000 / 2
    });

    collector.on('collect', async (c) => {
      if (!c.deferred) await c.deferUpdate();

      switch (c.customId) {
        case 'p_yes':
          await prun.edit({ embeds: [new client.emb().desc(`${client.emoji.tick} ${message.author}: Pruning all Server Invites.`)], components: [] })
          const invites = await message.guild.invites.fetch();

  let i = 0;

  await invites.forEach((inv) => {
    inv.delete()
    i++
  })
          await prun.edit({embeds: [new client.emb().desc(`${client.emoji.tick} ${message.author}: Successfully pruned ${i} invites`)], components: []})
          
          break;

        case 'p_no':
          await prun.edit({ embeds: [new client.emb().desc(`**Operation Cancelled**`)], components: []});
          break;

        default:
          break;
      }
    });
    

    
  }
}