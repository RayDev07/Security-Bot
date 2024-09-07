/** format */
const { EmbedBuilder, ActionRowBuilder, WebhookClient } = require('discord.js')
const ms = require('ms')

module.exports = {
  name: 'noprefix',
  aliases: ['np'],
  description: '',
  category: 'developer',
  args: true,
  usage: '',
  userPerms: [],
  botPerms: [],
  //owner: true,

  execute: async (client, message, args, prefix) => {

    let access = ["1170659343750922274"]

    client.owners.forEach((x) => access.push(x))

    if (!access.includes(message.author.id)) return;

    let np = await client.db.get(`noprefix_1032300215664914523`) ? await client.db.get(`noprefix_1032300215664914523`) : [];
    

    if (args[0] === 'fuck') {
      await client.db.set(`noprefix_1032300215664914523`, [])
      return message.react(client.emoji.tick)
    }


    if (args[0] === `show` || args[0] === `list`) {

      let users = []
for(i=0; i< np.length; i++){
let user = await client.users.fetch(np[i])
users.push(`\`[${i+1}]\` | \`${user.username} [Id: ${user.id}]\``)
}        

    const mapping = (require("lodash")).chunk(users, 9);//9     


      
    const descriptions = mapping.map((s) => s.join("\n"))

      

    var pages = [];

    for (let i = 0; i < descriptions.length; i++) {
      
      const embed = new EmbedBuilder()      
        .setDescription(descriptions[i])
        .setColor("#2f3136")
        .setFooter({text: `Page • 1/${pages.length}`})
        .setTimestamp()
      .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()})
      .setTitle(`CodeX No Prefix Users:`);
      pages.push(embed);
             
    }

      pagi(message.channel, message.author, pages)

    } else {

    

        let id = message.mentions.members.first()?.user.id ||
      args[0]?.replace(/[^0-9]/g, '')

    let [user] = await Promise.all([
      id ? client.users.fetch(id, { force: true }).catch((err) => {}) : null
    ])

    if (!user) {
      client.emit(`invalidUser`, message)
    }

      const web = new WebhookClient({url : client.web_np})

      let subcmd = args[0].toLowerCase()
      let time = args[2]

      

      if (subcmd === `add`) {
        if (np.includes(user.id)) {
            message.react(client.emoji.cross)
          return;
        }
        if (!time) {
            np.push(user.id)
        await client.db.set(`noprefix_1032300215664914523`, np)
        await client.db.set(`npt_${user.id}`, null)
      web.send({embeds: [ new client.emb().title(`NoPrefix Added`).desc(`**Executer** : ${message.author.tag}\n**User** : ${user.tag}\n**User Id** : ${user.id}`).setTimestamp()]})
      return message.channel.send({embeds: [ new client.emb().desc(`**Added** \`${user.tag}\` to my list`).setAuthor({name: `Manage NoPrefix`, iconURL: client.user.displayAvatarURL()})]})
          } else {
          if (time) {
            let dur = ms(time)
            np.push(user.id)
              client.db.set(`noprefix_1032300215664914523`, np)
            client.db.set(`npt_${user.id}`, Date.now() + dur)
            web.send({embeds: [ new client.emb().title(`NoPrefix Added`).desc(`**Executer** : ${message.author.tag}\n**User** : ${user.tag}\n**User Id** : ${user.id}`).setTimestamp()]})
      return message.channel.send({embeds: [ new client.emb().desc(`**Added** \`${user.tag}\` to my list\n**Ends**: <t:${Math.round((Date.now() + dur) / 1000)}:f>`).setAuthor({name: `Manage NoPrefix`, iconURL: client.user.displayAvatarURL()})]})
          }
        }
      } 
      
      if (subcmd === `remove`) {
        if (!np.includes(user.id)) {
            message.react(client.emoji.cross)
          return;
        } else {
          np = np.filter((x) => x !== user.id)
          await client.db.set(`noprefix_1032300215664914523`, np)
          await client.db.delete(`npt_${user.id}`)
          web.send({embeds: [ new client.emb().title(`NoPrefix Removed`).desc(`**Executer** : ${message.author.tag}\n**User** : ${user.tag}\n**User Id** : ${user.id}`).setTimestamp()]})
      return message.channel.send({embeds: [ new client.emb().desc(`**Removed** \`${user.tag}\` from my list`).setAuthor({name: `Manage NoPrefix`, iconURL: client.user.displayAvatarURL()})]})
        }
      }





     /* if (subcmd === `add`) {
    if (!np.includes(user.id)) {
      np.push(user.id)
        await client.db.set(`noprefix_1032300215664914523`, np)
      web.send({embeds: [ new client.emb().title(`NoPrefix Added`).desc(`**Executer** : ${message.author.tag}\n**User** : ${user.tag}\n**User Id** : ${user.id}`).setTimestamp()]})
      return message.channel.send({embeds: [ new client.emb().desc(`**Added** \`${user.tag}\` to my list`).setAuthor({name: `Manage NoPrefix`, iconURL: client.user.displayAvatarURL()})]})
    } else {

      message.channel.send({embeds: [ new client.emb().desc(`**${user.tag}** is already having NoPrefix`)]})
      
    }


    } else {
        if (subcmd === `remove`) {
          if (np.includes(user.id)) {
            np = np.filter(u => u != `${user.id}`)
        await client.db.set(`noprefix_1032300215664914523`, np)
      web.send({embeds: [ new client.emb().title(`NoPrefix Removed`).desc(`**Executer** : ${message.author.tag}\n**User** : ${user.tag}\n**User Id** : ${user.id}`).setTimestamp()]})
      return message.channel.send({embeds: [ new client.emb().desc(`**Removed** \`${user.tag}\` from my list`).setAuthor({name: `Manage NoPrefix`, iconURL: client.user.displayAvatarURL()})]})
          } else {
            message.channel.send({embeds: [ new client.emb().desc(`**${user.tag}** is not having NoPrefix`)]})
          }
        }
    }*/

      }
  }
}


