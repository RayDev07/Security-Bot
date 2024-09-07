const { PermissionsBitField, AuditLogEvent } = require('discord.js')

module.exports = async(client) => {
  client.on("guildMemberAdd", async(member) => {

    if (!member.guild.members.me.permissions.has(PermissionsBitField.Flags.ViewAuditLog)) return;

    let guild = member.guild

    const logs = await member.guild.fetchAuditLogs({
      limit: 1,
      type: AuditLogEvent.BotAdd
    }).then(x => x.entries.first())

    
    if (!logs) return;

    let set = await client.db.get(`setup_${guild.id}`)

    if(logs && set === true) {

      if(logs.executor.id === client.user.id) return;
      if(logs.executor.id === guild.ownerId) return;

      let wlU = await client.db.get(`wlUser_${member.guild.id}`) ? await client.db.get(`wlUser_${member.guild.id}`) : []   
      let eo = await client.db.get(`exown_${member.guild.id}`) ? await client.db.get(`exown_${member.guild.id}`) : []

      let wlR = await client.db.get(`wlRole_${member.guild.id}`)
            let wlisted = await member.guild.roles.fetch(wlR).catch(() => {})
            if (wlU.includes(logs.executor.id)) return;
            if (eo.includes(logs.executor.id)) return;

      let mem = await member.guild.members.fetch(logs.executor.id).catch(() => {})
            if (mem.roles.cache.has(wlisted)) return;


      let punish = await client.db.get(`punish_${guild.id}`)

      let del = await guild.members.ban(logs.target.id, {reason: `CodeX Antinuke | Bot Added Not Whitelisted`}).catch(() => { });

      let logch = await client.db.get(`anlog_${guild.id}`) 
      
      let ch = await guild.channels.fetch(logch).catch(() => {})

      if (punish === `none`) return;

      if (punish === `ban`) {

        let x = await guild.members.ban(logs.executor.id, {reason: `CodeX Antinuke | Bot Added Not Whitelisted`}).catch(() => {})

        ch.send({embeds: [new client.emb().title(`Antinuke Result:`).desc(`**Trigger**: Bot Added\n**Criminal**: ${logs.executor.tag}\n\n**Action Taken?**: ${x ? `${client.emoji.tick} Ban Successful` : `${client.emoji.cross} Ban Unsuccessful` }\n**Recovery**: ${del ? client.emoji.tick : client.emoji.cross}`).setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()}).setTimestamp().setFooter({text: `CodeX Antinuke`, iconURL: guild.iconURL({dynamic: true})})]})

        if (x) {
          logs.executor.send({embeds: [ new client.emb().title(`Antinuke Triggered`).desc(`**You were Banned From ${guild.name}**\n${client.emoji.ham} **Reason:** CodeX Antinuke | Bot Added Not Whitelisted\n${client.emoji.ham} **Moderator:** ${client.user.username}`).setTimestamp().setFooter({text: `CodeX Antinuke`, iconURL: guild.iconURL({dynamic: true})})]}).catch(() => {})
          
        }
        
        
      }

                  if (punish === `kick`) {

        let x = await guild.members.kick(logs.executor.id, reason=`CodeX Antinuke | Bot Added Not Whitelisted`).catch(() => {})

        ch.send({embeds: [new client.emb().title(`Antinuke Result:`).desc(`**Trigger**: Bot Added\n**Criminal**: ${logs.executor.tag}\n\n**Action Taken?**: ${x ? `${client.emoji.tick} Kick Successful` : `${client.emoji.cross} Kick Unsuccessful` }\n**Recovery**: ${del ? client.emoji.tick : client.emoji.cross}`).setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()}).setTimestamp().setFooter({text: `CodeX Antinuke`, iconURL: guild.iconURL({dynamic: true})})]})

        if (x) {
          logs.executor.send({embeds: [ new client.emb().title(`Antinuke Triggered`).desc(`**You were Kicked From ${guild.name}**\n${client.emoji.ham} **Reason:** CodeX Antinuke | Bot Added Not Whitelisted\n${client.emoji.ham} **Moderator:** ${client.user.username}`).setTimestamp().setFooter({text: `CodeX Antinuke`, iconURL: guild.iconURL({dynamic: true})})]}).catch(() => {})
          
        }
        
        
                  }

       if (punish === `mute`) {

              let dur = await client.db.get(`muteDur_${guild.id}`)

              let mem = guild.members.cache.get(logs.executor.id)

        let x = await mem.timeout(dur, {reason: `CodeX Antinuke | Bot Added Not Whitelisted`}).catch(() => {})

        ch.send({embeds: [new client.emb().title(`Antinuke Result:`).desc(`**Trigger**: Bot Added\n**Criminal**: ${logs.executor.tag}\n\n**Action Taken?**: ${x ? `${client.emoji.tick} Mute Successful` : `${client.emoji.cross} Mute Unsuccessful` }\n**Recovery**: ${del ? client.emoji.tick : client.emoji.cross}`).setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()}).setTimestamp().setFooter({text: `CodeX Antinuke`, iconURL: guild.iconURL({dynamic: true})})]})

        if (x) {
          logs.executor.send({embeds: [ new client.emb().title(`Antinuke Triggered`).desc(`**You were Muted In ${guild.name}**\n${client.emoji.ham} **Reason:** CodeX Antinuke | Bot Added Not Whitelisted\n${client.emoji.ham} **Moderator:** ${client.user.username}`).setTimestamp().setFooter({text: `CodeX Antinuke`, iconURL: guild.iconURL({dynamic: true})})]}).catch(() => {})
          
        }
        

       }





      
    }  
  })
}