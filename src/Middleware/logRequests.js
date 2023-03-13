const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'requests.log' })
  ]
});

function logRequests(req, res, next) {
  const start = Date.now();

  // Log the incoming request
  logger.info({
    method: req.method,
    url: req.url,
    query: req.query,
    body: req.body
  });

  res.on('finish', () => {
    const end = Date.now();
    const duration = end - start;

    // Log the outgoing response
    logger.info({
      method: req.method,
      url: req.url,
      query: req.query,
      body: req.body,
      status: res.statusCode,
      duration: duration
    });
  });

  next();
}

module.exports = logRequests;