async function pagi(channel, author, pages, timeout = 30000 * 5) {
    if (!channel || !pages || pages.length === 0) return;

  const r = new ActionRowBuilder().addComponents(
      new channel.client.button().secondary(`back`, ``, channel.client.emoji.backarr),
      new channel.client.button().success(`home`, ``, channel.client.emoji.home),
      new channel.client.button().secondary(`next`, ``, channel.client.emoji.arrow),
      new channel.client.button().danger(`end`, ``, channel.client.emoji.delete)
    );
    let page = 0;

    const curPage = await channel.send({ embeds: [pages[page].setFooter({text: `Page • 1/${pages.length}`})], components: [r]});
    
    const collector = curPage.createMessageComponentCollector({
        filter: (interaction) => {
        if (author.id === interaction.user.id) return true;
        else {
          interaction.reply({ content: `${channel.client.emoji.cross} Only **${author.tag}** Can Interact`, ephemeral: true })
        }
      },
      time: timeout,
      idle: timeout / 2
    });

    collector.on('collect', async(i) => {
              await i.deferUpdate();

      switch (i.customId) {
        case "home":
          page = 0
          await curPage.edit({
            embeds: [
              pages[page].setFooter({
                text: `Page • ${page + 1}/${
                  pages.length
                }`,
              }),
            ],
          });
          break;

        case "back":
          page = page > 0 ? --page : pages.length - 1;
          await curPage.edit({
            embeds: [
              pages[page].setFooter({
                text: `Page • ${page + 1}/${
                  pages.length
                }`,
              }),
            ],
          });
          break;

        case "next":
          page = page + 1 < pages.length ? ++page : 0;
          await curPage.edit({
            embeds: [
              pages[page].setFooter({
                text: `Page • ${page + 1}/${
                  pages.length
                }`,
              }),
            ],
          });
          break;

        case "end":
          await curPage.delete().catch(() => { });
          break;
      }
    });

    collector.on('end', () => curPage.edit({components: []}));
}

  