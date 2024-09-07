const { EmbedBuilder, ActionRowBuilder } = require('discord.js');
const moment = require("moment")


module.exports = {
  name: 'userinfo',
  aliases: ['ui', 'whois'],
  category: 'Extra',
  description: "Get information about a user",
  usage: "userinfo [user]",
  args: false,
  botPerms: [],
  userPerms: [],
  owner: false,

  execute: async (client, message, args, prefix) => {

    let id = message.mentions.members.first()?.id || args[0]?.replace(/[^0-9]/g, '') || message.member.id;

    let user = id
      ? await client.users.fetch(id, { force: true }).catch((err) => { })
      : null


    if (!user) return client.emit(`invalidUser`, message);

    let srv = await message.guild.members.fetch(id).catch(() => { })


    let basic = new client.button().secondary('basic', 'Basic', client.emoji.home)
    let basedis = new client.button().secondary('basic', 'Basic', client.emoji.home, true)
    let roml = new client.button().secondary('roles', 'Roles', client.emoji.reason)
    let romldis = new client.button().secondary('roles', 'Roles', client.emoji.reason, true)
    let perm = new client.button().secondary('perms', 'Permissions', client.emoji.utility)
    let permdis = new client.button().secondary('perms', 'Permissions', client.emoji.utility, true)
    let badge = new client.button().secondary('bdg', 'Badges', '<:icons_supportscommandsbadge:1122922281983811614>')
    let badgedis = new client.button().secondary('bdg', 'Badges', '<:icons_supportscommandsbadge:1122922281983811614>', true)

    let a = new ActionRowBuilder()
      .addComponents(basedis, badge, perm, roml)
    let b = new ActionRowBuilder()
      .addComponents(basic, badgedis, perm, roml)
    let c = new ActionRowBuilder()
      .addComponents(basic, badge, permdis, roml)
    let d = new ActionRowBuilder()
      .addComponents(basic, badge, perm, romldis)
    let alldis = new ActionRowBuilder()
      .addComponents(basedis, badgedis, permdis, romldis)



    let flags = ""

    let flg = user.flags.toArray()

    if (flg.includes(`HypeSquadOnlineHouse1`)) flags += client.emoji.bravery
    if (flg.includes(`HypeSquadOnlineHouse2`)) flags += client.emoji.brilliance
    if (flg.includes(`HypeSquadOnlineHouse3`)) flags += client.emoji.balance
    if (flg.includes(`Hypesquad`)) flags += client.emoji.events
    if (flg.includes(`Staff`)) flags += client.emoji.dcstaff
    if (flg.includes(`DiscordCertifiedModerator`)) flags += client.emoji.dcmod
    if (flg.includes(`PartneredServerOwner`)) flags += client.emoji.dcprtner
    if (flg.includes(`EarlyVerifiedBotDeveloper`)) flags += client.emoji.verifydev
    if (flg.includes(`ActiveDeveloper`)) flags += client.emoji.activedev
    if (flg.includes(`PremiumEarlySupporter`)) flags += client.emoji.earlysupp
    if (flg.includes(`VerifiedBot`)) flags += client.emoji.verifybot
    if (flg.includes(`BugHunterLevel1`)) flags += client.emoji.bughunt1
    if (flg.includes(`BugHunterLevel2`)) flags += client.emoji.bughunt2





    if (srv) {


      let keys = '';
      let f = srv.permissions.toArray();
      if (f.includes('Administrator')) keys = `Server Admin`
      if (f.includes(['KickMembers', 'BanMembers'])) keys = 'Server Moderator'

      if (srv.user.id === message.guild.ownerId) keys = 'Server Owner';
      if (keys == '') keys = 'Server Member'


      let ubasic = new EmbedBuilder()
        .setColor(srv ? srv.displayHexColor : client.color)
        .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true }) })
        .setFooter({ text: `Requested by ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setTimestamp()

        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .setTitle(`__Basic Info__`)
        .setDescription(`**Name** : ${user.username}\n**Id** : ${user.id}\n**Mention** : <@!${user.id}>\n**Bot ?** : ${user.bot ? client.emoji.tick : client.emoji.cross}\n**Flags** : ${flags}\n**Account Created** : <t:${Math.round(user.createdTimestamp / 1000)}:R>\n**Server Joined** : <t:${Math.round(srv.joinedTimestamp / 1000)}:R>`)
        .addFields([
          {
            name: `__Roles Info__`,
            value: `**Highest Role** : ${srv.roles.highest}\n**Color** : ${srv.displayHexColor}\n**Roles [${srv.roles.cache.size}]** : ${srv.roles.cache.size < 30 ? [...srv.roles.cache.values()].sort((a, b) => b.rawPosition - a.rawPosition).map(r => `<@&${r.id}>`).join(', ') : srv.roles.cache.size > 30 ? trimArray(srv.roles.cache) : 'NO ROLES'}`
          },
          {
            name: `__Key Permissions__`,
            value: `${srv.permissions.toArray().sort((a, b) => a.localeCompare(b)).map(x => `\`${x}\``).join(', ')}`
          },
          {
            name: `__Acknowledgement__`,
            value: `${keys}`
          }
        ])
      if (user.banner) { ubasic.setImage(`https://cdn.discordapp.com/banners/${user.id}/${user.banner}.webp?size=2048`) }
      await message.channel.send({ embeds: [ubasic] })




    } else {

      let basic = new EmbedBuilder()
        .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true }) })
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: `${user.username} is not in this guild`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setTimestamp()

        .setColor(`${client.color}`)
        .setTitle(`__Basic Info__`)
        .setDescription(`**Name** : ${user.username}\n**Id** : ${user.id}\n**Mention** : <@!${user.id}>\n**Bot ?** : ${user.bot ? client.emoji.tick : client.emoji.cross}\n**Badges** : ${flags}\n**Account Created** : <t:${Math.round(user.createdTimestamp / 1000)}:R>`)

      if (user.banner) { basic.setImage(`https://cdn.discordapp.com/banners/${user.id}/${user.banner}.webp?size=2048`) }

      message.channel.send({ embeds: [basic] })

    }

  }
}