/** @format */

module.exports = {
  name: 'ban',
  aliases: ['hackban', 'fuckban', 'fuckoff'],
  category: 'moderation',
  description: 'bans provided member',
  args: true,
  usage: 'ban <member> [reason]',
  userPerms: ['BanMembers'],
  botPerms: ['Administrator'],
  owner: false,

  execute: async (client, message, args, prefix) => {
    // Code

    let id = message.mentions.members.first()?.user.id || args[0]?.replace(/[^0-9]/g, '') || message.guild.members.cache.find((r) => (r.user.username || r.user.tag) == args.slice(0).join(' '))?.id


      let member = id ? await message.guild.members.fetch(id, { force: true }).catch((err) => {})
  : null

    if (!member) { 
        return client.emit(`invalidUser`, message)
                 }

    if (member.id === client.user.id) {
      return message.channel.send({
        embeds: [
          new client.emb().desc(
            `${client.emoji.cross} ${message.author}: You can't ban me dumbo`,
          ),
        ],
      })
      }

    if (member.id === message.author.id) {
      return message.channel.send({
        embeds: [
          new client.emb().desc(
            `${client.emoji.cross} ${message.author}: You can't ban yourself`,
          ),
        ],
      })
      }

    if (member.id === message.guild.ownerId) {
      return message.channel.send({
        embeds: [
          new client.emb().desc(
            `${client.emoji.cross} ${message.author}: You can't ban the guild owner`,
          ),
        ],
      })
        }

    if (message.author.id != message.guild.ownerId && (message.member.roles.highest.position < member.roles.highest.position || message.member.roles.highest.position == member.roles.highest.position))
      return message.channel.send({
        embeds: [
          new client.emb().desc(
            `${client.emoji.cross} ${message.author}: You can't do that due to role hierarchy`,
          ),
        ],
      });

    if (!member.bannable) {
      return message.channel.send({
        embeds: [
          new client.emb().desc(
            `${client.emoji.cross} ${message.author}: I can't do that due to role hierarchy`,
          ),
        ],
      })
      }

    let x = await member.ban({reason: args.slice(1).join(' ') || 'No reasons provided'}).catch((error) => {
      message.channel.send({
        embeds: [
          new client.emb()
            .setTitle(`An error occurred`)
            .desc(`${error}`),
        ],
      });
      return false;
    });

    if (x) {
      message.channel.send({
        embeds: [
          new client.emb()           
            .desc(
              `${client.emoji.tick} ${message.author}: Banned ${member.user.tag}\n${client.emoji.ham} **Reason:** ${
                args.slice(1).join(' ') || 'No reasons provided'
              }`,
            ),
        ],
      });

      member
        .send({content: `You were banned from ${message.guild.name}`,
          embeds: [
            new client.emb()
              
          
              .desc(
                `${client.emoji.ham} **Reason:** ${
                  args.slice(1).join(' ') || 'No reasons provided'
                } \n${client.emoji.ham} **Moderator:** ${message.author}`,
              ),
          ],
        })
        .catch((error) => {});
    }
  },
};