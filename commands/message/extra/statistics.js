/** @format */

module.exports = {
  name: 'statistics',
  aliases: ['stat', 'st', 'shard', 'stats'],
  description: 'shows shards of bot',
  usage: 'statistics',
  category: 'extra',
  args: false,
  userPerms: [],
  botPerms: [],
  owner: false,

  execute: async (client, message, args, prefix) => {
    // Code
    let e = new client.emb().desc(
      ` ${client.emoji.loading} Fetching details please wait . . .`,
    );
    let msg = await message.reply({ embeds: [e] });

    const ms = require('ms');

    let emb = new client.emb()
    .desc(`**[CodeX Community](${client.invite})**`)
    .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL({dynamic: true})})
    .setFooter({text: `Requested by ${message.author.username}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
    .addFields([
      {
        name: `__CodeX Info__`,
        value: `- **Servers** : ${client.guilds.cache.size}\n- **Users** : ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0,)}\n - **Shards** : ${client.ws.shards.size}\n- **Last Reboot**: <t:${Math.round((Date.now() - client.uptime)/1000)}:R>`
      }
      
    ])

    return msg.edit({embeds: [emb]})
                

   /* let v = await client.cluster.broadcastEval(async (x) => {
      const os = require('os');
      const osu = require('os-utils');
      

      let cpu = '[ N/A ]';

      await new Promise(async (res, reject) => {
        await osu.cpuUsage((v) => {
          res(v);
        });
      }).then((value) => {
        return (cpu = value);
      });

      let val =
        `${x.emoji.category} __**Basic Info**__\n` +
        `<:tttblank:1140898428260454511><:tttblank:1140898428260454511>**Latency:** ${
          x.ws.ping
        }ms\n` +
        `<:tttblank:1140898428260454511><:tttblank:1140898428260454511>**Last Reboot:** <t:${Math.round((Date.now() - x.uptime)/1000)}:R>\n` +
        `${x.emoji.category} __**System Info:**__\n` +
        `<:tttblank:1140898428260454511><:tttblank:1140898428260454511>**Ram:**  ${x.formatBytes(process.memoryUsage().heapUsed)}\n` +
        `<:tttblank:1140898428260454511><:tttblank:1140898428260454511>**CPU Usage:** ${cpu.toFixed(
          2,
        )}%\n` +
        `${x.emoji.category} __**Bot Info:**__\n` +
        `<:tttblank:1140898428260454511><:tttblank:1140898428260454511>**Servers:** ${
          x.guilds.cache.size 
        }\n` +
        `<:tttblank:1140898428260454511><:tttblank:1140898428260454511>**Users:** ${
          (await x.guilds.cache.reduce(
            (acc, guild) => acc + guild.memberCount,
            0,
          ))
        }\n`;

      return val;
    });

    let embed = new client.emb()
    embed.setAuthor({name: client.user.tag, iconURL: client.user.displayAvatarURL()})
    embed.setFooter({text: `Requested By: ${message.author.username}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
    embed.setThumbnail(client.user.displayAvatarURL())

    for (i = 0; i < v.length; i++) {
      embed.addFields({
        name: `<:emote:1125754587865944095> Shard[${i}]:`,
        value: v[i],
        inline: true,
      });
    }
    msg.edit({ embeds: [embed] });*/
  }
}
