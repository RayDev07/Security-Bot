
/** @format */

const { ActionRowBuilder } = require(`discord.js`)

module.exports = {
  name: 'profile',
  aliases: ['pr', 'badges', 'badge'],
  category: 'extra',
  description: 'Shows profile of a user',
  args: false,
  usage: 'profile [member]',
  botPerms: [],
  userPerms: [],
  botPerms: [],
  owner: false,

  execute: async (client, message, args, prefix) => {
    let id =
      message.mentions.members.first()?.user.id ||
      args[0]?.replace(/[^0-9]/g, '') ||
      message.member.id;

    let user = id
      ? await client.users.fetch(id, { force: true }).catch((err) => {})
      : null; 

    if (!user) return client.emit(`invalidUser`, message);

    let badges = await client.db.get(`bdg_${user.id}`) ? await client.db.get(`bdg_${user.id}`) : []


    const response = await client.fetch(`https://top.gg/api/bots/${client.user.id}/check?userId=${user.id}`, {
        method: 'GET',
        headers: {
          Authorization: process.env.topgg,
        },
      });

const data = await response.json();

    
    let prev = ""

    let np = await client.db.get(`noprefix_1032300215664914523`)

    if (np.includes(user.id) || client.owners.includes(user.id)) {
      prev += "<:icons_supportscommandsbadge:1122922281983811614> **Global No Prefix**\n"
    }

    if ((response.ok && data.voted) || client.owners.includes(user.id)) {
      prev += "<:zz_blacklink:1124890038329675858> **Vote Commands Access**\n"
    }

    
    

    
        let ub = ""
        let count = 0

    if (client.owners.includes(user.id)) {
      ub += `<:e1122:1142453906077651005> [${user.globalName}](https://discord.com/users/${user.id})\n`
      count += 1
    }
    
    if (badges.includes("dev")) {
      ub += `${client.emoji.verifydev} **Development Team**\n`
      count += 1
    }
    if (badges.includes("owner")) {
      ub += `${client.emoji.owner} **Owner**\n`
      count += 1
    }
    if (badges.includes("team")) {
      ub += `${client.emoji.dcmod} **Staff Team**\n`
      count += 1
    }
    if (badges.includes("contribution")) {
      ub += `${client.emoji.prime} **Contributor**\n`
      count += 1
    }
    if (badges.includes("partner")) {
      ub += `${client.emoji.dcprtner} **Partner**\n`
      count += 1
    }
    if (badges.includes("friend")) {
      ub += `<:Friendship:1153318048242073723> **Owner's Friend**\n`
      count += 1
    }
    if (badges.includes("beta")) {
      ub += `<:Beta:1153317836677189723> **Beta Tester**\n`
      count += 1
    }
    if (badges.includes("earlysupp")) {
      ub += `${client.emoji.earlysupp} **Early Supporter**\n`
      count += 1
    }
    if (badges.includes("bug")) {
      ub += `${client.emoji.bughunt2} **Bug Hunter**\n`
      count += 1
    }

   /* let supp = await client.guilds.cache.get("1091028844712042620")

    let srv = supp.members.cache.get(user.id)

    if (srv) {
      ub += `<a:e1134:1153315006323114024> **Lounge Chillerz**`
    }*/


   /* if (ub.length < 1) {
      ub += `Looks like ${user.username} doesn't have any badges to display.\nWant a free badge?? Join my [Support Server](${client.support}) just now for a free badge`
      return message.channel.send({embeds: [new client.emb().setAuthor({name: user.username + ' - Profile', iconURL: user.displayAvatarURL({dynamic: true}).setThumbnail(message.author.displayAvatarURL({dynamic: true}))}).setFooter({text: `What your waiting for? Join Now!`+ message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})})]})
    }*/



    return message.channel.send({embeds: [new client.emb().setAuthor({name: user.username + ' - Profile', iconURL: user.displayAvatarURL({dynamic: true})}).setFooter({text: `Requested By `+ message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})}).setThumbnail(message.author.displayAvatarURL({dynamic: true})).addFields([{name: `Badges [ ${count} ]`, value: ub.length > 1 ? ub : `<:f_:1160193052099497985> **CodeX Users**` }, {name: `Privilages`, value: prev.length > 1 ? prev : `**_N/A_**`}])], components: [new ActionRowBuilder().addComponents([new client.button().link(`Free Privilage`, client.vote)])]})
    
  }
}