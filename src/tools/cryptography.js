const crypto = require('crypto');

class Cryptography
{
    SHA512(text)
    {
        const hash = crypto.createHash('sha512');
        const data = hash.update(text, 'utf-8');
        return data.digest('hex');
    }
}

module.exports = new Cryptography;