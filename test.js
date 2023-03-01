const crypto = require('crypto');

function generateVerificationCode() {
  const code = crypto.randomBytes(5).toString('hex').toUpperCase();
  return code;
}

console.log(generateVerificationCode());