/** @format */
const { EmbedBuilder, ActionRowBuilder } = require(`discord.js`);

module.exports = {
  name: 'whitelist',
  category: 'antinuke',
  aliases: ['wl', 'trust'],
  description: "Whitelist users or roles from antinuke",
  args: true,
  usage: 'wl <add/remove/reset/role> <role mention/user mention>',
  botPerms: [],
  owner: false,
  extraowner: true,

  execute: async (client, message, args, prefix) => {

  let set = await client.db.get(`setup_${message.guild.id}`) ? await client.db.get(`setup_${message.guild.id}`) : null

    if (!set || set === false || set === null) {
      client.db.set(`setup_${message.guild.id}`, false)
      return message.channel.send(`Security is not enabled here.`)
    }
    

    let wl = await client.db.get(`wlUser_${message.guild.id}`) ? await client.db.get(`wlUser_${message.guild.id}`) : []

    let wlr = await client.db.get(`wlRole_${message.guild.id}`) ? await client.db.get(`wlRole_${message.guild.id}`) : []


    let subcmd = args[0]


      if (subcmd === `show`) {

      let users = []
for(i=0; i< wl.length; i++){
let user = await client.users.fetch(wl[i])
users.push(`\`[${i+1}]\` | \`${user.username} [Id: ${user.id}]\``)
}        

    const mapping = (require("lodash")).chunk(users, 9);    
      
    const descriptions = mapping.map((s) => s.join("\n"))    

    var pages = [];

    for (let i = 0; i < descriptions.length; i++) {
      
      const embed = new EmbedBuilder()      
        .setDescription(descriptions[i])
        .setColor(client.color)
        .setFooter({text: `Page • 1/${pages.length}`})
        .setTimestamp()
      .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()})
      .setTitle(`Antinuke Whitelisted Users:`);
      pages.push(embed);
             
    }

     if (pages.length === 1) {
      return message.channel.send({embeds: [pages[0].setFooter({text: `Page • 1/1`})]})
    } else {

     return pagi(message.channel, message.author, pages)
     }

        
      }

    if (subcmd === `role`) {


      let ar = args[1]

      if (ar === `add`) {

      let role_id = message.mentions.roles.first()?.id || args[2]?.replace(/[^0-9]/g, '') || message.guild.roles.cache.find((r) => r.name == args.slice(2).join(' '))?.id;

      let [role] = await Promise.all([
      role_id ? message.guild.roles.fetch(role_id).catch((err) => {}) : null,
      ]);

    if (!role_id || !role) return client.emit(`invalidRole`, message);

      if (role.managed) {
        return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.cross} ${message.author}: You can't whitelist an **integrated** role`)]})
      }

        
        if (wlr.includes(role.id)) {
          return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.cross} ${message.author}: This role is already whitelisted`)]})
        }

            const response = await client.fetch(`https://top.gg/api/bots/${client.user.id}/check?userId=${message.author.id}`, {
        method: 'GET',
        headers: {
          Authorization: process.env.topgg,
        },
      });

