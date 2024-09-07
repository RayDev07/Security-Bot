/** @format */

const chalk = require('chalk');
const moment = require('moment');

module.exports = class Logger {
  static log(data, type = 'log') {
    const date = moment().utcOffset('+05:30').format('DD-MM-YYYY hh:mm:ss');
    let time = chalk.hex('#AAFF22')(`${date}`);
    let prefix;

    switch (type) {
      case 'log':
        prefix = chalk.bgHex('#AAAAAA')('LOGGZ');
        break;
      case 'warn':
        prefix = chalk.bgHex('#FFFF00')('WARNS');
        break;
      case 'error':
        prefix = chalk.bgHex('#FF2020')('ERROR');
        break;
      case 'noerr':
        prefix = chalk.bgHex('#BC71E3')('NOERR');
        break;
      case 'comnd':
        prefix = chalk.bgHex('#FFD580')('COMND');
        break;
      case 'vote':
        prefix = chalk.bgHex('#FFCC00')('DBL');
        break;
      case 'event':
        prefix = chalk.bgHex('#ABE67E')('EVENT');
        break;
      case 'ready':
        prefix = chalk.bgHex('#FF60CC')('READY');
        break;
      case 'shard':
        prefix = chalk.bgHex('#63A6DE')('SHARD');
        break;
      case 'mongo':
        prefix = chalk.bgHex('#00EE66')('MONGO');
        break;
      case 'guild':
        prefix = chalk.bgHex('#FFFF00')('GUILD');
        break;
      case 'dokdo':
        prefix = chalk.bgHex('#AAFF00')('DOKDO');
        break;
      default:
        throw new TypeError('Logger type error');
    }

    console.log(`[ ${time} ] [${prefix}] ${chalk.hex('#2277FF')(data)}`);
  }
};
