const hasha = require('hasha');

/**
 * @description use sleep like that:
 *
 *                  async function demo() {
 *                      console.log('Taking a break...');
 *                      await sleep(2000);
 *                      console.log('Two second later');
 *                  }
 *
 *                  demo();
 *
 * @param ms - number of milliseconds to sleep
 * @returns {Promise<any>}
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function create_hash(algorithm = 'md5') {
    return hasha(Math.random().toString(), {algorithm: algorithm});
}

module.exports = {
    create_hash,
    sleep
}