const data = await response.json();
      

      if (response.ok && wlr.length > 2 && !data.voted) {
        prime = new client.button().link(`Vote Me`, client.vote)
        k = new ActionRowBuilder().addComponents(prime)
        return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.cross} You cant whitelist more than 3 roles!\n\n ${client.emoji.prime} [Vote Me](${client.vote}) To Bypass This`)], components: [k]})
      }

        if (wlr.length > 4) {
          return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.cross} You cant whitelist more than 3 roles!`)]})
        }
        
        
        await wlr.push(role.id)
        await client.db.set(`wlRole_${message.guild.id}`, wlr)
        return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} ${message.author}: Successfully whitelisted ${role}`)]})

        
      } else {
        if (ar === `remove`) {

      let role_id = message.mentions.roles.first()?.id || args[2]?.replace(/[^0-9]/g, '') || message.guild.roles.cache.find((r) => r.name == args.slice(2).join(' '))?.id;

      let [role] = await Promise.all([
      role_id ? message.guild.roles.fetch(role_id).catch((err) => {}) : null,
      ]);

    if (!role_id || !role) return client.emit(`invalidRole`, message);

      if (role.managed) {
        return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.cross} ${message.author}: You can't whitelist an **integrated** role`)]})
      }

          
          if (!wlr.includes(role.id)) {
          return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.cross} ${message.author}: This role is not whitelisted`)]})
          }

          wlr = wlr.filter(r => r != `${role.id}`)
          await client.db.set(`wlRole_${message.guild.id}`, wlr)
          return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} ${message.author}: Successfully unwhitelisted ${role}`)]})
          
        } else {
          if (ar === `show`) {
            let roles = []
for(i=0; i< wlr.length; i++){
let role = await message.guild.roles.fetch(wlr[i])
roles.push(`\`[${i+1}]\` | \`${role.name} [Id: ${role.id}]\``)
}
        const mapping = (require("lodash")).chunk(roles, 9);    
      
    const descriptions = mapping.map((s) => s.join("\n"))    

    var pages = [];

    for (let i = 0; i < descriptions.length; i++) {
      
      const embed = new EmbedBuilder()      
        .setDescription(descriptions[i])
        .setColor(client.color)
        .setFooter({text: `Page • 1/${pages.length}`})
        .setTimestamp()
      .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()})
      .setTitle(`Antinuke Whitelisted Roles:`);
      pages.push(embed);
             
    }

     if (pages.length === 1) {
      return message.channel.send({embeds: [pages[0].setFooter({text: `Page • 1/1`})]})
     }
            
          } else {

            return message.channel.send({embeds: [new client.emb().addFields([{ name: `\`${prefix}whitelist role\``, value:`\`${prefix}whitelist role add\`\nAdd a role to the antinuke whitelist\n\n\`${prefix}whitelist role remove\`\nRemove a role from the antinuke whitelist\n\n\`${prefix}whitelist role show\`\nCheck the currently whitelisted roles`}]).setFooter({text: client.user.username + ` • Page 1/1`, iconURL: client.user.displayAvatarURL()})]})
            
          }
        }
      }
      
    }

    let an;
    
    if (subcmd === `reset` || subcmd === `clear`) {

      
      let wl_yes = new client.button().secondary(`wl_yes`, `Yes`, client.emoji.tick)
              let wl_no = new client.button().secondary(`wl_no`, `No`, client.emoji.cross)

              let rest = new ActionRowBuilder().addComponents(wl_yes, wl_no)

          an = await message.channel.send({embeds: [new client.emb().desc(`${message.author}: Do you really want to reset the antinuke whitelist databse?`)], components: [rest]})
      
    } else {

    

    
    

        let id = message.mentions.members.first()?.user.id || args[1]?.replace(/[^0-9]/g, '')
    
    let member = id

      ? await message.guild.members.fetch(id, { force: true }).catch((err) => {})

      : null

    if (!member) { 
        return client.emit(`invalidUser`, message);
    }
    



    if (subcmd === `add`) {

      if (wl.includes(member.user.id)) {
        return message.channel.send(`${member.user.username} is already whitelisted`)
      }

            const response = await client.fetch(`https://top.gg/api/bots/${client.user.id}/check?userId=${message.author.id}`, {
        method: 'GET',
        headers: {
          Authorization: process.env.topgg,
        },
      });

const data = await response.json();
      

      if (response.ok && wl.length > 19 && !data.voted) {
        prime = new client.button().link(`Vote Me`, client.vote)
        k = new ActionRowBuilder().addComponents(prime)
        return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.cross} You cant whitelist more than 20 users!\n\n ${client.emoji.prime} [Vote Me](${client.vote}) To Bypass This`)], components: [k]})
      }

      wl.push(member.user.id)
      client.db.set(`wlUser_${message.guild.id}`, wl)

      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} ${message.author}: **Added** ${member.user.username} to Antinuke Whitelist`)]})      
      
    }

    if (subcmd === `remove`) {

      if (!wl.includes(member.user.id)) {
        return message.channel.send(`${member.user.username} is not whitelisted`)
      }

     wl = wl.filter(u => u != `${member.user.id}`)
      client.db.set(`wlUser_${message.guild.id}`, wl)

      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} ${message.author}: **Removed** ${member.user.username} from Antinuke Whitelist`)]})
      
    }

    }



    const collector = await an.createMessageComponentCollector({
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

    if (interaction.customId === `wl_yes`) {
      client.db.set(`wlUser_${message.guild.id}`, [])
     interaction.update({embeds: [new client.emb().desc(`${client.emoji.tick} Removed all whitelisted users`)], components: []})
          }
    
    if (interaction.customId === `wl_no`) {
      return interaction.update({embeds: [new client.emb().desc(`**Operation Cancelled**`)], components: []})
    }
    
  }

})


     collector.on('end', async () => {
      if(an) {
        an.edit({components: []}).catch(() => { })
      }
     });
       
      



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

