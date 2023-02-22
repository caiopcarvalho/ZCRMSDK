var mysql_util = {};
require('dotenv').config();

mysql_util.saveOAuthTokens = function(config_obj) {
    return new Promise(function(resolve, reject) {
        var sql = "INSERT INTO oauthtokens (useridentifier, accesstoken,refreshtoken,expirytime) VALUES ('" + process.env.USER_IDENTIFIER + "','" + process.env.ACCESS_TOKEN + "','" + process.env.REFRESH_TOKEN + "'," + process.env.EXPIRY_TIME + ")";
        mysql_util.deleteOAuthTokens()
            .then(function() {
                // TODO: Add code to insert the data into the database
                resolve();
            })
    })
}

mysql_util.getOAuthTokens = function() {
    return new Promise(async function(resolve, reject) {
        const { parseFile, writeFile } = require('../tokenFile')
        const parsedFile = await parseFile();
        if(parsedFile === null) {
            // TODO: Add code to query the database for the OAuth tokens
            var result = [{
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
        var crmclient = require('../ZCRMRestClient');
        var result = [{
            useridentifier: crmclient.getUserIdentifier(),
            accesstoken: process.env.ACCESS_TOKEN,
            refreshtoken: process.env.REFRESH_TOKEN,
            expirytime: process.env.EXPIRY_TIME
        }];
        writeFile(result);
        resolve(result);
    });
}

mysql_util.deleteOAuthTokens = function() {
    return new Promise(function(resolve, reject) {
        // TODO: Add code to delete the OAuth tokens from the database
        var result = [{
            useridentifier: process.env.USER_IDENTIFIER,
            accesstoken: process.env.ACCESS_TOKEN,
            refreshtoken: process.env.REFRESH_TOKEN,
            expirytime: process.env.EXPIRY_TIME
        }];
        resolve(result);
    })
}

module.exports = mysql_util;
