/** @format */


module.exports = {
  name: 'ping',
  category: 'Extra',
  description: "shows the bot's ping.",
  aliases: ['latency'],
  args: false,
  usage: 'ping',
  botPerms: [],
  userPerms: [],
  owner: false,
  extraowner: false,

  execute: async (client, message, args, prefix) => {



    msg = await message.channel.send(`Pinging...`)

    
const mongoose = require('mongoose');
const pingSchema = new mongoose.Schema({ name: String }, { timestamps: true });
const pingModel = mongoose.model('Ping', pingSchema);
let doc = await pingModel.create({ name: 'created' });
doc = await pingModel.findOneAndUpdate({ _id: doc._id }, { name: 'updated' }, { new: true });
const timestamp1 = doc.createdAt;
const timestamp2 = doc.updatedAt;
const date1 = new Date(timestamp1);
const date2 = new Date(timestamp2);
const timeDiffMs = Math.abs(date2.getTime() - date1.getTime());


    msg.edit(`Pong🏓: **${client.ws.ping}ms** | **Database: ${timeDiffMs}ms**\nStill alive! No worries`)
    mongoose.connection.deleteModel('Ping', pingSchema)
  }
}
