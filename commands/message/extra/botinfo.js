/** @format */

const { ActionRowBuilder } = require('discord.js')

module.exports = {
  name: 'botinfo',
  aliases: ['bi', 'about'],
  description: 'shows information about the bot',
  usage: 'botinfo',
  category: 'Extra',
  args: false,
  userPerms: [],
  botPerms: [],
  owner: false,

  execute: async (client, message, args, prefix) => {


    let srvrc = new client.button().secondary(`srvrc`, `${client.guilds.cache.size} Guilds`, ``, true)
    let usrc = new client.button().secondary(`usrc`, `${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0,)} Users`, ``, true)
    let chc = new client.button().secondary(`chc`, `${client.channels.cache.size} Channels`, ``, true)

   let count = new ActionRowBuilder().addComponents(srvrc, usrc, chc)

    let basic = new client.button().secondary(`baseinf`, `Basic Info`, client.emoji.utility)
    
    let team = new client.button().secondary(`teaminf`, `Team Info`, client.emoji.verifydev)


    let info = new ActionRowBuilder().addComponents(basic, team)
    

    let e = new client.emb().setThumbnail(client.user.displayAvatarURL()).setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL({dynamic: true})}).desc(`Meet me, **CodeX**, the all-encompassing bot designed to power up your server in style! With my lightning-fast responses, interactive games, and robust moderation tools, we ensure your community stays engaged, entertained, and safe.`).setFooter({text: `Requested by ${message.author.username}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).addFields([
      {
        name: `System Info`,
        value: `**Node Version**: ${process.version}\n**Library**: [discord.js](https://discord.js.org)`
      },
      {
        name: `Links`,
        value: `[Invite](${client.invite}) | [Support](${client.support}) | [Website](https://pro)`
      }])
      
      let e2 = new client.emb().setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL({dynamic: true})}).setThumbnail(client.user.displayAvatarURL()).setFooter({text: `Requested by ${message.author.username}`, iconURL: message.author.displayAvatarURL({dynamic: true})})    
      .addFields([{
        name: `<a:x_dot:1241064280124817529> Developers`,
        value: `[1] - <:Dev:1242814114380644372>[Ray](https://discord.com/users/870179991462236170) [ID : 870179991462236170]`,
        inline: false
      },
      {
        name: `<a:x_dot:1241064280124817529> Owners`,
        value: `[1] - <:owner:1242814025423917118>[Ray](https://discord.com/users/870179991462236170) [ID : 870179991462236170]\n[2] - <:owner:1242814025423917118>[Nikhil](https://discord.com/users/1170659343750922274) [ID : 1170659343750922274]`,
        inline: false
      }
                 ])

   let inf = await message.channel.send({embeds: [e], components: [info, count]})


    const collector = inf.createMessageComponentCollector({
      filter: (interaction) => {
        if (message.author.id === interaction.user.id) return true;
        else {
          interaction.reply({ content: `${client.emoji.cross} Only **${message.author.tag}** Can Interact`, ephemeral: true })
        }
      },
      time: 60000,
      idle: 60000 / 2
    })

    collector.on('collect', async (c) => {
      if (!c.deferred) await c.deferUpdate();

      switch (c.customId) {
        case 'baseinf':
          await inf.edit({ embeds: [e] });
          break;

        case 'teaminf':
          await inf.edit({ embeds: [e2] });
          break;

        default:
          break;
      }
    });

    collector.on('end', async () => {
      if(inf) {
        inf.edit({components: [count]}).catch(() => { })
      }
    });
    

  }
}