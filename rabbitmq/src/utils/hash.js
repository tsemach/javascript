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
    let h = hasha(Math.random().toString(), {algorithm: algorithm});

    return [h.slice(0,8),'-',h.slice(8,12),'-',h.slice(12,16),'-',h.slice(16,20),'-',h.slice(20-32)].join('');
    //return hasha(Math.random().toString(), {algorithm: algorithm});
}

// let h = create_hash();
// console.log("2b179827-9c1c-ff7a-e5a3-84de18209b5f");
// h = "2b1798279c1cff7ae5a384de18209b5f";
// console.log(h);
// let a = [h.slice(0,8),'-',h.slice(8,12),'-',h.slice(12,16),'-',h.slice(16,20),'-',h.slice(20-32)].join('');
// console.log(a)
//
// console.log("2b179827-9c1c-ff7a-e5a3-84de18209b5f");

module.exports = {
    create_hash,
    sleep
}

