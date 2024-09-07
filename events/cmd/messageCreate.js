/** @format */

const { Collection, PermissionsBitField, EmbedBuilder, ActionRowBuilder, WebhookClient } = require('discord.js');



module.exports = (client) => {
  client.on('messageCreate', async (message) => {
    if (message.author.bot || !message || !message.guild || !message.content)
      return;

    let pfx = await client.db.get(`prefix_${message.guild.id}`) 
    
    if (!pfx || pfx === null) {
      await client.db.set(`prefix_${message.guild.id}`, client.prefix)
    }
    
   let prefix = pfx

    let developer = client.owners.includes(message.author.id);

  let blU = await client.db.get(`blUser_${client.user.id}`) ? await client.db.get(`blUser_${client.user.id}`) : []

    if (blU.includes(message.author.id) && !developer) {
      return client.emit(`blUser`, message)
    }
    

    let blS = await client.db.get(`blServer_${client.user.id}`) ? await client.db.get(`blServer_${client.user.id}`) : []

    let nop = await client.db.get(`noprefix_1032300215664914523`) ? await client.db.get(`noprefix_1032300215664914523`) : []
    let ignore = await client.db.get(`ignore_${message.guild.id}`) ? await client.db.get(`ignore_${message.guild.id}`) : {channels: [], commands: []}

    if (blS.includes(message.guild.id)) {
      let own = await client.users.fetch(message.guild.ownerId, { force: true }).catch((err) => {})
      let supp = new client.button().link(`Support`, client.support)
      let inv = new client.button().link(`Invite`, client.invite)
      let bl = new ActionRowBuilder().addComponents(supp, inv)
      own.send({content: `<a:error:1281619195716436042> Blacklisted ! <a:error:1281619195716436042>`, embeds: [ new client.emb().desc(`This message is being sent to you because your server, \`${message.guild.name}\` was found in my **Server Blacklist**\n\n***I have left your server.***\n\n**If you feel this is a mistake please feel free to report us at our [Support Server](${client.support})**`)], components: [bl]}).catch(() => {})
      return message.guild.leave()
    }


  let npt = await client.db.get(`npt_${message.author.id}`)

    if (npt !== null && Date.now() > npt) {

      btn = new client.button().link(`Renew`, client.support)

      await message.author.send({embeds: [new client.emb().desc(`${client.emoji.prime} Your Noprefix subscription has expired at <t:${Math.round(npt/1000)}:f>\n\n*[Click Here](${client.support}) To Renew*`).setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})})], components: [new ActionRowBuilder().addComponents(btn)]}).catch(() => { })

      await message.reply({embeds: [new client.emb().desc(`${client.emoji.prime} Your Noprefix subscription has expired at <t:${Math.round(npt/1000)}:f>\n\n*[Click Here](${client.support}) To Renew*`).setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})})], components: [new ActionRowBuilder().addComponents(btn)]}).catch(() => { })

      nop = nop.filter(f => f !== message.author.id)
      await client.db.set(`noprefix_1032300215664914523`, nop)
      await client.db.delete(`npt_${message.author.id}`)
      
    }


    if (message.content.includes("908648080876920862") || message.content.includes("1090957904410071120")) {
      //await message.react(client.emoji.verifydev)
      await message.react("<:e1122:1142453906077651005>")
    }
    

    let np = nop.includes(message.author.id)
   

    if (
      (developer || np) &&
      !message.content.startsWith(prefix) && !message.content.startsWith(client.user.id)
    )
      prefix = '';

    const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);

    if (message.content.match(mention)) {
      const embed = new EmbedBuilder()       

.setColor(client.color)
        .setDescription(
          `**${client.emoji.arrow} My Prefix here is** \`${pfx}\`\n<:icons_supportscommandsbadge:1122922281983811614> **Use** \`${pfx}help\` **to continue**`,
        )

    let b1 = new client.button().link(`Invite`, `${client.invite}`)
    let b2 = new client.button().link(`Support`, `${client.support}`)

      let row = new ActionRowBuilder().addComponents(b1, b2);
    
      message.reply({ embeds: [embed], components: [row] })
    }


    const prefixRegex = new RegExp(
      `^<@!?${client.user.id}>( |)`,
    );

    let pre = message.content.match(prefixRegex) ? message.content.match(prefixRegex)[0] : prefix;

