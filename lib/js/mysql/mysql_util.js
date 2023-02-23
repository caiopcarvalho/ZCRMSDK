var mysql_util = {};

mysql_util.getOAuthTokens = function() {
    return new Promise(async function(resolve, reject) {
        const { parseFile, writeFile } = require('../tokenFile')
        const parsedFile = await parseFile();
        if(parsedFile === null) {
            // TODO: Add code to query the database for the OAuth tokens
            const result = [{
                id:0,
                useridentifier: process.env.USER_IDENTIFIER,
                accesstoken: process.env.ACCESS_TOKEN,
                refreshtoken: process.env.REFRESH_TOKEN,
                expirytime: process.env.EXPIRY_TIME
            }];
            writeFile(result);
            resolve(result);
        }
        else {
            // console.log({ parsedFile })
            resolve(parsedFile);
        }
    })
}

mysql_util.updateOAuthTokens = function(config_obj) {
    return new Promise(function(resolve, reject) {
        if (!config_obj.hasOwnProperty("access_token") || !config_obj.hasOwnProperty("expires_in"))
            return resolve();

        const { writeFile } = require('../tokenFile')
        const result = [{
            id:0,
            useridentifier: process.env.USER_IDENTIFIER,
            accesstoken: config_obj.access_token,
            refreshtoken: process.env.REFRESH_TOKEN,
            expirytime: config_obj.expires_in
        }];
        writeFile(result);
        resolve(result);
    });
}

mysql_util.deleteOAuthTokens = function() {
    return new Promise(function(resolve, reject) {
        // TODO: Add code to delete the OAuth tokens from the database
        var result = [{
            id:0,
            useridentifier: process.env.USER_IDENTIFIER,
            accesstoken: process.env.ACCESS_TOKEN,
            refreshtoken: process.env.REFRESH_TOKEN,
            expirytime: process.env.EXPIRY_TIME
        }];
        resolve(result);
    })
}

module.exports = mysql_util;

