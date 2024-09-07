/** @format */

const { ActionRowBuilder } = require('discord.js')
const ms = require('ms');

module.exports = {
  name: 'punishment',
  category: 'antinuke',
  aliases: ['punish'],
  description: "Set the punishment for triggering antinuke",
  args: true,
  usage: 'punishment <set/reset> <type>',
  botPerms: [],
  owner: false,
  extraowner: true,

  execute: async (client, message, args, prefix) => {

    let set = await client.db.get(`setup_${message.guild.id}`) ? await client.db.get(`setup_${message.guild.id}`) : null

    if (!set || set === null) {
      await client.db.set(`setup_${message.guild.id}`, false)
    }
      if (!args[0]) {
        return message.channel.send({embeds: [new client.emb().desc(`Command Usage: \`${prefix}punishment <set/reset> <type>\``)]})
      }

    
    if (set === false || set === null) {
        return message.channel.send(`Security is not enabled here.`)
}
    

    

    if (args[0] == `set`) {

      let type = args[1]

      if (type == `ban`) {

        client.db.set(`punish_${message.guild.id}`, `ban`)

        return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} ${message.author}: Set the antinuke punishment to- \`ban\``)]})
        
      } else {

        if (type == `kick`) {

        client.db.set(`punish_${message.guild.id}`, `kick`)

        return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} ${message.author}: Set the antinuke punishment to- \`kick\``)]})
        
        } else {

          if (type == `mute`) {

            let dur = args[2]

            if (!dur) {
              dur = "7d"
            }
            
            let time = ms(dur)

            if (time > 1728000000) {
              return message.channel.send({embeds: [ new client.emb().desc(`${client.emoji.cross} ${message.author}: Mute duration can't be longer than 20 Days`)]})
            }
            
        client.db.set(`punish_${message.guild.id}`, `mute`)
            client.db.set(`muteDur_${message.guild.id}`, time)

        return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} ${message.author}: Set the antinuke punishment to- \`mute\` Mute Duration- \`${ms(time)}\``)]})
        
          } else {

            if (type == `none`) {
             
        client.db.set(`punish_${message.guild.id}`, `none`)

    message.channel.send({embeds: [new client.emb().desc(`${message.author}: Set the antinuke punishment to- \`none\``)]})
        
            } else {

      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.cross} ${message.author}: Not a valid punishment type!\nUsable Types: \`Ban, Kick, Mute, None\``)]})   
      
        }
            
          } 
          
        }
        
      } 
      
    }


    if (args[0] === `reset`) {
      let rst_yes = new client.button().secondary(`n_yes`, `Yes`, client.emoji.tick)
              let rst_no = new client.button().secondary(`n_no`, `No`, client.emoji.cross)

              let reset = new ActionRowBuilder().addComponents(rst_yes, rst_no)

           msg = await message.channel.send({embeds: [new client.emb().desc(`${message.author}: Do you really want to set the antinuke punishment to- \`Default [Ban]\``)], components: [reset]})
      
      
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

    if (interaction.customId === `n_yes`) {
      client.db.set(`punish_${message.guild.id}`, `ban`)
     interaction.update({embeds: [new client.emb().desc(`${client.emoji.tick} Set the antinuke punishment to- \`Default [ban]\``)], components: []})
      
    }
    if (interaction.customId === `n_no`) {
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