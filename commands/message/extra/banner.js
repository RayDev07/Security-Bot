/** @format */

const { ActionRowBuilder } = require('discord.js');
module.exports = {
  name: 'banner',
  aliases: ['bnr'],
  category: 'Extra',
  description: 'shows banner',
  args: false,
  usage: 'banner [server / user] [user]',
  userPerms: [],
  botPerms: [],
  owner: false,

  execute: async (client, message, args, prefix) => {
    // Code

    if (args[0]?.toLowerCase() == 'user') args.shift();

    if (args[0]?.toLowerCase() == 'server') {
      let banner = message.guild.banner
        ? message.guild.bannerURL({ dynamic: true, size: 4096 })
        : null;

      e = new client.emb()
        .desc(
          `${
            message.guild.banner
              ? message.guild.banner.startsWith('a_')
                ? `**Download links : ** [\`GIF\`](${banner})`
                : `**Download links : **` +
                  `[\`PNG\`](${banner.replace('webp', 'png')}) | ` +
                  `[\`JPEG\`](${banner.replace('webp', 'jpeg')}) | ` +
                  `[\`WEBP\`](${banner.replace('webp', 'webp')})`
              : `${client.emoji.cross} No banner found`
          }`,
        )
        .img(banner).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})});
      
      return message.channel.send({ embeds: [e] });
    }

    let id =
      message.mentions.members.first()?.user.id ||
      args[0]?.replace(/[^0-9]/g, '') ||
      message.member.id;

    let user = id
      ? await client.users.fetch(id, { force: true }).catch((err) => {})
      : null;

    if (!user) return client.emit(`invalidUser`, message);

    let banner = user.banner
      ? user.bannerURL({ dynamic: true, size: 4096 })
      : null;

    e = new client.emb()
      .desc(
        `${
          user.banner
            ? user.banner.startsWith('a_')
              ? `**Download links : ** [\`GIF\`](${banner})`
              : `**Download links : **` +
                `[\`PNG\`](${banner.replace('webp', 'png')}) | ` +
                `[\`JPEG\`](${banner.replace('webp', 'jpeg')}) | ` +
                `[\`WEBP\`](${banner.replace('webp', 'webp')})`
            : `${client.emoji.cross} No banner found`
        }`,
      )
      .img(banner).setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})});

      message.channel.send({ embeds: [e] });
  },
};