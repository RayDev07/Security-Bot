/** @format */

module.exports = {
  name: 'unban',
  aliases: ['ub'],
  category: 'moderation',
  description: 'unbans user',
  args: true,
  usage: 'unban <user> [reason]',
  userPerms: ['BanMembers'],
  botPerms: ['Administrator'],
  owner: false,

  execute: async (client, message, args, prefix) => {
    // Code

    let id =
      message.mentions.members.first()?.user.id ||
      args[0]?.replace(/[^0-9]/g, '');

    let [user, member] = await Promise.all([
      id ? client.users.fetch(id, { force: true }).catch((err) => {}) : null,
      id
        ? message.guild.members.fetch(id, { force: true }).catch((err) => {})
        : null,
    ]);

    if (!user) return client.emit(`invalidUser`, message);

    if (member)
      return message.channel.send({
        embeds: [
          new client.emb().desc(
            `${client.emoji.cross} ${message.author}: Member is present in guild thus not banned`,
          ),
        ],
      });

    let x = await message.guild.members.unban(id).catch((error) => {
      message.channel.send({
        embeds: [
          new client.emb()
            .setTitle(`**Unban Failed :**`)
            .desc(`${client.emoji.servers} **Reason :** ${error}`),
        ],
      });
      return false;
    })

    if (x) {
      message.channel.send({
        embeds: [
          new client.emb().desc(`${client.emoji.tick} ${message.author}: Unbanned ${user.tag}\n${client.emoji.ham} **Reason:** ${args.slice(1).join(' ') || 'No reasons provided'}`)]})
    }
  }
}