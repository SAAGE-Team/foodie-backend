const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'Logs/access.log'), { flags: 'a' });

morgan.token('date', function(req, res) {
  return new Date().toISOString();
});

const logger = morgan(':date :method :url :status :response-time ms', { stream: accessLogStream });

module.exports = logger;