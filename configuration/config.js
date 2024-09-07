/** @format */

require('dotenv').config();
const yaml = require('js-yaml');
const fs = require('fs');

const doc = yaml.load(fs.readFileSync('./config.yml', 'utf8'));

module.exports = {
  token: process.env.TOKEN ?? doc.bot?.TOKEN ?? '',
  owners: process.env.OWNERS ?? doc.bot?.OWNERS ?? [''],
  prefix: process.env.PREFIX ?? doc.bot?.PREFIX ?? '',
  clientID: process.env.CLIENT_ID ?? doc.bot?.ID ?? '',
  embedColor: process.env.COLOR ?? doc.bot?.EMBED_COLOR ?? '',
  mongo: process.env.MONGO ?? doc.bot?.MONGO ?? '',

  links: {
    invite: process.env.INVITE ?? doc.links?.INVITE ?? 'https://codexdev.tk',
    support: process.env.SUPPORT ?? doc.links?.SUPPORT ?? 'https://dsc.gg/codexdev',
    vote: process.env.VOTE ?? doc.links?.VOTE ?? 'YOUR_topgg',
  },
};
