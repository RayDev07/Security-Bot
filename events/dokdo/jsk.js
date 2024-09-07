/** @format */

const Dokdo = require('dokdo');

module.exports = (client) => {
  const dok = new Dokdo(client, {
    aliases: ['dok', 'deb', "jsk"],
    prefix: '-',
    category: 'developer',
    owners: ['1170659343750922274'],
  });

  client.on('messageCreate', async (message) => {
    if (
      message.author.bot ||
      !message ||
      !message.guild ||
      !message.channel ||
      !message.content
    )
      return;
    if (
      (message.content.includes('dok') || message.content.includes('deb') || message.content.includes('jsk')) && client.owners.includes(message.author.id)
    ) {
      client.logger.log(` Dokdo used by ${message.author.tag}`, 'dokdo');
      dok.run(message);
    }
  });

  client.logger.log(`Loaded Dokdo [dok]`, `dokdo`);
};
