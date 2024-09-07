module.exports = (client) => {
  client.on('invalidChannel', async (message, msg) => {
    await msg?.delete();
    let description = `You didn't provide a valid channel`;
    emb = new client.emb().desc(`${client.emoji.cross} ${message.author}: ${description}`);

    return message.reply({ embeds: [emb] });
  });
};