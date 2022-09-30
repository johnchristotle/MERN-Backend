const crypto = require('crypto');

/**
 * @returns {string} random string
 */

function generateKey(){
    const rand = crypto.randomBytes(25);

    let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
    let str = "";

    for(let i = 0; i < rand.length; i++){
        let index = rand[i] % chars.length;

        str += chars[index];
    }
    return str;
}

module.exports = generateKey;