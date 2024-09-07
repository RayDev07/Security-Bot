/** @format */

const { ButtonBuilder, ButtonStyle } = require('discord.js');

class CustomButtonBuilder extends ButtonBuilder {
  _setButtonProperties(id, label, emoji, style, disabled = false) {
    this.setCustomId(id);
    if (label) this.setLabel(label);
    if (emoji) this.setEmoji(emoji);
    this.setStyle(style);
    this.setDisabled(disabled);
  }

  primary = (id, label, emoji, disabled) => {
    this._setButtonProperties(id, label, emoji, ButtonStyle.Primary, disabled);
    return this;
  };

  secondary = (id, label, emoji, disabled) => {
    this._setButtonProperties(
      id,
      label,
      emoji,
      ButtonStyle.Secondary,
      disabled,
    );
    return this;
  };

  danger = (id, label, emoji, disabled) => {
    this._setButtonProperties(id, label, emoji, ButtonStyle.Danger, disabled);
    return this;
  };

  success = (id, label, emoji, disabled) => {
    this._setButtonProperties(id, label, emoji, ButtonStyle.Success, disabled);
    return this;
  };

  link = (label, url) => {
    this.setLabel(label);
    this.setStyle(ButtonStyle.Link);
    this.setURL(url);
    return this;
  };
}

module.exports = CustomButtonBuilder;
