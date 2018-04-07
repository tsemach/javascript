const hasha = require('hasha');

function create_hash(algorithm = 'md5') {
    return hasha(Date.now().toString(), {algorithm: algorithm});
}

module.exports = {
    create_hash
}

