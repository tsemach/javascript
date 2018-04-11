const hasha = require('hasha');

function create_hash(algorithm = 'md5') {
    return hasha(Date.now().toString(), {algorithm: algorithm});
}

function sleep(milliseconds) {
    let start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

module.exports = {
    create_hash,
    sleep
}

