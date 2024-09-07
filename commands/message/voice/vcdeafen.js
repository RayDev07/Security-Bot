/** @format */

module.exports = {
  name: 'vcdeafen',
  category: 'voice',
  aliases: ["vdeafen", "vdeaf"],
  description: 'Deafen a member in voice',
  args: true,
  usage: 'vcdeafen <member>',
  userPerms: ['DeafenMembers'],
  botPerms: ['DeafenMembers'],
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

    member.voice.setDeaf(true)
      message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} ${message.author}: Deafen ${member.user.username} in voice`)]}) 


  }
}