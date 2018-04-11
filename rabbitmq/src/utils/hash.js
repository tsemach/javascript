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

async function create_hash_async(algorithm = 'md5') {
    await sleep(10);
    return hasha(Date.now().toString(), {algorithm: algorithm});
}

function create_hash(algorithm = 'md5') {
    for (let i = 0; i < 1000000; i++);
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
    create_hash_async,
    sleep
}

