/** @format */

const { ActionRowBuilder } = require('discord.js');
module.exports = {
  name: 'avatar',
  aliases: ['av'],
  category: 'extra',
  description: 'shows avatar',
  args: false,
  usage: 'avatar [server / user] [user]',
  userPerms: [],
  botPerms: [],
  owner: false,

  execute: async (client, message, args, prefix) => {
    // Code

    if (args[0]?.toLowerCase() == 'user') args.shift();

    if (args[0]?.toLowerCase() == 'server') {
      icon = message.guild.iconURL({ dynamic: true, size: 2048 });

      let formats = ['PNG', 'JPEG', 'WEBP'];
      let links = formats
        .map(
          (format) =>
            `[\`${format}\`](${icon?.replace('webp', format.toLowerCase())})`,
        )
        .join(' | ');

      let gif = `[\`GIF\`](${icon?.replace('gif', 'gif')})`;
      let webp = `[\`WEBP\`](${icon?.replace('gif', 'webp')})`;

      let iconLinks = icon?.includes('gif') ? `${gif} | ${webp}` : links;

      e = new client.emb().desc(`${iconLinks}`).img(icon)
      e.setFooter({text: `Requested By: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})

      return await message.channel.send({ embeds: [e] });
    }

    let btn1 = new client.button().secondary(`user`, `User Avatar`);
    let btn2 = new client.button().secondary(`member`, `Server Avatar`);

    let row = new ActionRowBuilder().addComponents(btn1, btn2);

    let id =
      message.mentions.members.first()?.user.id ||
      args[0]?.replace(/[^0-9]/g, '') ||
      message.member.id;

    let [user, member] = await Promise.all([
      id ? client.users.fetch(id, { force: true }).catch((err) => {}) : null,
      id
        ? message.guild.members.fetch(id, { force: true }).catch((err) => {})
        : null,
    ]);

    if (!user) return message.reply({embeds: [new client.emb().desc(`${client.emoji.cross} ${message.author}: You didn't provide a valid user`)]})
    
    avatar1 = user.displayAvatarURL({ dynamic: true, size: 2048 });
    avatar2 = message.guild.iconURL({ dynamic: true, size: 2048 });

    let formats = ['PNG', 'JPEG', 'WEBP'];

    let links1 = formats
      .map(
        (format) =>
          `[\`${format}\`](${avatar1?.replace('webp', format.toLowerCase())})`,
      )
      .join(' | ');

    let gif_1 = `[\`GIF\`](${avatar1?.replace('gif', 'gif')})`;
    let webp_1 = `[\`WEBP\`](${avatar1?.replace('gif', 'webp')})`;

    let avatarLinks1 = avatar1?.includes('gif')
      ? `${gif_1} | ${webp_1}`
      : links1;

    let links2 = formats
      .map(
        (format) =>
          `[\`${format}\`](${avatar2?.replace('webp', format.toLowerCase())})`,
      )
      .join(' | ');

    let gif_2 = `[\`GIF\`](${avatar2?.replace('gif', 'gif')})`;
    let webp_2 = `[\`WEBP\`](${avatar2?.replace('gif', 'webp')})`;

    let avatarLinks2 = avatar2?.includes('gif')
      ? `${gif_2} | ${webp_2}`
      : links2;

    let e1 = new client.emb()
      .desc(`${avatarLinks1}`)
      .img(avatar1);
      e1.setFooter({text: `Requested By: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})

    let e2 = new client.emb().desc(
      `${
        member
          ? `**Download links : ** ${avatarLinks2}`
          : `${client.emoji.cross} User is **not** present in this guild, but you can still view the profile avatar`
      }`,
    );
    if (member) e2.img(avatar2); e2.setFooter({text: `Requested By: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})

    let m = await message.channel.send({ embeds: [e1], components: [row] });

    const collector = m.createMessageComponentCollector({
      filter: ({ user }) => user.id === message.author.id,
      time: 60000,
      idle: 60000 / 2,
    });

    collector.on('collect', async (c) => {
      if (!c.deferred) await c.deferUpdate();

      switch (c.customId) {
        case 'user':
          await m.edit({ embeds: [e1] });
          break;

        case 'member':
          await m.edit({ embeds: [e2] });
          break;

        default:
          break;
      }
    });

    collector.on('end', async (c, i) => {
      m.edit({ components: [] }).catch((e) => {});
    });
  },
};