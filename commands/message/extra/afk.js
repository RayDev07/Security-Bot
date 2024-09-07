const db = require("../../../assets/afk.js");

module.exports = {
  name: 'afk',
  category: 'Extra',
  description: 'Sets you away with a provided reason',
  args: false,
  usage: 'afk [reason]',
  userPerms: [],
  botPerms: [],
  owner: false,
  execute: async(client, message, args, prefix) => {

const data = await db.findOne({ Guild: message.guildId, Member: message.author.id })
    const reason = args.join(" ") ? args.join(" ") : "None"
    if (data) {
      return message.channel.send("Uwu, wait buddy you're already afk")
        } else {
            if (

      /(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?/gi.test(

        reason,

      ) === true

    ) {
        await message.delete()
                return message.channel.send(`**You can't use links/advertise in your afk reason**`).then((msg) => {

        setTimeout(() => msg.delete(), 5000);

      }).catch((err) => {});
        } else {
            if (message.mentions.members.first()) {
               return message.channel.send(`**You can't @mention members in your afk reason**`).then((msg) => {

        setTimeout(() => msg.delete(), 5000);

      }).catch((err) => {});
                } else {
      const newData = new db({
        Guild: message.guildId,
        Member: message.author.id,
        Reason: reason,
        Time: Date.now()
      })
      await newData.save()
      return message.reply(`${client.emoji.tick} Your now set afk with reason- ${reason}`)
            
        }
            }
}
  }
}