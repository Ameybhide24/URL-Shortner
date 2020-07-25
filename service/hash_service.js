const crypto = require('crypto');
const base62 = require('base-62');
const getHashedUrl=(fullurl)=>{
    var md5sum=crypto.createHash('md5');
    md5sum.update(fullurl);
    return md5sum.digest("hex");
};

const possibleChar="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";


const getBase62From10=(fullurl)=>{
    base62.setAlphabet(possibleChar);
    return base62.encode(fullurl);
};


module.exports = getBase62From10;