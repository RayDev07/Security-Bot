/** @format */

const { EmbedBuilder } = require('discord.js');
class CustomEmbedBuilder extends EmbedBuilder {
  constructor() {
    super({});
    this.setColor('#2f3136');
    return this;
  }
  title = (title) => {
    this.setTitle(title);
    return this;
  };
  desc = (text) => {
    this.setDescription(text);
    return this;
  };
  thumb = (url) => {
    this.setThumbnail(url);
    return this;
  };
  img = (uri) => {
    this.setImage(uri);
    return this;
  };
  author = (client) => {
    this.setAuthor({
      name: client.user.username,
      iconURL: client.user.displayAvatarURL({ dynamic: true }),
      url: 'https://discord.gg/CodeXhq',
    });
    return this;
  };
}

module.exports = CustomEmbedBuilder;
