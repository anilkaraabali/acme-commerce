const clc = require('cli-color');

class Logger {
  static DEBUG = false;

  static setDebugMode(isDebug) {
    this.DEBUG = isDebug;
  }

  static info(message) {
    console.log(clc.cyan('- info'), message);
  }

  static success(message) {
    console.log(clc.green('- success'), message);
  }

  static warn(message) {
    console.log(clc.yellow('- warn'), message);
  }

  static error(message, error, exit = false) {
    console.log(clc.red('- error'), message);

    if (error instanceof Error) {
      console.error(clc.red(`    → ${error.message}`));
      console.error(clc.red(`    → Stack: ${error.stack}`));
    }

    if (exit) process.exit(1);
  }

  static debug(message, data) {
    if (this.DEBUG) {
      console.log(clc.magenta('- debug'), message);
      if (data) console.dir(data, { depth: null, colors: true });
    }
  }

  static highlight(message) {
    return clc.whiteBright.underline(message);
  }
}

module.exports = Logger;
