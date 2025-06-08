const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../../logs/app.log');

if (!fs.existsSync(logFilePath)) {
  fs.mkdirSync(logFilePath);
}

// Helper to write logs to a file
function writeLogToFile(level, message) {
  const logMessage = `${new Date().toISOString()} [${level.toUpperCase()}]: ${message}\n`;
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error("Failed to write log to file", err);
    }
  });
}

class Logger {
  static info(message) {
    console.info(`INFO: ${message}`);
    writeLogToFile('info', message);
  }

  static warn(message) {
    console.warn(`WARN: ${message}`);
    writeLogToFile('warn', message);
  }

  static error(message) {
    console.error(`ERROR: ${message}`);
    writeLogToFile('error', message);
  }
}

module.exports = Logger;