if(!message.content.startsWith(pre)) return;
      
    const args = message.content.slice(pre.length).trim().split(/ +/);

    const commandName = args.shift().toLowerCase();

    const command =
      client.commands.get(commandName) || client.aliases.get(commandName);

    if (!command) return;

    

    const { cooldowns } = client;

    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const defaultCooldownDuration = 5;
    const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

    if (timestamps.has(message.author.id) && !developer) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const expiredTimestamp = Math.round((expirationTime - now) / 1000);
        description = `Slow down buddy you are too fast, wait till ${expiredTimestamp} second(s)`;
      let e = new EmbedBuilder()
        .setDescription(`${client.emoji.cross} ${message.author}: ${description}`)
        .setColor(client.color)
        return message.reply({ embeds: [e] }).then((msg) => {
        setTimeout(() => msg.delete(), 5000);
      }).catch((err) => {});
      }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    description = `${client.emoji.cross} ${message.author}: I miss the \`Send Messages\` permission in <#${message.channelId}>`;
    let e = new EmbedBuilder().setColor(client.color)
    .setDescription(`${description}`);
    if (
      !message.guild.members.me.permissions.has(
        PermissionsBitField.resolve('SendMessages'),
      )
    )
      return await message.author.send({ embeds: [e] }).catch(() => { });

    if (
      !message.guild.members.me.permissions.has(
        PermissionsBitField.resolve('ViewChannel'),
      )
    )
      return;

    description = `${client.emoji.cross} ${message.author}: I miss the \`Embed Links\` permission in <#${message.channelId}>`;
    e = new client.emb();
    e.desc(`${description}`);
    if (
      !message.guild.members.me.permissions.has(
        PermissionsBitField.resolve('EmbedLinks'),
      )
    )
      return await message.author.send({ embeds: [e] }).catch(() => {});

    

    if (command.botPerms) {
      if (
        !message.guild.members.me.permissions.has(
          PermissionsBitField.resolve(command.botPerms || []),
        )
      ) {
        description = `${client.emoji.cross} ${message.author}: I miss the \`${command.botPerms}\` permission(s)`;
        e = new client.emb();
        e.desc(`${description}`);
        return message.reply({ embeds: [e] }).then((msg) => {
        setTimeout(() => msg.delete(), 5000);
      }).catch((err) => {});
      }
    }
    if (command.userPerms) {
      if (
        !message.member.permissions.has(
          PermissionsBitField.resolve(command.userPerms || []),
        ) &&
        !developer
      ) {
        description = `${client.emoji.cross} ${message.author}: You miss the \`${command.userPerms}\` permission(s)`;
        e = new client.emb();
        e.desc(`${description}`);
        return message.reply({ embeds: [e] }).then((msg) => {
        setTimeout(() => msg.delete(), 5000);
      }).catch((err) => {});
      }
    }

    if (ignore.channels.includes(message.channel.id) && !developer) {
      return message.reply({embeds: [new client.emb().desc(`${client.emoji.warn} **Ignored Channel**: You cant use me here!`)]}).then((msg) => {
        setTimeout(() => msg.delete(), 5000);
      }).catch((err) => {});
    }
    
    if (ignore.commands.includes(command.name) && !developer) {
      return message.reply({embeds: [new client.emb().desc(`${client.emoji.warn} **Ignored Command**: You cant use this command here!`)]}).then((msg) => {
        setTimeout(() => msg.delete(), 5000);
      }).catch((err) => {});
    }


    

      if (command.owner && !developer) {
      return;
    }


    if (command.aboveme && message.author.id != message.guild.ownerId && !message.member.permissions.has(PermissionsBitField.resolve('Administrator')) && (message.member.roles.highest.position < message.guild.members.me.roles.highest.position)) {


      return message.channel.send({embeds: [new client.emb().desc("```yaml\n - You must have Administrator permission.\n - Your top role should be above my top role.```")]})
                                      
    }



    if (command.srvrowner) {  

        if (message.author.id != message.guild.ownerId && !developer) {
         
        return message.channel.send(`Only the guild owner can use these commands.`).then((msg) => {
        setTimeout(() => msg.delete(), 5000);
      }).catch((err) => {});
        }
    }

    

   /* if (command.prime && !uprem && !developer) { 

        return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.prime} This command requ`)]})       
         
    }*/
   

    if (command.vote && !developer) {

      const response = await client.fetch(`https://top.gg/api/bots/${client.user.id}/check?userId=${message.author.id}`, {
        method: 'GET',
        headers: {
          Authorization: process.env.topgg,
        },
      });

const data = await response.json();

      if (response.ok && !data.voted) {
      
      l = new client.button().link(`Vote Me`, client.vote)
      vote = new ActionRowBuilder().addComponents(l)

        return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.prime} You need to [vote](${client.vote}) for me to use this command`)], components: [vote]})
        
      }            
    }
    

      if (command.extraowner) {  
        let data = await client.db.get(`exown_${message.guild.id}`) ? await client.db.get(`exown_${message.guild.id}`) : []
        if (!data.includes(message.author.id) && message.author.id != message.guild.ownerId && !developer) {
         
        return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.cross} ${message.author}: These commands are only accessible by the **Guild Owner** or an **Extra Owner**`)]}).then((msg) => {
        setTimeout(() => msg.delete(), 5000);
      }).catch((err) => {});
        }
      }
  const web = new WebhookClient({url : client.web_cmd})


    await command.execute(client, message, args, prefix);
      web.send({embeds: [ new EmbedBuilder().setFooter({text: message.guild.name, iconURL: message.guild.iconURL({dynamic: true})}).setTimestamp().setTitle(`Command ran in ${message.guild}`).setColor(client.color).setDescription(`Command name: ${command.name}\nAuthor Name: ${message.author.tag}\nGuild Id: ${message.guild.id}\nChannel Name: ${message.channel.name}\nChannel Id: ${message.channel.id}\nExecuted: ${message}\nJump Url: [Jump to](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`)]})
    
  });
};
