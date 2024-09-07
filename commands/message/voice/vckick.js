/** @format */

module.exports = {
  name: 'vckick',
  category: 'voice',
  aliases: ["vkick"],
  description: 'Disconnect a member from voice',
  args: true,
  usage: 'vckick <member>',
  userPerms: ['MoveMembers'],
  botPerms: ['MoveMembers'],
  owner: false,
  execute: async (client, message, args, prefix) => {

    if (!message.member.voice.channel) {
      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.cross} ${message.author}: You aren't connected to a voice channel`)]})
    }


        let id = message.mentions.members.first()?.user.id || args[0]?.replace(/[^0-9]/g, '')

    let member = id
      ? await message.guild.members.fetch(id, { force: true }).catch((err) => {})
      : null

    if (!member) { 
        return client.emit(`invalidUser`, message);
    }

    if (!member.voice.channel) {
      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.cross} ${message.author}: Provided member isn't connected to a voice channel`)]})
          }

    member.voice.disconnect()
      message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} ${message.author}: Disconnected ${member.user.username} from voice`)]}) 

    
  }
}