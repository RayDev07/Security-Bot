/** @format */

const { EmbedBuilder, ActionRowBuilder } = require(`discord.js`)

module.exports = {
  name: 'extraowner',
  category: 'antinuke',
  aliases: ['eown'],
  description: "Manage the guilds extra owners",
  args: true,
  usage: 'extraowner <add/remove/show/reset> <user>',
  botPerms: [],
  owner: false,
  srvrowner: true,

  execute: async (client, message, args, prefix) => {


    let eo = await client.db.get(`exown_${message.guild.id}`) ? await client.db.get(`exown_${message.guild.id}`) : []

    let subcmd = args[0]

          if (subcmd === `show`) {

      let users = []
for(i=0; i< eo.length; i++){
let user = await client.users.fetch(eo[i])
users.push(`\`[${i}]\` | \`${user.username} [Id: ${user.id}]\``)
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
      .setTitle(`Antinuke Extra Owners:`);
      pages.push(embed);
             
    }

     if (pages.length === 1) {
      return message.channel.send({embeds: [pages[0].setFooter({text: `Page • 1/1`})]})
    } else {

      return pagi(message.channel, message.author, pages)
     }

        
          }


    if (subcmd === `reset` || subcmd === `clear`) {

      let eo_yes = new client.button().secondary(`eo_yes`, `Yes`, client.emoji.tick)
              let eo_no = new client.button().secondary(`eo_no`, `No`, client.emoji.cross)

              let rest = new ActionRowBuilder().addComponents(eo_yes, eo_no)

           msg = await message.channel.send({embeds: [new client.emb().desc(`${message.author}: Do you really want to reset the extra owner databse?`)], components: [rest]})

      
        } else {

    

        let id = message.mentions.members.first()?.user.id || args[1]?.replace(/[^0-9]/g, '')
    
    let member = id

      ? await message.guild.members.fetch(id, { force: true }).catch((err) => {})

      : null

    if (!member) { 
        return client.emit(`invalidUser`, message);
    }
    

    
    if (subcmd === `add`) {

      if (eo.includes(member.user.id)) {
        return message.channel.send(`${member.user.username} is already an extraowner`)
      }

            const response = await client.fetch(`https://top.gg/api/bots/${client.user.id}/check?userId=${message.author.id}`, {
        method: 'GET',
        headers: {
          Authorization: process.env.topgg,
        },
      });

const data = await response.json();
      

      if (response.ok && eo.length > 2 && !data.voted) {

          prime = new client.button().link(`Vote Me`, client.vote)
        k = new ActionRowBuilder().addComponents(prime)
        return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.cross} You cant add more than 3 users!\n\n${client.emoji.prime} [Vote Me](${client.vote}) To Increase This To- \`5\``)], components: [k]})
      }

      if (eo.length > 4) {

        return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.cross} You cant add more than 5 users!`)]})
      }

      eo.push(member.user.id)
      client.db.set(`exown_${message.guild.id}`, eo)

      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} ${message.author}: **Added** ${member.user.username} to Extra Owners`)]})      

    }

    

      if (subcmd === `remove`) {

      if (!eo.includes(member.user.id)) {
        return message.channel.send(`${member.user.username} is not an extra owner`)
      }

     eo = eo.filter(u => u != `${member.user.id}`)
      client.db.set(`exown_${message.guild.id}`, eo)

      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} ${message.author}: **Removed** ${member.user.username} from Exrta Owners`)]})

      }
    }


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

    if (interaction.customId === `eo_yes`) {
      client.db.set(`exown_${message.guild.id}`, [])
     interaction.update({embeds: [new client.emb().desc(`${client.emoji.tick} Removed all Extra Owners`)], components: []})
      
    }
    if (interaction.customId === `eo_no`) {
      return interaction.update({embeds: [new client.emb().desc(`**Operation Cancelled**`)], components: []})
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
